import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockSuppliers, mockPurchaseOrders } from '../../lib/data/procurement';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine } from
'recharts';
const trend = [
{
  month: 'Dec',
  onTime: 90
},
{
  month: 'Jan',
  onTime: 92
},
{
  month: 'Feb',
  onTime: 88
},
{
  month: 'Mar',
  onTime: 94
},
{
  month: 'Apr',
  onTime: 96
},
{
  month: 'May',
  onTime: 95
}];

export function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const s = mockSuppliers.find((x) => x.id === id) || mockSuppliers[0];
  const supplierPOs = mockPurchaseOrders.
  filter((p) => p.supplierId === s.id).
  slice(0, 5);
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/procurement/suppliers')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Suppliers
      </button>

      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full bg-soil-100 flex items-center justify-center text-soil-700 font-bold text-xl">
          {s.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-bark">{s.name}</h2>
          <div className="flex items-center space-x-3 mt-1">
            <Badge variant="neutral">{s.category}</Badge>
            <span className="flex items-center text-sm text-soil-500">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              {s.region}
            </span>
            <span className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) =>
              <Star
                key={i}
                className={`w-4 h-4 ${i <= Math.round(s.rating) ? 'fill-amber-400 text-amber-400' : 'text-soil-200'}`} />

              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {s.certifications.map((c) =>
            <span
              key={c}
              className="text-xs px-2 py-0.5 bg-avocado-50 text-avocado-700 rounded">
              
                {c}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
        {
          label: 'Spend YTD',
          value: `UGX ${(s.spendYTD / 1000000).toFixed(0)}M`
        },
        {
          label: '# POs',
          value: s.poCount
        },
        {
          label: 'On-time %',
          value: `${s.onTimePct}%`
        },
        {
          label: 'Quality',
          value: `${s.qualityScore}`
        },
        {
          label: 'Avg lead time',
          value: `${s.leadTimeDays}d`
        }].
        map((m) =>
        <Card key={m.label}>
            <CardContent className="p-4">
              <p className="text-xs text-soil-500 uppercase">{m.label}</p>
              <p className="text-lg font-bold text-bark tabular-nums">
                {m.value}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-bark mb-4">
                Performance trend (6 months)
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
                    <XAxis dataKey="month" fontSize={12} stroke="#a8a29e" />
                    <YAxis domain={[80, 100]} fontSize={12} stroke="#a8a29e" />
                    <Tooltip />
                    <ReferenceLine
                      y={95}
                      stroke="#dc2626"
                      strokeDasharray="3 3"
                      label="Target" />
                    
                    <Line
                      type="monotone"
                      dataKey="onTime"
                      stroke="#4d7c0f"
                      strokeWidth={2} />
                    
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="px-6 py-4 border-b border-soil-100">
                <h3 className="text-sm font-semibold text-bark">Recent POs</h3>
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-soil-100">
                  {supplierPOs.map((p) =>
                  <tr
                    key={p.id}
                    className="hover:bg-soil-50 cursor-pointer"
                    onClick={() =>
                    navigate(`/procurement/purchase-orders/${p.id}`)
                    }>
                    
                      <td className="px-6 py-3 font-medium text-soil-700">
                        {p.id}
                      </td>
                      <td className="px-6 py-3 text-soil-600 tabular-nums">
                        UGX {p.totalUGX.toLocaleString()}
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant="neutral">{p.status}</Badge>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-bark mb-3">Contact</h3>
              <p className="text-sm text-bark">{s.contactPerson}</p>
              <p className="text-xs text-soil-500">{s.email}</p>
              <p className="text-xs text-soil-500">{s.phone}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-bark mb-3">
                Payment terms
              </h3>
              <p className="text-sm text-bark">{s.paymentTerms}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}