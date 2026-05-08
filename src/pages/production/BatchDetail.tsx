import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockBatches, mockWorkOrders } from '../../lib/data/production';
import {
  ArrowLeft,
  Pause,
  AlertTriangle,
  ClipboardCheck,
  Download,
  Zap,
  Droplets,
  Thermometer,
  CheckCircle2,
  Clock,
  FileText } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { toast } from 'sonner';
const throughputData = [
{
  time: '08:00',
  actual: 0,
  target: 0
},
{
  time: '09:00',
  actual: 450,
  target: 500
},
{
  time: '10:00',
  actual: 980,
  target: 1000
},
{
  time: '11:00',
  actual: 1420,
  target: 1500
},
{
  time: '12:00',
  actual: 1950,
  target: 2000
},
{
  time: '13:00',
  actual: 2400,
  target: 2500
},
{
  time: '14:00',
  actual: 2850,
  target: 3000
}];

const timelineStages = [
{
  name: 'Avocado Wash',
  status: 'completed',
  time: '45m',
  operator: 'David O.',
  output: '1200 kg'
},
{
  name: 'Crushing',
  status: 'completed',
  time: '1h 15m',
  operator: 'David O.',
  output: '1180 kg'
},
{
  name: 'Cold-Pressing',
  status: 'completed',
  time: '2h 30m',
  operator: 'Sarah N.',
  output: '450 L'
},
{
  name: 'Filtration',
  status: 'in-progress',
  time: '1h 10m',
  operator: 'Sarah N.',
  output: '380 L (Running)'
},
{
  name: 'Bottling',
  status: 'pending',
  time: '-',
  operator: '-',
  output: '-'
},
{
  name: 'Labelling',
  status: 'pending',
  time: '-',
  operator: '-',
  output: '-'
},
{
  name: 'Cartoning',
  status: 'pending',
  time: '-',
  operator: '-',
  output: '-'
}];

const materials = [
{
  name: 'Grade-A Avocados',
  required: 1200,
  consumed: 1200,
  unit: 'kg',
  cost: 3.6
},
{
  name: 'Glass Bottles 500ml',
  required: 1000,
  consumed: 450,
  unit: 'units',
  cost: 0.9
},
{
  name: 'Bottle Caps',
  required: 1000,
  consumed: 450,
  unit: 'units',
  cost: 0.1
}];

export function BatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const batch = mockBatches.find((b) => b.id === id) || mockBatches[0];
  const wo = mockWorkOrders.find((w) => w.id === batch.workOrderId);
  const [actualQty, setActualQty] = useState(batch.qtyOut);
  // Simulate running counter
  useEffect(() => {
    if (batch.status === 'Running') {
      const interval = setInterval(() => {
        setActualQty((prev) => prev + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [batch.status]);
  const handleAction = (action: string) => {
    toast.success(`Batch ${action} successfully`);
  };
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/production/batches')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 transition-colors -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Batches
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold text-bark">{batch.id}</h2>
            <Badge
              variant={
              batch.status === 'Running' ?
              'success' :
              batch.status === 'Released' ?
              'info' :
              batch.status === 'On Hold' ||
              batch.status === 'Awaiting QC' ?
              'warning' :
              batch.status === 'Rejected' ?
              'danger' :
              'neutral'
              }
              className="text-sm px-3 py-1">
              
              {batch.status}
            </Badge>
          </div>
          <p className="text-lg text-soil-600 mt-1">{batch.product}</p>
        </div>
        <div className="flex space-x-3">
          {batch.status === 'Running' &&
          <>
              <Button
              variant="outline"
              onClick={() => handleAction('paused')}
              className="text-amber-600 border-amber-200 hover:bg-amber-50">
              
                <Pause className="w-4 h-4 mr-2" /> Pause Batch
              </Button>
              <Button
              variant="outline"
              onClick={() => handleAction('put on hold')}
              className="text-red-600 border-red-200 hover:bg-red-50">
              
                <AlertTriangle className="w-4 h-4 mr-2" /> Add Quality Hold
              </Button>
              <Button
              onClick={() => handleAction('released to QC')}
              className="bg-blue-600 hover:bg-blue-700 text-white">
              
                <ClipboardCheck className="w-4 h-4 mr-2" /> Release to QC
              </Button>
            </>
          }
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Started
            </p>
            <p className="text-lg font-bold text-bark mt-1 tabular-nums">
              {new Date(batch.startedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Elapsed
            </p>
            <p className="text-lg font-bold text-bark mt-1 tabular-nums">
              4h 15m
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Target Qty
            </p>
            <p className="text-lg font-bold text-bark mt-1 tabular-nums">
              {wo?.targetQty.toLocaleString() || 0}
            </p>
          </CardContent>
        </Card>
        <Card className="border-avocado-200 bg-avocado-50/30">
          <CardContent className="p-4">
            <p className="text-xs text-avocado-700 uppercase font-medium">
              Actual Qty
            </p>
            <p className="text-2xl font-bold text-avocado-700 mt-1 tabular-nums transition-all duration-500">
              {actualQty.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Yield %
            </p>
            <p className="text-lg font-bold text-bark mt-1 tabular-nums">
              {batch.yieldPct}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Throughput</CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={throughputData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0
                  }}>
                  
                  <defs>
                    <linearGradient
                      id="colorActual"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1">
                      
                      <stop offset="5%" stopColor="#5C7F33" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#5C7F33" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2CFBE" />
                  
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#A0552F',
                      fontSize: 12
                    }} />
                  
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#A0552F',
                      fontSize: 12
                    }} />
                  
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2CFBE',
                      borderRadius: '8px'
                    }} />
                  
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#CFAA90"
                    strokeDasharray="5 5"
                    fill="none"
                    name="Target" />
                  
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#5C7F33"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    name="Actual" />
                  
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative border-l-2 border-soil-100 ml-3 space-y-6">
                  {timelineStages.map((stage, idx) =>
                  <div key={idx} className="relative pl-6">
                      <div
                      className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${stage.status === 'completed' ? 'bg-soil-300' : stage.status === 'in-progress' ? 'bg-avocado-500 animate-pulse' : 'bg-soil-100'}`} />
                    
                      <div>
                        <p
                        className={`text-sm font-medium ${stage.status === 'pending' ? 'text-soil-400' : 'text-bark'}`}>
                        
                          {stage.name}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-soil-500">
                          {stage.status !== 'pending' &&
                        <>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" /> {stage.time}
                              </span>
                              <span>{stage.operator}</span>
                              <span className="font-medium text-soil-600">
                                {stage.output}
                              </span>
                            </>
                        }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Checkpoints</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-soil-100">
                  {[
                  {
                    name: 'Incoming Material Check',
                    status: 'Pass',
                    time: '08:05'
                  },
                  {
                    name: 'Mid-Press Sample',
                    status: 'Pass',
                    time: '10:30'
                  },
                  {
                    name: 'Filtration Clarity Test',
                    status: 'Pending',
                    time: '-'
                  },
                  {
                    name: 'Final Product Test',
                    status: 'Scheduled',
                    time: '-'
                  }].
                  map((qc, i) =>
                  <div
                    key={i}
                    className="p-4 flex items-center justify-between hover:bg-soil-50 cursor-pointer transition-colors">
                    
                      <div className="flex items-center space-x-3">
                        {qc.status === 'Pass' ?
                      <CheckCircle2 className="w-5 h-5 text-avocado-500" /> :
                      qc.status === 'Pending' ?
                      <Clock className="w-5 h-5 text-amber-500" /> :

                      <div className="w-5 h-5 rounded-full border-2 border-soil-200" />
                      }
                        <div>
                          <p className="text-sm font-medium text-bark">
                            {qc.name}
                          </p>
                          <p className="text-xs text-soil-500">
                            {qc.time !== '-' ?
                          `Completed at ${qc.time}` :
                          'Awaiting sample'}
                          </p>
                        </div>
                      </div>
                      <Badge
                      variant={
                      qc.status === 'Pass' ?
                      'success' :
                      qc.status === 'Pending' ?
                      'warning' :
                      'neutral'
                      }>
                      
                        {qc.status}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Materials Consumed</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                    <tr>
                      <th className="px-6 py-3 font-medium">Material</th>
                      <th className="px-6 py-3 font-medium text-right">
                        Required
                      </th>
                      <th className="px-6 py-3 font-medium text-right">
                        Consumed
                      </th>
                      <th className="px-6 py-3 font-medium text-right">
                        Variance
                      </th>
                      <th className="px-6 py-3 font-medium text-right">
                        Cost (UGX)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soil-100">
                    {materials.map((mat, i) =>
                    <tr key={i}>
                        <td className="px-6 py-4 text-bark">{mat.name}</td>
                        <td className="px-6 py-4 text-right tabular-nums text-soil-600">
                          {mat.required.toLocaleString()} {mat.unit}
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums text-soil-600">
                          {mat.consumed.toLocaleString()} {mat.unit}
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums">
                          {mat.consumed > mat.required ?
                        <span className="text-red-600">
                              +{mat.consumed - mat.required}
                            </span> :

                        <span className="text-avocado-600">0</span>
                        }
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums text-soil-600">
                          {(mat.cost * 1000000).toLocaleString()}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-soil-50 border-t border-soil-200 font-medium">
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-3 text-right text-soil-600">
                        
                        Total Material Cost
                      </td>
                      <td className="px-6 py-3 text-right text-bark tabular-nums">
                        4,600,000
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Team</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {[
              {
                name: 'Sarah Nakato',
                role: 'Supervisor',
                initials: 'SN'
              },
              {
                name: 'David Omondi',
                role: 'Press Operator',
                initials: 'DO'
              },
              {
                name: 'Grace Achieng',
                role: 'QC Sampler',
                initials: 'GA'
              }].
              map((member, i) =>
              <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-soil-100 flex items-center justify-center text-sm font-bold text-soil-600 border border-soil-200">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-bark">
                      {member.name}
                    </p>
                    <p className="text-xs text-soil-500">{member.role}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {[
              {
                name: 'Cold-Press Unit CP-A2',
                status: 'Healthy'
              },
              {
                name: 'Filter F-12',
                status: 'Healthy'
              },
              {
                name: 'Bottling Line BL-1',
                status: 'Needs PM soon'
              }].
              map((eq, i) =>
              <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-bark">{eq.name}</span>
                  <div
                  className={`w-2 h-2 rounded-full ${eq.status === 'Healthy' ? 'bg-avocado-500' : 'bg-amber-500'}`}
                  title={eq.status} />
                
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy & Utilities</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-soil-600">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Power</span>
                </div>
                <span className="text-sm font-medium text-bark tabular-nums">
                  142 kWh
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-soil-600">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">Water</span>
                </div>
                <span className="text-sm font-medium text-bark tabular-nums">
                  850 L
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-soil-600">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-sm">Steam</span>
                </div>
                <span className="text-sm font-medium text-bark tabular-nums">
                  45 kg
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost So Far (UGX)</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-soil-500">Materials</span>
                  <span className="text-bark tabular-nums">4.6M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-soil-500">Labour</span>
                  <span className="text-bark tabular-nums">0.8M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-soil-500">Energy</span>
                  <span className="text-bark tabular-nums">0.2M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-soil-500">Overhead</span>
                  <span className="text-bark tabular-nums">0.4M</span>
                </div>
              </div>
              <div className="pt-2 border-t border-soil-100 flex justify-between items-center">
                <span className="font-medium text-bark">Total</span>
                <span className="font-bold text-lg text-bark tabular-nums">
                  6.0M
                </span>
              </div>
              <p className="text-xs text-soil-500 text-right mt-1 tabular-nums">
                ~5,217 per unit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Linked Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
              {
                name: 'SOP - Cold Pressing',
                type: 'PDF'
              },
              {
                name: 'Recipe v2.3',
                type: 'PDF'
              },
              {
                name: 'MSDS - Avocado Oil',
                type: 'PDF'
              }].
              map((doc, i) =>
              <div
                key={i}
                className="flex justify-between items-center group cursor-pointer">
                
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-soil-400 group-hover:text-soil-600 transition-colors" />
                    <span className="text-sm text-soil-600 group-hover:text-bark transition-colors">
                      {doc.name}
                    </span>
                  </div>
                  <Download className="w-4 h-4 text-soil-300 group-hover:text-soil-600 transition-colors" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}