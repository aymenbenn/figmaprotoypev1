import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockPurchaseOrders, mockSuppliers } from '../../lib/data/procurement';
import { toast } from 'sonner';
export function ApprovalsQueue() {
  const navigate = useNavigate();
  const pending = mockPurchaseOrders.filter(
    (p) => p.status === 'Awaiting Approval'
  );
  return (
    <Card>
      <CardContent className="p-0">
        <div className="px-6 py-4 border-b border-soil-100 flex justify-between">
          <h3 className="text-lg font-semibold text-bark">Approvals queue</h3>
          <Badge variant="warning">{pending.length} pending</Badge>
        </div>
        <div className="divide-y divide-soil-100">
          {pending.map((po) => {
            const sup = mockSuppliers.find((s) => s.id === po.supplierId);
            return (
              <div
                key={po.id}
                className="px-6 py-4 flex justify-between items-center">
                
                <div>
                  <p className="font-medium text-bark">
                    {po.id} — {sup?.name}
                  </p>
                  <p className="text-sm text-soil-500 tabular-nums">
                    UGX {po.totalUGX.toLocaleString()} · {po.itemsCount} items
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                    navigate(`/procurement/purchase-orders/${po.id}`)
                    }>
                    
                    Review
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toast.success(`${po.id} approved`)}>
                    
                    Approve
                  </Button>
                </div>
              </div>);

          })}
        </div>
      </CardContent>
    </Card>);

}