import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Clock,
  MoreHorizontal
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
  Line
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

// ---------------- DATA ----------------
const throughputData = [
  { time: '06:00', actual: 400, target: 500 },
  { time: '08:00', actual: 1200, target: 1000 },
  { time: '10:00', actual: 2100, target: 2000 },
  { time: '12:00', actual: 3800, target: 3500 },
  { time: '14:00', actual: 5200, target: 5000 },
  { time: '16:00', actual: 6800, target: 6500 },
  { time: '18:00', actual: 8100, target: 8000 },
  { time: '20:00', actual: 9500, target: 9500 }
];

const sparklineData = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 18 },
  { value: 24 },
  { value: 20 },
  { value: 28 }
];

const productionLines = [
  {
    id: 1,
    name: 'Cold-Press Line A',
    sku: 'Avocado Oil (Refined)',
    batch: 'B-0501',
    progress: 75,
    units: '3,400 / 4,500 L',
    supervisor: 'Sarah Nakato',
    status: 'running'
  },
  {
    id: 2,
    name: 'Cold-Press Line B',
    sku: 'Avocado Oil (Virgin)',
    batch: 'B-0502',
    progress: 40,
    units: '1,200 / 3,000 L',
    supervisor: 'Joseph Mwangi',
    status: 'slow'
  },
  {
    id: 3,
    name: 'Bottling Line 1',
    sku: 'Glass 500ml (Virgin)',
    batch: 'PKG-102',
    progress: 90,
    units: '8,100 / 9,000 U',
    supervisor: 'Fatima Diallo',
    status: 'running'
  },
  {
    id: 4,
    name: 'Packaging Line 2',
    sku: 'Avocado Puree 5kg',
    batch: 'PUR-088',
    progress: 0,
    units: '0 / 1,000 U',
    supervisor: 'David Ochieng',
    status: 'stopped'
  }
];

const inventoryAlerts = [
  { id: 1, sku: 'Glass bottles 500ml', stock: '1,240', reorder: '2,000', critical: true },
  { id: 2, sku: 'Cardboard boxes (Medium)', stock: '450', reorder: '500', critical: false },
  { id: 3, sku: 'Avocado (Hass, Raw)', stock: '2,100 kg', reorder: '2,500 kg', critical: false }
];

const deliveries = [
  { id: 1, entity: 'Mbale Smallholder Union', type: 'Inbound Raw', eta: '09:30', status: 'cleared' },
  { id: 2, entity: 'Rift Valley Logistics', type: 'Outbound Finished', eta: '11:00', status: 'at-gate' },
  { id: 3, entity: 'Kakira Avocado Coop', type: 'Inbound Raw', eta: '14:15', status: 'in-transit' },
  { id: 4, entity: 'Nairobi Packaging Ltd', type: 'Inbound Supplies', eta: '16:00', status: 'delayed' }
];

const approvals = [
  { id: 1, title: 'PO #2241 — Kakira Avocado Coop', amount: 'UGX 4.8M', type: 'Procurement' },
  { id: 2, title: 'QC Release — Batch B-0498', amount: '-', type: 'Quality' },
  { id: 3, title: 'Maintenance WO #892', amount: 'UGX 850K', type: 'Facility' }
];

const timeline = [
  { id: 1, time: '08:42', module: 'Production', color: 'bg-avocado-500', text: 'Sarah N. started Batch B-0501 on Cold-Press Line A' },
  { id: 2, time: '08:15', module: 'Logistics', color: 'bg-status-info', text: 'Truck KCD-492 cleared weighbridge (Inbound)' },
  { id: 3, time: '07:30', module: 'QC', color: 'bg-status-warning', text: 'Batch B-0499 flagged for secondary testing' },
  { id: 4, time: '06:00', module: 'System', color: 'bg-soil-400', text: 'Shift A started. 42 operators clocked in.' }
];

// ---------------- MAIN DASHBOARD ----------------
export function Dashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-screen-2xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Good morning, Amara</h1>
          <p className="text-sm text-gray-500">
            Factory overview — Friday, 8 May 2026
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">Export</Button>
          <Button>New work order</Button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard title="Production Output" value="12,840 kg" trend="+8.2%" trendUp />
        <KpiCard title="Procurement" value="23" trend="-2" />
        <KpiCard title="Inventory" value="94%" alert />
        <KpiCard title="Delivery" value="96.4%" trend="+0.4%" trendUp />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2 space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Production Lines</CardTitle>
            </CardHeader>

            <CardContent>
              {productionLines.map(line => (
                <div key={line.id} className="py-4 border-b">
                  <div className="flex justify-between">
                    <div>
                      <p>{line.name}</p>
                      <p className="text-xs text-gray-500">{line.sku}</p>
                    </div>
                    <Badge>{line.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        <div className="space-y-6">

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>

            <CardContent>
              {inventoryAlerts.map(a => (
                <div key={a.id} className="flex justify-between py-2">
                  <span>{a.sku}</span>
                  {a.critical && <AlertTriangle />}
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
}

// ---------------- KPI CARD ----------------
function KpiCard({ title, value, trend, trendUp, alert }) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className={trendUp ? 'text-green-500' : 'text-red-500'}>
        {trend}
      </p>
      {alert && <AlertTriangle />}
    </div>
  );
}