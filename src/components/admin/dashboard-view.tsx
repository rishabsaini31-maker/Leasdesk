'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  Users,
  UserPlus,
  PhoneCall,
  CheckCircle2,
  LogOut,
  Search,
  ArrowLeft,
  LayoutDashboard,
  ClipboardList,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthStore } from '@/stores/auth-store';
import { STATUS_OPTIONS } from '@/types/lead';
import type { Lead, LeadStatus, LeadStats } from '@/types/lead';

const STATUS_VARIANT: Record<LeadStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  NEW: 'default',
  CONTACTED: 'secondary',
  CLOSED: 'outline',
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function DashboardView() {
  const { admin, logout, setView } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(searchInput, 300);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : '';
      const res = await fetch(`/api/leads${params}`);

      if (res.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch leads');
      }

      const data = await res.json();
      setLeads(data.leads);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, logout]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, []);

  const stats: LeadStats = useMemo(() => ({
    total: leads.length,
    new: leads.filter((l) => l.status === 'NEW').length,
    contacted: leads.filter((l) => l.status === 'CONTACTED').length,
    closed: leads.filter((l) => l.status === 'CLOSED').length,
  }), [leads]);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      setStatusLoading(leadId);
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update status');
      }

      const data = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
      toast.success('Status updated successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setStatusLoading(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue with client-side logout even if API fails
    }
    logout();
    toast.success('Logged out successfully');
  };

  const handleClearSearch = () => setSearchInput('');

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'New', value: stats.new, icon: UserPlus, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Contacted', value: stats.contacted, icon: PhoneCall, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Closed', value: stats.closed, icon: CheckCircle2, color: 'text-blue-700', bg: 'bg-blue-50' },
  ];

  return (
    <TooltipProvider>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col" aria-label="Admin sidebar">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-sm font-bold" aria-hidden="true">
                LD
              </div>
              <div>
                <p className="font-semibold text-sm">LeadDesk Mini</p>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1" aria-label="Dashboard navigation">
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-600/10 text-emerald-400 text-sm font-medium"
              aria-current="page"
            >
              <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
              Dashboard
            </button>
            <button
              onClick={() => document.getElementById('leads-table')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition-colors"
            >
              <ClipboardList className="w-5 h-5" aria-hidden="true" />
              Leads
            </button>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="px-3 mb-3">
              <p className="text-sm font-medium text-slate-300 truncate">{admin?.email}</p>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-800"
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 overflow-auto" aria-busy={loading}>
          {/* Top Bar - Mobile */}
          <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">
                LD
              </div>
              <span className="font-semibold text-slate-900">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setView('landing')} aria-label="Back to home">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Back to Home</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Mobile Admin Info */}
            <div className="lg:hidden mb-4">
              <p className="text-sm text-slate-500">
                Logged in as <span className="font-medium text-slate-700">{admin?.email}</span>
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" role="region" aria-label="Lead statistics">
              {statCards.map((card) => (
                <Card key={card.label} className="border-slate-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`${card.bg} p-2.5 rounded-xl`}>
                        <card.icon className={`w-5 h-5 ${card.color}`} aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900" aria-label={`${card.label}: ${card.value}`}>{card.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{card.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search Bar */}
            <div id="leads-table" className="mb-6">
              <div className="relative max-w-md">
                <label htmlFor="lead-search" className="sr-only">Search leads by name or email</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                <Input
                  id="lead-search"
                  type="search"
                  placeholder="Search by name or email..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 pr-9 bg-white border-slate-300"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              {debouncedSearch && (
                <p className="mt-2 text-sm text-slate-500" aria-live="polite">
                  Searching for &ldquo;{debouncedSearch}&rdquo;
                </p>
              )}
            </div>

            {/* Error State */}
            {error && (
              <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700" role="alert">
                <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm flex-1">{error}</p>
                <Button variant="ghost" size="sm" onClick={fetchLeads} className="ml-auto text-red-700">
                  Retry
                </Button>
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && !error && (
              <Card aria-label="Loading leads">
                <CardContent className="p-0">
                  <div className="p-4 border-b space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full max-w-md" />
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-4 grid grid-cols-6 gap-4">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Leads Table */}
            {!loading && !error && (
              <Card className="border-slate-200">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                    All Leads
                    <Badge variant="secondary" className="ml-2">
                      <span className="sr-only">Total leads: </span>
                      {leads.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {leads.length === 0 ? (
                    <div className="py-16 text-center">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
                      <p className="text-slate-500 font-medium">No leads found</p>
                      <p className="text-slate-400 text-sm mt-1">
                        {searchInput ? 'Try adjusting your search query' : 'Leads will appear here once submitted'}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table aria-label="Leads table">
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Email</TableHead>
                            <TableHead className="font-semibold hidden sm:table-cell">Budget</TableHead>
                            <TableHead className="font-semibold hidden md:table-cell">Message</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold hidden lg:table-cell">Created</TableHead>
                            <TableHead className="font-semibold text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leads.map((lead) => (
                            <TableRow key={lead.id}>
                              <TableCell className="font-medium text-slate-900">{lead.name}</TableCell>
                              <TableCell className="text-slate-600">{lead.email}</TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge variant="outline" className="font-normal">{lead.budget}</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell max-w-[200px] truncate text-slate-600">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="cursor-default">{lead.message}</span>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">{lead.message}</TooltipContent>
                                </Tooltip>
                              </TableCell>
                              <TableCell>
                                <Badge variant={STATUS_VARIANT[lead.status]}>{lead.status}</Badge>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell text-slate-500 text-sm">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      disabled={statusLoading === lead.id}
                                      aria-label={`Update status for ${lead.name}`}
                                    >
                                      {statusLoading === lead.id ? (
                                        <span className="flex items-center gap-1.5">
                                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                          <span className="sr-only">Updating</span>
                                        </span>
                                      ) : (
                                        'Update'
                                      )}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {STATUS_OPTIONS.map((opt) => (
                                      <DropdownMenuItem
                                        key={opt.value}
                                        onClick={() => handleStatusChange(lead.id, opt.value)}
                                        disabled={lead.status === opt.value || statusLoading === lead.id}
                                      >
                                        {opt.label}
                                        {lead.status === opt.value && (
                                          <span className="ml-2 text-xs text-slate-400" aria-label="Current status">✓</span>
                                        )}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
