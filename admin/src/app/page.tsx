'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, PhoneCall, BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { TopNavbar } from '@/components/TopNavbar';
import { DashboardCard } from '@/components/DashboardCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterDropdown } from '@/components/FilterDropdown';
import { LeadTable } from '@/components/LeadTable';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { ViewLeadModal } from '@/components/ViewLeadModal';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Lead, LeadStatus } from '@/types/lead';
import { useAuthStore, validateSession } from '@/stores/auth-store';

const ITEMS_PER_PAGE = 10;
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const ensureAuth = async () => {
      if (isAuthenticated) return;

      const valid = await validateSession();
      if (cancelled) return;

      if (!valid) {
        logout();
        router.push('/login');
      }
    };

    ensureAuth();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, router, logout]);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      
      const res = await fetch(`${API_URL}/api/leads?${params.toString()}`, {
        credentials: 'include',
      });

      if (res.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch leads');
      }

      const data = await res.json();
      let filtered = data.leads || [];
      
      if (statusFilter !== 'all') {
        filtered = filtered.filter((lead: Lead) => lead.status === statusFilter);
      }
      
      setLeads(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter, logout, router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'NEW').length,
    contacted: leads.filter(l => l.status === 'CONTACTED').length,
    closed: leads.filter(l => l.status === 'CLOSED').length,
  }), [leads]);

  const totalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);
  const paginatedLeads = leads.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update status');
      }

      const data = await res.json();
      setLeads(prev => prev.map(l => l.id === leadId ? data.lead : l));
      if (selectedLead?.id === leadId) setSelectedLead(data.lead);
      toast.success('Lead status updated successfully');
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'New', value: stats.new, icon: UserPlus, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Contacted', value: stats.contacted, icon: PhoneCall, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Closed', value: stats.closed, icon: BadgeCheck, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage and track all customer leads from one place.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card, index) => (
              <DashboardCard
                key={card.label}
                title={card.label}
                value={card.value}
                icon={card.icon}
                description={`${card.label.toLowerCase()} leads`}
                color={card.color}
                bg={card.bg}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar value={searchInput} onChange={setSearchInput} />
            </div>
            <div className="flex gap-2">
              <FilterDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'New', value: 'NEW' },
                  { label: 'Contacted', value: 'CONTACTED' },
                  { label: 'Closed', value: 'CLOSED' },
                ]}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={fetchLeads}
                disabled={loading}
                aria-label="Refresh leads"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {error && <ErrorState message={error} onRetry={fetchLeads} />}
          
          {!error && (
            <LeadTable
              leads={paginatedLeads}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onView={handleViewLead}
              onStatusChange={handleStatusChange}
            />
          )}
        </motion.div>
      </main>

      <ViewLeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lead={selectedLead}
      />
    </div>
  );
}
