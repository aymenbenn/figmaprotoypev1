import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  mockSuppliers,
  mockPurchaseOrders,
  mockGRNs } from
'../../lib/data/procurement';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend } from
'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle } from
'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const spendData = [
{
  name: 'Raw Avocados',
  value: 62,
  color: '#5C7F33'
},
{
  name: 'Packaging',
  value: 22,
  color: '#A0552F'
},
{
  name: 'Chemicals',
  value: 8,
  color: '#D4923A'
},
{
  name: 'Logistics',
  value: 5,
  color: '#3D6B7F'
},
{
  name: 'Other',
  value: 3,
  color: '#CFAA90'
}];

const priceTrendData = [
{
  month: 'Dec',
  avocados: 1600,
  glass: 800,
  cartons: 1400
},
{
  month: 'Jan',
  avocados: 1650,
  glass: 800,
  cartons: 1420
},
{
  month: 'Feb',
  avocados: 1700,
  glass: 820,
  cartons: 1450
},
{
  month: 'Mar',
  avocados: 1750,
  glass: 820,
  cartons: 1450
},
{
  month: 'Apr',
  avocados: 1800,
  glass: 850,
  cartons: 1500
},
{
  month: 'May',
  avocados: 1850,
  glass: 850,
  cartons: 1500
}];

export function ProcurementOverview() {
  const navigate = useNavigate();
  const handleApprove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toast.success(`PO ${id} approved successfully`);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-3 -mt-20 relative z-10 mr-8">
        <Button
          variant="outline"
          onClick={() => navigate('/procurement/forecast')}>
          
          Generate forecast
        </Button>
        <Button onClick={() => navigate('/procurement/purchase-orders/new')}>
          + New PO
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">Open POs</p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  23
                </h3>
              </div>
              <div className="p-2 bg-soil-50 rounded-lg">
                <Clock className="w-5 h-5 text-soil-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-status-warning font-medium">
                4 awaiting approval
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">Spend MTD</p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  UGX 184M
                </h3>
              </div>
              <div className="p-2 bg-status-danger/10 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-status-danger" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-status-danger font-medium">+12.4%</span>
              <span className="text-soil-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">
                  Avg Lead Time
                </p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  5.2 days
                </h3>
              </div>
              <div className="p-2 bg-avocado-50 rounded-lg">
                <ArrowDownRight className="w-5 h-5 text-avocado-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-avocado-600 font-medium">-0.4 days</span>
              <span className="text-soil-400 ml-2">vs target (6.0)</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-soil-500">
                  Supplier On-time
                </p>
                <h3 className="text-3xl font-bold text-bark mt-2 tabular-nums">
                  91%
                </h3>
              </div>
              <div className="p-2 bg-status-warning/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-status-warning" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-status-warning font-medium">-4%</span>
              <span className="text-soil-400 ml-2">vs target (95%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spend by category (YTD)</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value">
                      
                      {spendData.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, 'Share']}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #E2CFBE'
                      }} />
                    
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle" />
                    
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material price trend (UGX)</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={priceTrendData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: -20,
                      bottom: 0
                    }}>
                    
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E2CFBE" />
                    
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: '#A0552F'
                      }} />
                    
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: '#A0552F'
                      }} />
                    
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #E2CFBE'
                      }} />
                    
                    <Line
                      type="monotone"
                      dataKey="avocados"
                      name="Avocados (kg)"
                      stroke="#5C7F33"
                      strokeWidth={2}
                      dot={false} />
                    
                    <Line
                      type="monotone"
                      dataKey="glass"
                      name="Glass 500ml"
                      stroke="#A0552F"
                      strokeWidth={2}
                      dot={false} />
                    
                    <Line
                      type="monotone"
                      dataKey="cartons"
                      name="Cartons"
                      stroke="#D4923A"
                      strokeWidth={2}
                      dot={false} />
                    
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top suppliers (YTD)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                    <tr>
                      <th className="px-6 py-3 font-medium">Supplier</th>
                      <th className="px-6 py-3 font-medium">Region</th>
                      <th className="px-6 py-3 font-medium text-right">
                        Spend (UGX)
                      </th>
                      <th className="px-6 py-3 font-medium text-right">POs</th>
                      <th className="px-6 py-3 font-medium text-right">
                        On-time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soil-100">
                    {mockSuppliers.
                    slice(0, 5).
                    sort((a, b) => b.spendYTD - a.spendYTD).
                    map((sup) =>
                    <tr
                      key={sup.id}
                      className="hover:bg-soil-50 cursor-pointer transition-colors"
                      onClick={() =>
                      navigate(`/procurement/suppliers/${sup.id}`)
                      }>
                      
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-soil-100 flex items-center justify-center text-xs font-bold text-soil-700 shrink-0">
                                {sup.name.substring(0, 2).toUpperCase()}
                              </div>
                              <span className="font-medium text-bark">
                                {sup.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-soil-600">
                            {sup.region}
                          </td>
                          <td className="px-6 py-4 text-right tabular-nums text-bark font-medium">
                            {sup.spendYTD}M
                          </td>
                          <td className="px-6 py-4 text-right tabular-nums text-soil-600">
                            {sup.poCount}
                          </td>
                          <td className="px-6 py-4 text-right tabular-nums">
                            <span
                          className={
                          sup.onTimePct >= 90 ?
                          'text-avocado-600' :
                          'text-status-warning font-medium'
                          }>
                          
                              {sup.onTimePct}%
                            </span>
                          </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle>POs awaiting approval</CardTitle>
              <Badge variant="warning">4</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-soil-50">
                {mockPurchaseOrders.
                filter((po) => po.status === 'Awaiting Approval').
                map((po) => {
                  const sup = mockSuppliers.find(
                    (s) => s.id === po.supplierId
                  );
                  return (
                    <div
                      key={po.id}
                      className="p-4 hover:bg-soil-50/50 transition-colors cursor-pointer"
                      onClick={() =>
                      navigate(`/procurement/purchase-orders/${po.id}`)
                      }>
                      
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-bold text-bark">
                            {po.id}
                          </span>
                          <span className="text-sm font-semibold text-soil-700 tabular-nums">
                            {(po.totalAmount / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <p className="text-sm text-soil-600 truncate">
                          {sup?.name}
                        </p>
                        <p className="text-xs text-soil-400 mt-1">
                          Created 1 day ago
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 h-8 text-xs"
                          onClick={(e) => handleApprove(e, po.id)}>
                          
                            Approve
                          </Button>
                          <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-8 text-xs">
                          
                            Review
                          </Button>
                        </div>
                      </div>);

                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle>Pending GRN today</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-soil-50">
                {mockPurchaseOrders.
                filter(
                  (po) =>
                  po.status === 'Sent' ||
                  po.status === 'Partially Received'
                ).
                slice(0, 3).
                map((po) => {
                  const sup = mockSuppliers.find(
                    (s) => s.id === po.supplierId
                  );
                  return (
                    <div
                      key={po.id}
                      className="p-4 flex items-start gap-3 hover:bg-soil-50/50 transition-colors cursor-pointer"
                      onClick={() =>
                      navigate(`/procurement/purchase-orders/${po.id}`)
                      }>
                      
                        <div className="mt-0.5">
                          <Clock className="w-4 h-4 text-status-info" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-bark">
                            {sup?.name}
                          </p>
                          <p className="text-xs text-soil-500 mt-0.5">
                            {po.id} · {po.itemsCount} items
                          </p>
                        </div>
                      </div>);

                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}