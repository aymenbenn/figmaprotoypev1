import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Truck,
  Clock,
  Droplets,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

// --- Mock Data ---
const throughputData = [
  { time: '06:00', actual: 400,  target: 500  },
  { time: '08:00', actual: 1200, target: 1000 },
  { time: '10:00', actual: 2100, target: 2000 },
  { time: '12:00', actual: 3800, target: 3500 },
  { time: '14:00', actual: 5200, target: 5000 },
  { time: '16:00', actual: 6800, target: 6500 },
  { time: '18:00', actual: 8100, target: 8000 },
  { time: '20:00', actual: 9500, target: 9500 },
];

const sparklineData = [
  { value: 10 }, { value: 15 }, { value: 12 }, { value: 18 },
  { value: 24 }, { value: 20 }, { value: 28 },
];

const productionLines = [
  { id: 1, name: 'Cold-Press Line A', sku: 'Avocado Oil (Refined)', batch: 'B-0501', progress: 75, units: '3,400 / 4,500 L', supervisor: 'Sarah Nakato',  status: 'running' },
  { id: 2, name: 'Cold-Press Line B', sku: 'Avocado Oil (Virgin)',  batch: 'B-0502', progress: 40, units: '1,200 / 3,000 L', supervisor: 'Joseph Mwangi', status: 'slow'    },
  { id: 3, name: 'Bottling Line 1',   sku: 'Glass 500ml (Virgin)', batch: 'PKG-102', progress: 90, units: '8,100 / 9,000 U', supervisor: 'Fatima Diallo',  status: 'running' },
  { id: 4, name: 'Packaging Line 2',  sku: 'Avocado Puree 5kg',    batch: 'PUR-088', progress: 0,  units: '0 / 1,000 U',     supervisor: 'David Ochieng',  status: 'stopped' },
];

const inventoryAlerts = [
  { id: 1, sku: 'Glass bottles 500ml',      stock: '1,240',   reorder: '2,000',    critical: true  },
  { id: 2, sku: 'Cardboard boxes (Medium)', stock: '450',     reorder: '500',      critical: false },
  { id: 3, sku: 'Avocado (Hass, Raw)',      stock: '2,100 kg', reorder: '2,500 kg', critical: false },
];

const deliveries = [
  { id: 1, entity: 'Mbale Smallholder Union', type: 'Inbound Raw',       eta: '09:30', status: 'cleared'    },
  { id: 2, entity: 'Rift Valley Logistics',   type: 'Outbound Finished', eta: '11:00', status: 'at-gate'    },
  { id: 3, entity: 'Kakira Avocado Coop',     type: 'Inbound Raw',       eta: '14:15', status: 'in-transit' },
  { id: 4, entity: 'Nairobi Packaging Ltd',   type: 'Inbound Supplies',  eta: '16:00', status: 'delayed'    },
];

const approvals = [
  { id: 1, title: 'PO #2241 — Kakira Avocado Coop', amount: 'UGX 4.8M', type: 'Procurement' },
  { id: 2, title: 'QC Release — Batch B-0498',      amount: '-',         type: 'Quality'     },
  { id: 3, title: 'Maintenance WO #892',             amount: 'UGX 850K', type: 'Facility'    },
];

const timeline = [
  { id: 1, time: '08:42', module: 'Production', color: 'bg-avocado-500',   text: 'Sarah N. started Batch B-0501 on Cold-Press Line A' },
  { id: 2, time: '08:15', module: 'Logistics',  color: 'bg-status-info',   text: 'Truck KCD-492 cleared weighbridge (Inbound)'        },
  { id: 3, time: '07:30', module: 'QC',         color: 'bg-status-warning', text: 'Batch B-0499 flagged for secondary testing'         },
  { id: 4, time: '06:00', module: 'System',     color: 'bg-soil-400',      text: 'Shift A started. 42 operators clocked in.'          },
];

// --- Tank Data ---
const TANK_CAPACITY = 5000;

const storageTanks = [
  { id: 1,  filled: 55, remaining: 2265 },
  { id: 2,  filled: 59, remaining: 2029 },
  { id: 3,  filled: 71, remaining: 1443 },
  { id: 4,  filled: 11, remaining: 4436 },
  { id: 5,  filled: 3,  remaining: 4857 },
  { id: 6,  filled: 43, remaining: 2856 },
  { id: 7,  filled: 75, remaining: 1255 },
  { id: 8,  filled: 87, remaining: 658  },
  { id: 9,  filled: 33, remaining: 3333 },
  { id: 10, filled: 64, remaining: 1787 },
  { id: 11, filled: 52, remaining: 2391 },
];

function getTankColor(pct: number) {
  if (pct >= 75) return { fill: '#ef4444', glow: 'rgba(239,68,68,0.3)' };
  if (pct >= 50) return { fill: '#4f9a3a', glow: 'rgba(79,154,58,0.3)'  };
  if (pct >= 25) return { fill: '#f59e0b', glow: 'rgba(245,158,11,0.3)' };
  return           { fill: '#6b7280', glow: 'rgba(107,114,128,0.2)'      };
}

function TankSVG({ filled, color }: { filled: number; color: { fill: string; glow: string } }) {
  const h = 80;
  const liquidH = (filled / 100) * h;
  const liquidY = 14 + (h - liquidH);
  const uid = `t${filled}`;

  return (
    <svg viewBox="0 0 60 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={color.fill} stopOpacity="0.7" />
          <stop offset="50%"  stopColor={color.fill} stopOpacity="1"   />
          <stop offset="100%" stopColor={color.fill} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#d1d5db" />
          <stop offset="40%"  stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="6" y="14" width="48" height={h} rx="2" />
        </clipPath>
      </defs>

      {/* Legs */}
      <rect x="14" y="96" width="6" height="12" rx="2" fill="#9ca3af" />
      <rect x="40" y="96" width="6" height="12" rx="2" fill="#9ca3af" />

      {/* Body */}
      <rect x="6" y="10" width="48" height={h + 4} rx="6" fill={`url(#body-${uid})`} stroke="#9ca3af" strokeWidth="1.5" />

      {/* Liquid */}
      {filled > 0 && (
        <rect x="6" y={liquidY} width="48" height={liquidH}
          fill={`url(#liq-${uid})`} clipPath={`url(#clip-${uid})`} />
      )}

      {/* Surface shimmer */}
      {filled > 2 && (
        <rect x="8" y={liquidY} width="44" height="3" rx="1"
          fill="white" fillOpacity="0.35" clipPath={`url(#clip-${uid})`} />
      )}

      {/* Top cap */}
      <rect x="18" y="6"  width="24" height="8" rx="3" fill="#9ca3af" />
      <rect x="26" y="2"  width="8"  height="6" rx="2" fill="#6b7280" />

      {/* Shine */}
      <rect x="10" y="14" width="6" height={h} rx="3"
        fill="white" fillOpacity="0.18" clipPath={`url(#clip-${uid})`} />

      {/* Gauge lines */}
      {[25, 50, 75].map((lvl) => {
        const ly = 14 + h - (lvl / 100) * h;
        return <line key={lvl} x1="6" y1={ly} x2="54" y2={ly} stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="2 2" />;
      })}
    </svg>
  );
}

function TankCard({ tank }: { tank: typeof storageTanks[0] }) {
  const color = getTankColor(tank.filled);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-14 h-24 relative" style={{ filter: `drop-shadow(0 0 5px ${color.glow})` }}>
        <TankSVG filled={tank.filled} color={color} />
      </div>
      <div className="text-center">
        <p className="text-[11px] font-bold text-bark">Tank {tank.id}</p>
        <p className="text-[11px] font-semibold tabular-nums" style={{ color: color.fill }}>{tank.filled}% filled</p>
        <p className="text-[10px] text-soil-400 tabular-nums">{tank.remaining.toLocaleString()} L left</p>
      </div>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.fill }} />
    </div>
  );
}

// --- Main Dashboard ---
export function Dashboard() {
  const totalFilled = storageTanks.reduce((s, t) => s + (t.filled / 100) * TANK_CAPACITY, 0);
  const avgFill = Math.round(storageTanks.reduce((s, t) => s + t.filled, 0) / storageTanks.length);
  const criticalTanks = storageTanks.filter((t) => t.filled < 25).length;

  return (
    <div className="p-6 lg:p-8 max-w-screen-2xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* ── Hero Header ── */}
      <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 140 }}>
        {/* Background image from public folder */}
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Fallback gradient (always present, sits behind image) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a2e0a 0%, #2d5016 40%, #4f7c1e 70%, #7aab3a 100%)',
          }}
        />
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 lg:p-8">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Good morning, Amara</h1>
            <p className="text-white/70 text-sm mt-1">
              Factory overview — Friday, 8 May 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
              Export daily report
            </Button>
            <Button variant="primary">New work order</Button>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Production Output Today" value="12,840 kg" subtext="avocado oil"           trend="+8.2%" trendUp={true}  accent="bg-avocado-500"    />
        <KpiCard title="Open Procurement Orders" value="23"        subtext="4 awaiting approval"  trend="-2"    trendUp={false} accent="bg-soil-500"       />
        <KpiCard title="Inventory Health"         value="94%"       subtext="7 SKUs below reorder" trend="-1.5%" trendUp={false} accent="bg-status-warning" alert={true} />
        <KpiCard title="On-time Delivery"         value="96.4%"     subtext="2 shipments delayed"  trend="+0.4%" trendUp={true}  accent="bg-status-info"    />
      </div>

      {/* ── Avocado Oil Storage Tanks ── */}
      <Card className="overflow-hidden">
        <CardHeader className="py-4 border-b border-soil-50 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-avocado-500" />
            Avocado Oil Storage Tanks
            {criticalTanks > 0 && (
              <span className="bg-status-warning text-bone text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {criticalTanks} critical
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-4 text-xs text-soil-500">
            <span>Avg fill: <span className="font-semibold text-bark">{avgFill}%</span></span>
            <span>Total: <span className="font-semibold text-bark tabular-nums">{Math.round(totalFilled).toLocaleString()} / {(storageTanks.length * TANK_CAPACITY).toLocaleString()} L</span></span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Tank grid — 11 tanks across */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-4 justify-items-center">
            {storageTanks.map((tank) => <TankCard key={tank.id} tank={tank} />)}
          </div>

          {/* tank.png image */}
          <div className="mt-6 flex justify-center">
            <img
              src="/tank.png"
              alt="Storage tank diagram"
              className="h-24 object-contain opacity-75"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center text-[11px] text-soil-500">
            {[
              { label: 'High ≥75%',    color: '#ef4444' },
              { label: 'Normal 50–74%', color: '#4f9a3a' },
              { label: 'Low 25–49%',   color: '#f59e0b' },
              { label: 'Critical <25%', color: '#6b7280' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN — spans 2 */}
        <div className="lg:col-span-2 space-y-6">

          {/* Production Lines */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle>Production lines — live status</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-soil-500">View all</Button>
            </CardHeader>
            <div className="divide-y divide-soil-50">
              {productionLines.map((line) => (
                <div key={line.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-soil-50/50 transition-colors">
                  <div className="w-full sm:w-1/3">
                    <p className="font-semibold text-bark text-sm">{line.name}</p>
                    <p className="text-xs text-soil-500 mt-0.5">{line.sku} · {line.batch}</p>
                  </div>
                  <div className="w-full sm:w-1/3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-soil-600 font-medium tabular-nums">{line.units}</span>
                      <span className="text-soil-400 tabular-nums">{line.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-soil-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000',
                          line.status === 'running' ? 'bg-avocado-500' :
                          line.status === 'slow'    ? 'bg-status-warning' : 'bg-status-danger'
                        )}
                        style={{ width: `${line.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/3 flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-soil-200 text-[10px] font-bold flex items-center justify-center text-soil-700">
                        {line.supervisor.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-xs text-soil-600 hidden sm:inline-block">{line.supervisor}</span>
                    </div>
                    <Badge variant={line.status === 'running' ? 'success' : line.status === 'slow' ? 'warning' : 'danger'}>
                      {line.status.charAt(0).toUpperCase() + line.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Throughput Chart */}
          <Card>
            <CardHeader className="py-4">
              <CardTitle>Throughput today vs target</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-2 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughputData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="var(--avocado-500)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--avocado-500)" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--soil-100)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--soil-400)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--soil-400)' }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--soil-100)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                  />
                  <Area type="monotone" dataKey="target" stroke="var(--soil-300)" strokeDasharray="5 5" fill="none" strokeWidth={2} name="Target (L)" />
                  <Area type="monotone" dataKey="actual" stroke="var(--avocado-500)" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} name="Actual (L)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
            {/* A.png below chart */}
           <div className="w-full border-t border-soil-50 overflow-hidden">
  <img
    src="/A.png"
    alt="Factory visual"
    className="w-full h-48 object-cover"
    onError={(e) => {
      (e.currentTarget as HTMLImageElement).style.display = 'none';
    }}
  />
</div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* Inventory Alerts */}
          <Card>
            <CardHeader className="py-4 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Inventory alerts
                <span className="bg-status-danger text-bone text-[10px] px-1.5 py-0.5 rounded-full font-bold">3</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-soil-50">
                {inventoryAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 flex items-start gap-3 hover:bg-soil-50/50 transition-colors">
                    <AlertTriangle className={cn('h-5 w-5 shrink-0 mt-0.5', alert.critical ? 'text-status-danger' : 'text-status-warning')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-bark truncate">{alert.sku}</p>
                      <p className="text-xs text-soil-500 mt-1 tabular-nums">
                        <span className={cn('font-semibold', alert.critical ? 'text-status-danger' : 'text-status-warning')}>{alert.stock}</span>
                        {' '}remaining (reorder at {alert.reorder})
                      </p>
                    </div>
                    <button className="text-xs font-medium text-soil-500 hover:text-soil-800">View</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Deliveries */}
          <Card>
            <CardHeader className="py-4"><CardTitle>Today's deliveries</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-soil-50">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 flex items-center justify-between hover:bg-soil-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-soil-50 flex items-center justify-center border border-soil-100 shrink-0">
                        <Truck className="h-4 w-4 text-soil-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-bark truncate max-w-[140px] sm:max-w-[180px]">{delivery.entity}</p>
                        <p className="text-xs text-soil-400 mt-0.5 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {delivery.eta} · {delivery.type}
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      delivery.status === 'cleared'    ? 'success' :
                      delivery.status === 'at-gate'    ? 'info'    :
                      delivery.status === 'delayed'    ? 'danger'  : 'neutral'
                    }>
                      {delivery.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader className="py-4"><CardTitle>Pending approvals</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-soil-50">
                {approvals.map((approval) => (
                  <div key={approval.id} className="p-4 hover:bg-soil-50/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-bark">{approval.title}</p>
                        <p className="text-xs text-soil-400 mt-0.5">{approval.type}</p>
                      </div>
                      <span className="text-sm font-semibold text-soil-700 tabular-nums">{approval.amount}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="primary"  size="sm" className="flex-1 h-7 text-xs">Approve</Button>
                      <Button variant="outline"  size="sm" className="flex-1 h-7 text-xs">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Timeline */}
      <Card className="overflow-hidden relative">
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
          <svg width="200" height="100" viewBox="0 0 200 100" fill="currentColor" className="text-soil-900">
            <path d="M20 100V60L50 40V100H20ZM60 100V30L90 10V100H60ZM100 100V50L130 30V100H100ZM140 100V20L170 0V100H140ZM180 100V70L200 50V100H180Z" />
          </svg>
        </div>
        <CardHeader className="py-4 border-b border-soil-50">
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 relative z-10">
            {timeline.map((item, idx) => (
              <div key={item.id} className="flex-1 relative">
                {idx !== timeline.length - 1 && (
                  <div className="hidden sm:block absolute top-2.5 left-6 right-[-24px] h-px bg-soil-100" />
                )}
                {idx !== timeline.length - 1 && (
                  <div className="sm:hidden absolute left-2.5 top-6 bottom-[-24px] w-px bg-soil-100" />
                )}
                <div className="flex sm:flex-col items-start gap-3 sm:gap-2">
                  <div className={cn('w-5 h-5 rounded-full border-4 border-bone relative z-10 shrink-0', item.color)} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-bark tabular-nums">{item.time}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-soil-400">{item.module}</span>
                    </div>
                    <p className="text-sm text-soil-600 leading-snug">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- KPI Card ---
function KpiCard({ title, value, subtext, trend, trendUp, accent, alert = false }: any) {
  return (
    <Card className="relative overflow-hidden group">
      <div className={cn('absolute top-0 left-0 w-1 h-full', accent)} />
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-soil-500">{title}</p>
          {alert && <AlertTriangle className="h-4 w-4 text-status-warning animate-pulse" />}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold text-bark tabular-nums tracking-tight">{value}</h3>
            <p className="text-xs text-soil-400 mt-1">{subtext}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-16 h-8 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line type="monotone" dataKey="value" stroke={trendUp ? 'var(--avocado-500)' : 'var(--status-warning)'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={cn('flex items-center text-xs font-semibold tabular-nums', trendUp ? 'text-avocado-600' : 'text-status-warning')}>
              {trendUp ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
              {trend}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}