import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  mockGRNs,
  mockSuppliers,
  mockPurchaseOrders } from
'../../lib/data/procurement';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
export function GRNDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const grn = mockGRNs.find((g) => g.id === id) || mockGRNs[0];
  const sup = mockSuppliers.find((s) => s.id === grn.supplierId);
  const po = mockPurchaseOrders.find((p) => p.id === grn.poId);
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/procurement/grn')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to GRN
      </button>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-bark">{grn.id}</h2>
            <Badge
              variant={
              grn.status === 'Accepted' ?
              'success' :
              grn.status === 'Rejected' ?
              'danger' :
              'warning'
              }>
              
              {grn.status}
            </Badge>
          </div>
          <p className="text-soil-600 mt-1">From {sup?.name}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => toast.success('NCR raised')}>
            Raise NCR
          </Button>
          <Button variant="outline" onClick={() => toast.success('Sent to QC')}>
            Send to QC
          </Button>
          <Button onClick={() => toast.success('All items accepted')}>
            Accept all
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-soil-500 uppercase">PO ref</p>
            <button
              onClick={() =>
              navigate(`/procurement/purchase-orders/${grn.poId}`)
              }
              className="text-sm font-semibold text-avocado-600 hover:underline">
              
              {grn.poId}
            </button>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase">Received</p>
            <p className="text-sm font-semibold text-bark">
              {new Date(grn.receivedDate).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase">Receiver</p>
            <p className="text-sm font-semibold text-bark">{grn.receiver}</p>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase">Gate pass</p>
            <p className="text-sm font-semibold text-bark">
              GP-{grn.id.slice(-3)}
            </p>
          </div>
        </CardContent>
      </Card>

      {po &&
      <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Material</th>
                  <th className="px-6 py-4 font-medium">Ordered</th>
                  <th className="px-6 py-4 font-medium">Received</th>
                  <th className="px-6 py-4 font-medium">Accepted</th>
                  <th className="px-6 py-4 font-medium">Rejected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {po.items.map((it) =>
              <tr key={it.id}>
                    <td className="px-6 py-4 font-medium text-bark">
                      {it.material}
                    </td>
                    <td className="px-6 py-4 text-soil-600 tabular-nums">
                      {it.qtyOrdered.toLocaleString()} {it.unit}
                    </td>
                    <td className="px-6 py-4 text-soil-600 tabular-nums">
                      {it.qtyReceived.toLocaleString()} {it.unit}
                    </td>
                    <td className="px-6 py-4 text-avocado-600 tabular-nums">
                      {it.qtyReceived.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-soil-600 tabular-nums">0</td>
                  </tr>
              )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      }

      <Card>
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold text-bark mb-3">
            Inspection notes
          </h3>
          <p className="text-sm text-soil-600 bg-soil-50 p-4 rounded-lg border border-soil-100">
            All items inspected on arrival. Packaging intact. Sample sent to QC
            lab.
          </p>
        </CardContent>
      </Card>
    </div>);

}