import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockLines, mockBatches } from '../../lib/data/production';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area } from
'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  AlertTriangle,
  Clock } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
const shiftData = [
{
  name: 'Cold-Press A',
  target: 4000,
  actual: 3200
},
{
  name: 'Cold-Press B',
  target: 4000,
  actual: 750
},
{
  name: 'Bottling 1',
  target: 1500,
  actual: 1150
},
{
  name: 'Packaging 2',
  target: 2000,
  actual: 1500
}];

const downtimeEvents = [
{
  time: '10:45',
  line: 'Cold-Press Line B',
  reason: 'Mechanical',
  duration: '45m',
  type: 'danger'
},
{
  time: '09:15',
  line: 'Bottling Line 1',
  reason: 'Changeover',
  duration: '20m',
  type: 'info'
},
{
  time: '08:30',
  line: 'Packaging Line 2',
  reason: 'Material Wait',
  duration: '15m',
  type: 'warning'
},
{
  time: '07:00',
  line: 'Cold-Press Line A',
  reason: 'Quality Hold',
  duration: '30m',
  type: 'warning'
},
{
  time: '06:15',
  line: 'Cold-Press Line B',
  reason: 'Electrical',
  duration: '1h 10m',
  type: 'danger'
}];

export function ProductionOverview() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-3 -mt-20 relative z-10 mr-8">
        <Button variant="outline">Schedule run</Button>
        <Button onClick={() => navigate('/production/work-orders/new')}>
          + New work order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">
                  Output Today (kg/L)
                </p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  6,600
                </h3>
              </div>
              <div className="p-2 bg-avocado-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-avocado-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-avocado-600 font-medium">+4.2%</span>
              <span className="text-soil-400 ml-2">vs yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">
                  Active Batches
                </p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  3
                </h3>
              </div>
              <div className="p-2 bg-soil-50 rounded-lg">
                <Play className="w-5 h-5 text-soil-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-soil-600 font-medium">2 on hold</span>
              <span className="text-soil-400 ml-2">across 4 lines</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">Average OEE</p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  74.8%
                </h3>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-amber-600 font-medium">-2.1%</span>
              <span className="text-soil-400 ml-2">vs target (80%)</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">
                  Average Yield
                </p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  92.4%
                </h3>
              </div>
              <div className="p-2 bg-avocado-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-avocado-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-avocado-600 font-medium">+1.5%</span>
              <span className="text-soil-400 ml-2">vs yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Production lines — live status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-soil-100">
              {mockLines.map((line) =>
              <div
                key={line.id}
                className="p-4 hover:bg-soil-50 cursor-pointer transition-colors flex items-center justify-between"
                onClick={() => navigate(`/production/lines/${line.id}`)}>
                
                  <div className="flex items-center space-x-4 w-1/3">
                    <div
                    className={`w-2 h-2 rounded-full ${line.status === 'Running' ? 'bg-avocado-500' : line.status === 'Stopped' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  
                    <div>
                      <p className="font-medium text-bark">{line.name}</p>
                      <p className="text-xs text-soil-500">{line.type}</p>
                    </div>
                  </div>
                  <div className="w-1/3">
                    {line.currentBatch ?
                  <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-soil-600 font-medium">
                            {line.currentBatch}
                          </span>
                          <span className="text-soil-500 tabular-nums">
                            {line.outputToday} {line.unit}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-soil-100 rounded-full overflow-hidden">
                          <div
                        className={`h-full rounded-full ${line.status === 'Running' ? 'bg-avocado-500' : line.status === 'Stopped' ? 'bg-red-500' : 'bg-amber-500'}`}
                        style={{
                          width: `${line.outputToday / 5000 * 100}%`
                        }} />
                      
                        </div>
                      </div> :

                  <span className="text-sm text-soil-400 italic">Idle</span>
                  }
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <Badge
                    variant={
                    line.status === 'Running' ?
                    'success' :
                    line.status === 'Stopped' ?
                    'danger' :
                    'warning'
                    }>
                    
                      {line.status}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent downtime events</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-soil-100">
              {downtimeEvents.map((event, i) =>
              <div key={i} className="p-4 flex items-start space-x-3">
                  <div className="mt-0.5">
                    {event.type === 'danger' ?
                  <AlertTriangle className="w-4 h-4 text-red-500" /> :
                  event.type === 'warning' ?
                  <Clock className="w-4 h-4 text-amber-500" /> :

                  <Pause className="w-4 h-4 text-blue-500" />
                  }
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-bark">
                        {event.line}
                      </p>
                      <span className="text-xs text-soil-500 tabular-nums">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-soil-600">{event.reason}</p>
                      <span className="text-xs font-medium text-bark">
                        {event.duration}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active batches</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                  <tr>
                    <th className="px-4 py-3 font-medium">Batch ID</th>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Progress</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soil-100">
                  {mockBatches.
                  filter(
                    (b) => b.status === 'Running' || b.status === 'On Hold'
                  ).
                  map((batch) =>
                  <tr
                    key={batch.id}
                    className="hover:bg-soil-50 cursor-pointer"
                    onClick={() =>
                    navigate(`/production/batches/${batch.id}`)
                    }>
                    
                        <td className="px-4 py-3 font-medium text-soil-700">
                          {batch.id}
                        </td>
                        <td className="px-4 py-3 text-bark truncate max-w-[150px]">
                          {batch.product}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-1.5 bg-soil-100 rounded-full overflow-hidden">
                              <div
                            className={`h-full rounded-full ${batch.status === 'Running' ? 'bg-avocado-500' : 'bg-amber-500'}`}
                            style={{
                              width: `${batch.progress}%`
                            }} />
                          
                            </div>
                            <span className="text-xs text-soil-500 tabular-nums">
                              {batch.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                        variant={
                        batch.status === 'Running' ? 'success' : 'warning'
                        }>
                        
                            {batch.status}
                          </Badge>
                        </td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shift performance (Target vs Actual)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={shiftData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2CFBE" />
                
                <XAxis
                  dataKey="name"
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
                  cursor={{
                    fill: '#F1E8DF'
                  }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2CFBE',
                    borderRadius: '8px'
                  }} />
                
                <Bar
                  dataKey="target"
                  fill="#CFAA90"
                  radius={[4, 4, 0, 0]}
                  name="Target" />
                
                <Bar
                  dataKey="actual"
                  fill="#5C7F33"
                  radius={[4, 4, 0, 0]}
                  name="Actual" />
                
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>);

}