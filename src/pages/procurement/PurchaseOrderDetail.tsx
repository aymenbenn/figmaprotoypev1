import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockPurchaseOrders, mockSuppliers } from '../../lib/data/procurement';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
export function PurchaseOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const po =
  mockPurchaseOrders.find((p) => p.id === id) || mockPurchaseOrders[0];
  const supplier = mockSuppliers.find((s) => s.id === po.supplierId);
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/procurement/purchase-orders')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Purchase Orders
      </button>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-bark">{po.id}</h2>
            <Badge
              variant={
              po.status === 'Approved' || po.status === 'Fully Received' ?
              'success' :
              po.status === 'Awaiting Approval' ?
              'warning' :
              'neutral'
              }>
              
              {po.status}
            </Badge>
          </div>
          <p className="text-lg text-soil-600 mt-1">{supplier?.name}</p>
        </div>
        <div className="flex space-x-3">
          {po.status === 'Awaiting Approval' &&
          <>
              <Button
              variant="outline"
              onClick={() => toast.success('PO rejected')}>
              
                Reject
              </Button>
              <Button onClick={() => toast.success('PO approved')}>
                Approve
              </Button>
            </>
          }
          {po.status === 'Approved' &&
          <Button onClick={() => toast.success('PO sent to supplier')}>
              Send to supplier
            </Button>
          }
          {po.status === 'Sent' &&
          <Button onClick={() => toast.success('Marked as received')}>
              Mark received
            </Button>
          }
        </div>
      </div>

      <Card>
        <CardContent className="p-6 grid grid-cols-5 gap-4">
          <div>
            <p className="text-xs text-soil-500 uppercase font-medium">Total</p>
            <p className="text-sm font-semibold text-bark tabular-nums">
              UGX {po.totalUGX.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase font-medium">Items</p>
            <p className="text-sm font-semibold text-bark tabular-nums">
              {po.itemsCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase font-medium">
              Created
            </p>
            <p className="text-sm font-semibold text-bark">
              {new Date(po.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase font-medium">
              Expected delivery
            </p>
            <p className="text-sm font-semibold text-bark">
              {new Date(po.expectedDelivery).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-soil-500 uppercase font-medium">
              Days outstanding
            </p>
            <p className="text-sm font-semibold text-bark tabular-nums">
              {Math.max(
                0,
                Math.floor(
                  (Date.now() - new Date(po.createdAt).getTime()) / 86400000
                )
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                  <tr>
                    <th className="px-6 py-4 font-medium">Material</th>
                    <th className="px-6 py-4 font-medium">Ordered</th>
                    <th className="px-6 py-4 font-medium">Received</th>
                    <th className="px-6 py-4 font-medium">Unit price</th>
                    <th className="px-6 py-4 font-medium text-right">
                      Line total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soil-100">
                  {po.items.map((item) =>
                  <tr key={item.id}>
                      <td className="px-6 py-4 text-bark font-medium">
                        {item.material}
                      </td>
                      <td className="px-6 py-4 text-soil-600 tabular-nums">
                        {item.qtyOrdered.toLocaleString()} {item.unit}
                      </td>
                      <td className="px-6 py-4 text-soil-600 tabular-nums">
                        {item.qtyReceived.toLocaleString()} {item.unit}
                      </td>
                      <td className="px-6 py-4 text-soil-600 tabular-nums">
                        UGX {item.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-bark font-semibold text-right tabular-nums">
                        UGX {item.lineTotal.toLocaleString()}
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
              <h3 className="text-sm font-semibold text-bark mb-3">Supplier</h3>
              <p className="text-sm font-medium text-bark">{supplier?.name}</p>
              <p className="text-xs text-soil-500 mt-1">{supplier?.region}</p>
              <p className="text-xs text-soil-500">{supplier?.contactPerson}</p>
              <button
                onClick={() =>
                navigate(`/procurement/suppliers/${supplier?.id}`)
                }
                className="text-xs text-avocado-600 mt-2 hover:underline">
                
                View profile →
              </button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-bark mb-3">
                Cost breakdown
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-soil-500">Subtotal</span>
                  <span className="tabular-nums">
                    UGX {po.totalUGX.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soil-500">VAT 18%</span>
                  <span className="tabular-nums">
                    UGX {Math.round(po.totalUGX * 0.18).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t border-soil-100 pt-2 font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">
                    UGX {Math.round(po.totalUGX * 1.18).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}