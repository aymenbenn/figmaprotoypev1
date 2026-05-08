import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockWorkOrders } from '../../lib/data/production';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function WorkOrdersList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center -mt-20 relative z-10 mr-8">
        <div className="flex space-x-2">
          {[
          'All',
          'Planned',
          'Released',
          'In Progress',
          'On Hold',
          'Completed'].
          map((tab, i) =>
          <button
            key={tab}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${i === 0 ? 'bg-soil-100 text-soil-800' : 'text-soil-600 hover:bg-soil-50'}`}>
            
              {tab}
            </button>
          )}
        </div>
        <Button onClick={() => navigate('/production/work-orders/new')}>
          + New work order
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-soil-100 flex justify-between items-center bg-bone">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soil-400" />
            <input
              type="text"
              placeholder="Search work orders..."
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
                  <th className="px-6 py-4 font-medium">WO #</th>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Target Qty</th>
                  <th className="px-6 py-4 font-medium">Line Assigned</th>
                  <th className="px-6 py-4 font-medium">Scheduled Start</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {mockWorkOrders.map((wo) =>
                <tr
                  key={wo.id}
                  className="hover:bg-soil-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/production/work-orders/${wo.id}`)}>
                  
                    <td className="px-6 py-4 font-medium text-soil-700">
                      {wo.id}
                    </td>
                    <td className="px-6 py-4 text-bark">{wo.product}</td>
                    <td className="px-6 py-4 tabular-nums text-soil-600">
                      {wo.targetQty.toLocaleString()} {wo.unit}
                    </td>
                    <td className="px-6 py-4 text-soil-600">{wo.line}</td>
                    <td className="px-6 py-4 tabular-nums text-soil-600">
                      {new Date(wo.scheduledStart).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                      variant={
                      wo.priority === 'Urgent' ?
                      'danger' :
                      wo.priority === 'High' ?
                      'warning' :
                      'neutral'
                      }>
                      
                        {wo.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div
                        className={`w-2 h-2 rounded-full ${wo.status === 'In Progress' ? 'bg-avocado-500' : wo.status === 'Completed' ? 'bg-blue-500' : wo.status === 'On Hold' ? 'bg-amber-500' : 'bg-soil-300'}`} />
                      
                        <span className="text-soil-700">{wo.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-soil-400 hover:text-soil-600 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-soil-100 flex justify-between items-center text-sm text-soil-500 bg-bone">
            <span>
              Showing 1 to {mockWorkOrders.length} of {mockWorkOrders.length}{' '}
              entries
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