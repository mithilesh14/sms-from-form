import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import {
  LayoutDashboard, Users, MessageSquare, Calendar, Home, TrendingUp,
  Search, Filter, ChevronDown, ChevronUp, ExternalLink, Mail, Phone,
  MapPin, Clock, Star, Eye, EyeOff, ArrowLeft, LogOut, Shield, FileText, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ─── Password Gate ───
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'montchoisy2026') {
      sessionStorage.setItem('admin_auth', 'true');
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <span className="text-[20px] tracking-[0.3em] uppercase font-sans font-semibold text-foreground block mb-2">
          MONT CHOISY
        </span>
        <p className="text-caption text-muted-foreground mb-10">Owner Panel</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter access code"
            className={cn(
              "w-full bg-transparent border-b py-4 text-foreground text-center placeholder:text-muted-foreground/60 focus:outline-none transition-colors duration-500",
              error ? "border-destructive" : "border-border focus:border-accent"
            )}
            autoFocus
          />
          {error && <p className="text-destructive text-xs">Invalid access code</p>}
          <button type="submit" className="btn-premium w-full py-4">
            <span>Access Panel</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Status Badge ───
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    new_inquiry: 'bg-blue-100 text-blue-700',
    pending: 'bg-amber-100 text-amber-700',
    pending_payment: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    approved: 'bg-green-100 text-green-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    rejected: 'bg-red-100 text-red-700',
    responded: 'bg-indigo-100 text-indigo-700',
    in_review: 'bg-purple-100 text-purple-700',
  };

  return (
    <span className={cn(
      "text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium",
      colors[status] || 'bg-muted text-muted-foreground'
    )}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

// ─── Stat Card ───
function StatCard({ label, value, icon: Icon, trend }: {
  label: string;
  value: string | number;
  icon: any;
  trend?: string;
}) {
  return (
    <div className="bg-card border border-border/30 p-5">
      <div className="flex items-start justify-between mb-3">
        <Icon className="h-4 w-4 text-accent" />
        {trend && <span className="text-[10px] text-green-600 font-medium">{trend}</span>}
      </div>
      <p className="font-serif text-2xl text-foreground">{value}</p>
      <p className="text-caption text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

// ─── Data Table ───
function DataTable({ columns, data, onRowClick }: {
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
  data: any[];
  onRowClick?: (row: any) => void;
}) {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = data.filter(row =>
    searchTerm === '' ||
    Object.values(row).some(v =>
      String(v).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const aVal = a[sortKey] ?? '';
        const bVal = b[sortKey] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full bg-card border border-border/30 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <span className="text-caption text-muted-foreground">{sorted.length} results</span>
      </div>

      <div className="overflow-x-auto border border-border/30">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="text-caption text-muted-foreground text-left px-4 py-3 cursor-pointer hover:text-foreground transition-colors select-none whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-t border-border/20 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-secondary/30"
                )}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-foreground whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Detail Drawer ───
function DetailDrawer({ data, onClose, title }: {
  data: Record<string, any> | null;
  onClose: () => void;
  title: string;
}) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative w-full max-w-lg bg-background border-l border-border/30 h-full overflow-y-auto p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-xl text-foreground">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="space-y-4">
          {Object.entries(data).filter(([k]) => k !== 'id').map(([key, value]) => (
            <div key={key} className="border-b border-border/20 pb-3">
              <p className="text-caption text-muted-foreground mb-1">{key.replace(/_/g, ' ')}</p>
              <p className="text-sm text-foreground">
                {value === null || value === '' ? '—' :
                 typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                 Array.isArray(value) ? value.join(', ') :
                 String(value)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Admin ───
type Tab = 'dashboard' | 'contacts' | 'tours' | 'sales' | 'rentals' | 'bookings' | 'clients' | 'reviews' | 'consent' | 'data_rights' | 'audit';

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [detailData, setDetailData] = useState<Record<string, any> | null>(null);

  // Queries
  const { data: contacts = [] } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: tours = [] } = useQuery({
    queryKey: ['admin-tours'],
    queryFn: async () => {
      const { data } = await supabase.from('tour_requests').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: sales = [] } = useQuery({
    queryKey: ['admin-sales'],
    queryFn: async () => {
      const { data } = await supabase.from('sales_inquiries').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: rentals = [] } = useQuery({
    queryKey: ['admin-rentals'],
    queryFn: async () => {
      const { data } = await supabase.from('rental_applications').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['admin-clients'],
    queryFn: async () => {
      const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: consentLogs = [] } = useQuery({
    queryKey: ['admin-consent-logs'],
    queryFn: async () => {
      const { data } = await supabase.from('consent_logs').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: dataRightsRequests = [] } = useQuery({
    queryKey: ['admin-data-rights'],
    queryFn: async () => {
      const { data } = await supabase.from('data_rights_requests').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  const { data: auditLogs = [] } = useQuery({
    queryKey: ['admin-audit-logs'],
    queryFn: async () => {
      const { data } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    enabled: authed,
  });

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  const formatDate = (d: string | null) => d ? format(new Date(d), 'dd MMM yyyy') : '—';

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', label: 'Inquiries', icon: MessageSquare, count: contacts.length },
    { id: 'tours', label: 'Tour Requests', icon: Calendar, count: tours.length },
    { id: 'sales', label: 'Sales Leads', icon: TrendingUp, count: sales.length },
    { id: 'rentals', label: 'Rental Apps', icon: Home, count: rentals.length },
    { id: 'bookings', label: 'Bookings', icon: Calendar, count: bookings.length },
    { id: 'clients', label: 'Clients', icon: Users, count: clients.length },
    { id: 'reviews', label: 'Reviews', icon: Star, count: reviews.length },
    { id: 'consent', label: 'Consent Logs', icon: Shield, count: consentLogs.length },
    { id: 'data_rights', label: 'Data Rights', icon: FileText, count: dataRightsRequests.length },
    { id: 'audit', label: 'Audit Trail', icon: Activity, count: auditLogs.length },
  ];

  const totalLeads = contacts.length + tours.length + sales.length + rentals.length;
  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (Number(b.total_amount) || 0), 0);
  const pendingItems = [
    ...contacts.filter((c: any) => c.status === 'new'),
    ...tours.filter((t: any) => t.status === 'pending'),
    ...sales.filter((s: any) => s.status === 'new_inquiry'),
    ...rentals.filter((r: any) => r.status === 'pending'),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <span className="text-[16px] tracking-[0.25em] uppercase font-sans font-semibold text-foreground">
              MONT CHOISY
            </span>
            <span className="text-caption text-accent">CRM</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-caption text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Sidebar */}
        <nav className="w-56 shrink-0 border-r border-border/30 min-h-[calc(100vh-53px)] py-6 px-3 hidden md:block sticky top-[53px]">
          <div className="space-y-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] text-muted-foreground">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/30 z-40 overflow-x-auto">
          <div className="flex px-2 py-2 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 min-w-[64px] text-[9px] transition-all",
                  activeTab === tab.id ? "text-accent" : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Dashboard</h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Leads" value={totalLeads} icon={Users} />
                <StatCard label="Pending Actions" value={pendingItems.length} icon={Clock} />
                <StatCard label="Bookings" value={bookings.length} icon={Calendar} />
                <StatCard label="Revenue" value={`€${totalRevenue.toLocaleString()}`} icon={TrendingUp} />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent activity */}
                <div className="bg-card border border-border/30 p-5">
                  <h3 className="font-serif text-lg text-foreground mb-4">Recent Inquiries</h3>
                  <div className="space-y-3">
                    {contacts.slice(0, 5).map((c: any) => (
                      <div key={c.id} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                        <div>
                          <p className="text-sm text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={c.status || 'new'} />
                          <p className="text-[10px] text-muted-foreground mt-1">{formatDate(c.created_at)}</p>
                        </div>
                      </div>
                    ))}
                    {contacts.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No inquiries yet</p>}
                  </div>
                </div>

                {/* Pending items */}
                <div className="bg-card border border-border/30 p-5">
                  <h3 className="font-serif text-lg text-foreground mb-4">Requires Attention</h3>
                  <div className="space-y-3">
                    {pendingItems.slice(0, 8).map((item: any, i) => (
                      <div key={item.id || i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                        <div>
                          <p className="text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.email}</p>
                        </div>
                        <StatusBadge status={item.status || 'pending'} />
                      </div>
                    ))}
                    {pendingItems.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">All caught up! 🎉</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Inquiries */}
          {activeTab === 'contacts' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Contact Inquiries</h2>
              <DataTable
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'subject', label: 'Interest' },
                  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v || 'new'} /> },
                  { key: 'created_at', label: 'Date', render: (v) => formatDate(v) },
                ]}
                data={contacts}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}

          {/* Tour Requests */}
          {activeTab === 'tours' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Tour Requests</h2>
              <DataTable
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'tour_type', label: 'Type' },
                  { key: 'preferred_date', label: 'Preferred Date', render: (v) => formatDate(v) },
                  { key: 'preferred_time', label: 'Time' },
                  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v || 'pending'} /> },
                  { key: 'created_at', label: 'Submitted', render: (v) => formatDate(v) },
                ]}
                data={tours}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}

          {/* Sales Inquiries */}
          {activeTab === 'sales' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Sales Leads</h2>
              <DataTable
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'offer_amount', label: 'Offer', render: (v) => v ? `€${Number(v).toLocaleString()}` : '—' },
                  { key: 'preferred_contact_method', label: 'Preferred Contact' },
                  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v || 'new_inquiry'} /> },
                  { key: 'created_at', label: 'Date', render: (v) => formatDate(v) },
                ]}
                data={sales}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}

          {/* Rental Applications */}
          {activeTab === 'rentals' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Rental Applications</h2>
              <DataTable
                columns={[
                  { key: 'applicant_name', label: 'Name' },
                  { key: 'applicant_email', label: 'Email' },
                  { key: 'occupation', label: 'Occupation' },
                  { key: 'lease_duration', label: 'Lease (mo)' },
                  { key: 'monthly_income', label: 'Income', render: (v) => v ? `€${Number(v).toLocaleString()}` : '—' },
                  { key: 'desired_move_in', label: 'Move-in', render: (v) => formatDate(v) },
                  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v || 'pending'} /> },
                ]}
                data={rentals}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}

          {/* Bookings */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Bookings</h2>
              <DataTable
                columns={[
                  { key: 'guest_name', label: 'Guest' },
                  { key: 'guest_email', label: 'Email' },
                  { key: 'check_in_date', label: 'Check-in', render: (v) => formatDate(v) },
                  { key: 'check_out_date', label: 'Check-out', render: (v) => formatDate(v) },
                  { key: 'total_nights', label: 'Nights' },
                  { key: 'total_amount', label: 'Total', render: (v) => `€${Number(v).toLocaleString()}` },
                  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
                ]}
                data={bookings}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}

          {/* Clients */}
          {activeTab === 'clients' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Client Database</h2>
              <DataTable
                columns={[
                  { key: 'name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Phone' },
                  { key: 'country', label: 'Country' },
                  { key: 'client_type', label: 'Type' },
                  { key: 'total_bookings', label: 'Bookings' },
                  { key: 'total_spent', label: 'Total Spent', render: (v) => v ? `€${Number(v).toLocaleString()}` : '€0' },
                  { key: 'is_returning_customer', label: 'Returning', render: (v) => v ? '✓' : '—' },
                ]}
                data={clients}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl text-foreground mb-6">Reviews</h2>
              <DataTable
                columns={[
                  { key: 'reviewer_name', label: 'Reviewer' },
                  { key: 'reviewer_email', label: 'Email' },
                  { key: 'rating', label: 'Rating', render: (v) => '★'.repeat(v) + '☆'.repeat(5 - v) },
                  { key: 'title', label: 'Title' },
                  { key: 'is_approved', label: 'Approved', render: (v) => v ? '✓' : '✗' },
                  { key: 'is_verified', label: 'Verified', render: (v) => v ? '✓' : '—' },
                  { key: 'created_at', label: 'Date', render: (v) => formatDate(v) },
                ]}
                data={reviews}
                onRowClick={row => setDetailData(row)}
              />
            </motion.div>
          )}
        </main>
      </div>

      {/* Detail drawer */}
      {detailData && (
        <DetailDrawer
          data={detailData}
          onClose={() => setDetailData(null)}
          title="Record Details"
        />
      )}
    </div>
  );
}