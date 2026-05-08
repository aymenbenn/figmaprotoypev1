import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockLines, mockBatches } from '../../lib/data/production';
import { ArrowLeft, AlertTriangle, Wrench, Activity } from 'lucide-react';
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
const oeeTrendData = [
{
  day: 'Mon',
  oee: 82,
  availability: 90,
  performance: 95
},
{
  day: 'Tue',
  oee: 85,
  availability: 92,
  performance: 96
},
{
  day: 'Wed',
  oee: 78,
  availability: 85,
  performance: 94
},
{
  day: 'Thu',
  oee: 88,
  availability: 95,
  performance: 97
},
{
  day: 'Fri',
  oee: 84,
  availability: 92,
  performance: 95
},
{
  day: 'Sat',
  oee: 86,
  availability: 94,
  performance: 96
},
{
  day: 'Sun',
  oee: 89,
  availability: 96,
  performance: 98
}];

const downtimeLog = [
{
  time: '10:45',
  duration: '45m',
  reason: 'Mechanical',
  notes: 'Conveyor belt jammed',
  resolvedBy: 'David O.'
},
{
  time: '08:30',
  duration: '15m',
  reason: 'Material Wait',
  notes: 'Waiting for bottles from warehouse',
  resolvedBy: 'Sarah N.'
},
{
  time: 'Yesterday 14:00',
  duration: '1h 10m',
  reason: 'Electrical',
  notes: 'Sensor fault on filler',
  resolvedBy: 'Maint. Team'
}];

export function LineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const line = mockLines.find((l) => l.id === id) || mockLines[0];
  const handleAction = (action: string) => {
    toast.success(`Line ${action} successfully`);
  };
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/production/lines')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 transition-colors -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Lines
      </button>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold text-bark">{line.name}</h2>
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
          <p className="text-lg text-soil-600 mt-1">{line.type}</p>
        </div>
        <div className="flex space-x-3">
          {line.status === 'Running' &&
          <Button
            variant="outline"
            onClick={() => handleAction('stopped')}
            className="text-red-600 border-red-200 hover:bg-red-50">
            
              <AlertTriangle className="w-4 h-4 mr-2" /> Stop Line
            </Button>
          }
          <Button
            onClick={() => handleAction('marked for maintenance')}
            className="bg-soil-600 hover:bg-soil-700 text-white">
            
            <Wrench className="w-4 h-4 mr-2" /> Mark for Maintenance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-soil-200 bg-soil-50/50">
          <CardContent className="p-4">
            <p className="text-xs text-soil-600 uppercase font-medium">OEE</p>
            <p className="text-2xl font-bold text-bark mt-1 tabular-nums">
              {line.oee}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Availability
            </p>
            <p className="text-xl font-bold text-bark mt-1 tabular-nums">
              {line.availability}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Performance
            </p>
            <p className="text-xl font-bold text-bark mt-1 tabular-nums">
              {line.performance}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-soil-500 uppercase font-medium">
              Quality
            </p>
            <p className="text-xl font-bold text-bark mt-1 tabular-nums">
              {line.quality}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>OEE Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={oeeTrendData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A0552F" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#A0552F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2CFBE" />
                
                <XAxis
                  dataKey="day"
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
                  }}
                  domain={[60, 100]} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2CFBE',
                    borderRadius: '8px'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="oee"
                  stroke="#A0552F"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOee)"
                  name="OEE %" />
                
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 border-b border-soil-100">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Wrench className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-bark">Monthly PM</p>
                  <p className="text-xs text-soil-500">
                    Scheduled for May 15, 2026
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => navigate('/maintenance')}>
                
                View in Maintenance
              </Button>
            </div>
            <div className="p-6">
              <p className="text-xs text-soil-500 uppercase font-medium mb-3">
                Last Maintenance
              </p>
              <p className="text-sm text-bark">April 15, 2026</p>
              <p className="text-xs text-soil-500 mt-1">
                Routine lubrication and belt check. No issues found.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Run History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Batch ID</th>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {mockBatches.
                filter((b) => b.line === line.name).
                map((batch) =>
                <tr
                  key={batch.id}
                  className="hover:bg-soil-50 cursor-pointer transition-colors"
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
                        <Badge
                      variant={
                      batch.status === 'Running' ? 'success' : 'neutral'
                      }>
                      
                          {batch.status}
                        </Badge>
                      </td>
                    </tr>
                )}
                {mockBatches.filter((b) => b.line === line.name).length ===
                0 &&
                <tr>
                    <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-soil-500">
                    
                      No batches run today.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Downtime Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                  <th className="px-4 py-3 font-medium">Reason</th>
                  <th className="px-4 py-3 font-medium">Resolved By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {downtimeLog.map((log, i) =>
                <tr key={i} className="hover:bg-soil-50 transition-colors">
                    <td className="px-4 py-3 text-soil-600 tabular-nums">
                      {log.time}
                    </td>
                    <td className="px-4 py-3 font-medium text-bark tabular-nums">
                      {log.duration}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-bark">{log.reason}</span>
                      <p className="text-xs text-soil-500 mt-0.5">
                        {log.notes}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-soil-600">
                      {log.resolvedBy}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>);

}