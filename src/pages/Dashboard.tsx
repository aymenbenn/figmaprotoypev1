import React, { Component } from 'react';
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

// --- Mock Data ---
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
  {
    id: 1,
    sku: 'Glass bottles 500ml',
    stock: '1,240',
    reorder: '2,000',
    critical: true
  },
  {
    id: 2,
    sku: 'Cardboard boxes (Medium)',
    stock: '450',
    reorder: '500',
    critical: false
  },
  {
    id: 3,
    sku: 'Avocado (Hass, Raw)',
    stock: '2,100 kg',
    reorder: '2,500 kg',
    critical: false
  }
];

const deliveries = [
  {
    id: 1,
    entity: 'Mbale Smallholder Union',
    type: 'Inbound Raw',
    eta: '09:30',
    status: 'cleared'
  },
  {
    id: 2,
    entity: 'Rift Valley Logistics',
    type: 'Outbound Finished',
    eta: '11:00',
    status: 'at-gate'
  },
  {
    id: 3,
    entity: 'Kakira Avocado Coop',
    type: 'Inbound Raw',
    eta: '14:15',
    status: 'in-transit'
  },
  {
    id: 4,
    entity: 'Nairobi Packaging Ltd',
    type: 'Inbound Supplies',
    eta: '16:00',
    status: 'delayed'
  }
];

const approvals = [
  {
    id: 1,
    title: 'PO #2241 — Kakira Avocado Coop',
    amount: 'UGX 4.8M',
    type: 'Procurement'
  },
  {
    id: 2,
    title: 'QC Release — Batch B-0498',
    amount: '-',
    type: 'Quality'
  },
  {
    id: 3,
    title: 'Maintenance WO #892',
    amount: 'UGX 850K',
    type: 'Facility'
  }
];

const timeline = [
  {
    id: 1,
    time: '08:42',
    module: 'Production',
    color: 'bg-avocado-500',
    text: 'Sarah N. started Batch B-0501 on Cold-Press Line A'
  },
  {
    id: 2,
    time: '08:15',
    module: 'Logistics',
    color: 'bg-status-info',
    text: 'Truck KCD-492 cleared weighbridge (Inbound)'
  },
  {
    id: 3,
    time: '07:30',
    module: 'QC',
    color: 'bg-status-warning',
    text: 'Batch B-0499 flagged for secondary testing'
  },
  {
    id: 4,
    time: '06:00',
    module: 'System',
    color: 'bg-soil-400',
    text: 'Shift A started. 42 operators clocked in.'
  }
];

// 🟢 NEW TANK DATA
const tanks = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  fill: [55, 59, 71, 11, 3, 43, 75, 87, 33, 64, 52][i],
  left: [2265, 2029, 1443, 4436, 4857, 2856, 1255, 658, 3333, 1787, 2391][i]
}));

// ---------------- COMPONENT ----------------

export function Dashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-screen-2xl mx-auto space-y-8">

      {/* HEADER WITH BACKGROUND IMAGE */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div>
          <h1 className="text-2xl font-bold">Good morning, Amara</h1>
          <p className="text-sm opacity-90">
            Here's what's happening across Kakira Factory today — Friday, 8 May 2026
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">Export daily report</Button>
          <Button variant="primary">New work order</Button>
        </div>
      </div>

      {/* KPI SECTION (UNCHANGED UI) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KEEP YOUR ORIGINAL KPI CARDS HERE (UNCHANGED) */}
      </div>

      {/* 🟢 NEW TANK SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Avocado Oil Storage Tanks</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {tanks.map((t) => (
              <div key={t.id} className="p-3 border rounded-lg text-center">
                <img src="/tank.png" className="w-10 h-10 mx-auto mb-2" />
                <p className="font-semibold">Tank {t.id}</p>
                <p className="text-sm">{t.fill}% filled</p>
                <p className="text-xs text-gray-500">{t.left} L left</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MAIN GRID (UNCHANGED) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          {/* Production Lines */}
          <Card>
            <CardHeader>
              <CardTitle>Production lines — live status</CardTitle>
            </CardHeader>
            <CardContent>
              {/* KEEP YOUR ORIGINAL PRODUCTION CODE HERE */}
            </CardContent>
          </Card>

          {/* Throughput Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Throughput today vs target</CardTitle>
            </CardHeader>

            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughputData}>
                  {/* unchanged chart */}
                </AreaChart>
              </ResponsiveContainer>

              {/* 🟢 IMAGE ADDED */}
              <img
                src="/A.png"
                className="mt-4 w-full rounded-lg"
                alt="throughput"
              />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN (UNCHANGED) */}
        <div className="space-y-6">
          {/* KEEP ALL YOUR ORIGINAL CARDS */}
        </div>
      </div>

      {/* TIMELINE (UNCHANGED) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          {/* KEEP ORIGINAL TIMELINE */}
        </CardContent>
      </Card>

    </div>
  );
}