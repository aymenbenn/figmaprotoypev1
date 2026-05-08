import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockPurchaseOrders, mockSuppliers } from '../../lib/data/procurement';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function PurchaseOrdersList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center -mt-20 relative z-10 mr-8">
        <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          {[
          'All',
          'Draft',
          'Awaiting Approval',
          'Approved',
          'Sent',
          'Partially Received',
          'Fully Received',
          'Closed',
          'Cancelled'].
          map((tab, i) =>
          <button
            key={tab}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${i === 0 ? 'bg-soil-100 text-soil-800' : 'text-soil-600 hover:bg-soil-50'}`}>
            
              {tab}
            </button>
          )}
        </div>
        <Button
          onClick={() => navigate('/procurement/purchase-orders/new')}
          className="shrink-0 ml-4">
          
          + New PO
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-soil-100 flex justify-between items-center bg-bone">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soil-400" />
            <input
              type="text"
              placeholder="Search POs..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400 bg-white" />
            
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2">
            
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-6 py-4 font-medium">PO #</th>
                  <th className="px-6 py-4 font-medium">Supplier</th>
                  <th className="px-6 py-4 font-medium text-right">Items</th>
                  <th className="px-6 py-4 font-medium text-right">
                    Total (UGX)
                  </th>
                  <th className="px-6 py-4 font-medium">Created</th>
                  <th className="px-6 py-4 font-medium">Expected</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {mockPurchaseOrders.map((po) => {
                  const sup = mockSuppliers.find((s) => s.id === po.supplierId);
                  return (
                    <tr
                      key={po.id}
                      className="hover:bg-soil-50 cursor-pointer transition-colors"
                      onClick={() =>
                      navigate(`/procurement/purchase-orders/${po.id}`)
                      }>
                      
                      <td className="px-6 py-4 font-medium text-soil-700">
                        {po.id}
                      </td>
                      <td className="px-6 py-4 text-bark truncate max-w-[200px]">
                        {sup?.name}
                      </td>
                      <td className="px-6 py-4 tabular-nums text-soil-600 text-right">
                        {po.itemsCount}
                      </td>
                      <td className="px-6 py-4 tabular-nums text-bark font-medium text-right">
                        {(po.totalAmount / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4 tabular-nums text-soil-600">
                        {new Date(po.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 tabular-nums text-soil-600">
                        {new Date(po.expectedDelivery).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                          po.status === 'Fully Received' ||
                          po.status === 'Closed' ?
                          'success' :
                          po.status === 'Sent' || po.status === 'Approved' ?
                          'info' :
                          po.status === 'Awaiting Approval' ||
                          po.status === 'Partially Received' ?
                          'warning' :
                          po.status === 'Cancelled' ?
                          'danger' :
                          'neutral'
                          }>
                          
                          {po.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 text-soil-400 hover:text-soil-600 rounded">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-soil-100 flex justify-between items-center text-sm text-soil-500 bg-bone">
            <span>
              Showing 1 to {mockPurchaseOrders.length} of{' '}
              {mockPurchaseOrders.length} entries
            </span>
            <div className="flex space-x-1">
              <button
                className="px-3 py-1 border border-soil-200 rounded hover:bg-soil-50 disabled:opacity-50"
                disabled>
                
                Prev
              </button>
              <button className="px-3 py-1 border border-soil-200 rounded bg-soil-100 text-soil-800">
                1
              </button>
              <button
                className="px-3 py-1 border border-soil-200 rounded hover:bg-soil-50 disabled:opacity-50"
                disabled>
                
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

}