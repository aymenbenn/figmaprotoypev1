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

/* ---------------- MOCK DATA ---------------- */

const tanks = Array.from({ length: 11 }).map((_, i) => {
  const capacity = 5000;
  const filled = Math.floor(Math.random() * capacity);

  return {
    id: i + 1,
    name: `Tank ${i + 1}`,
    capacity,
    filled,

    // ✅ ONE SINGLE IMAGE FOR ALL TANKS
    image: `/illustrations/tanks/tank.png`
  };
});

const productionLines = [
  { id: 1, name: 'Cold-Press Line A', progress: 75, status: 'running' },
  { id: 2, name: 'Cold-Press Line B', progress: 40, status: 'slow' },
  { id: 3, name: 'Bottling Line 1', progress: 90, status: 'running' },
  { id: 4, name: 'Packaging Line 2', progress: 0, status: 'stopped' }
];

const throughputData = [
  { time: '06:00', actual: 400, target: 500 },
  { time: '10:00', actual: 2100, target: 2000 },
  { time: '14:00', actual: 5200, target: 5000 },
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

/* ---------------- DASHBOARD ---------------- */

export function Dashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-screen-2xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* HERO */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow">
        <div>
          <h1 className="text-2xl font-bold text-bark">Avocado Oil Factory</h1>
          <p className="text-soil-500 text-sm mt-1">
            Live production + storage overview
          </p>
        </div>

        {/* ✅ HERO PNG (replaced SVG) */}
        <img
          src="/illustrations/hero/hero.png"
          className="w-40 h-28"
          alt="factory hero"
        />
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4">Production 12,840 L</CardContent></Card>
        <Card><CardContent className="p-4">Orders 23</CardContent></Card>
        <Card><CardContent className="p-4">Inventory 94%</CardContent></Card>
        <Card><CardContent className="p-4">Delivery 96%</CardContent></Card>
      </div>

      {/* ---------------- TANKS ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Avocado Oil Storage Tanks</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

            {tanks.map((tank) => {
              const percent = Math.round((tank.filled / tank.capacity) * 100);
              const remaining = tank.capacity - tank.filled;

              return (
                <div key={tank.id} className="border rounded-lg p-3 text-center">

                  {/* SAME PNG FOR ALL TANKS */}
                  <img
                    src={tank.image}
                    className="w-16 h-16 mx-auto mb-2"
                    alt={tank.name}
                  />

                  <p className="font-semibold">{tank.name}</p>

                  <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    <div
                      className="h-2 bg-green-500 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <p className="text-xs mt-2">{percent}% filled</p>
                  <p className="text-xs text-gray-500">{remaining}L left</p>

                </div>
              );
            })}

          </div>
        </CardContent>
      </Card>

      {/* ---------------- PRODUCTION ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Production Lines</CardTitle>
        </CardHeader>

        <CardContent>
          {productionLines.map((line) => (
            <div key={line.id} className="flex justify-between p-3 border-b">
              <span>{line.name}</span>
              <Badge>{line.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ---------------- CHART ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Throughput</CardTitle>
        </CardHeader>

        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />

              <Area
                dataKey="actual"
                stroke="#22c55e"
                fill="#bbf7d0"
              />

              <Area
                dataKey="target"
                stroke="#94a3b8"
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}