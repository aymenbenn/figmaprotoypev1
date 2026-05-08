import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockBatches } from '../../lib/data/production';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function BatchesList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center -mt-20 relative z-10 mr-8">
        <div className="flex space-x-2">
          {[
          'All',
          'Running',
          'On Hold',
          'Awaiting QC',
          'Released',
          'Rejected',
          'Closed'].
          map((tab, i) =>
          <button
            key={tab}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${i === 0 ? 'bg-soil-100 text-soil-800' : 'text-soil-600 hover:bg-soil-50'}`}>
            
              {tab}
            </button>
          )}
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-soil-100 flex justify-between items-center bg-bone">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soil-400" />
            <input
              type="text"
              placeholder="Search batches..."
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
                  <th className="px-6 py-4 font-medium">Batch ID</th>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Work Order</th>
                  <th className="px-6 py-4 font-medium">Line</th>
                  <th className="px-6 py-4 font-medium">Started</th>
                  <th className="px-6 py-4 font-medium">Yield %</th>
                  <th className="px-6 py-4 font-medium">QC Status</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {mockBatches.map((batch) =>
                <tr
                  key={batch.id}
                  className="hover:bg-soil-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/production/batches/${batch.id}`)}>
                  
                    <td className="px-6 py-4 font-medium text-soil-700">
                      {batch.id}
                    </td>
                    <td className="px-6 py-4 text-bark truncate max-w-[200px]">
                      {batch.product}
                    </td>
                    <td
                    className="px-6 py-4 text-soil-600 hover:text-soil-800 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/production/work-orders/${batch.workOrderId}`);
                    }}>
                    
                      {batch.workOrderId}
                    </td>
                    <td className="px-6 py-4 text-soil-600">{batch.line}</td>
                    <td className="px-6 py-4 tabular-nums text-soil-600">
                      {new Date(batch.startedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 tabular-nums text-soil-600">
                      {batch.yieldPct}%
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                      variant={
                      batch.qcStatus === 'Passed' ?
                      'success' :
                      batch.qcStatus === 'Failed' ?
                      'danger' :
                      batch.qcStatus === 'Hold' ?
                      'warning' :
                      'neutral'
                      }>
                      
                        {batch.qcStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
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
                      }>
                      
                        {batch.status}
                      </Badge>
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
              Showing 1 to {mockBatches.length} of {mockBatches.length} entries
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