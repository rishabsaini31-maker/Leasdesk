import { Users, UserPlus, PhoneCall, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
  color: string;
  bg: string;
  delay?: number;
}

export function DashboardCard({ title, value, icon: Icon, description, color, bg, delay = 0 }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
          <div className={`p-2 rounded-lg ${bg} ${color}`}>
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
