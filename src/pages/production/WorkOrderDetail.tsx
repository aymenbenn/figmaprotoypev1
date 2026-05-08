import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockWorkOrders, mockBatches } from '../../lib/data/production';
import { Play, Pause, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
export function WorkOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const wo = mockWorkOrders.find((w) => w.id === id) || mockWorkOrders[0];
  const [activeTab, setActiveTab] = useState('Overview');
  const handleAction = (action: string) => {
    toast.success(`Work order ${action} successfully`);
  };
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/production/work-orders')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 transition-colors -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Work Orders
      </button>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-bark">{wo.id}</h2>
            <Badge
              variant={
              wo.status === 'In Progress' ?
              'success' :
              wo.status === 'Completed' ?
              'info' :
              wo.status === 'On Hold' ?
              'warning' :
              'neutral'
              }>
              
              {wo.status}
            </Badge>
            <Badge
              variant={
              wo.priority === 'Urgent' ?
              'danger' :
              wo.priority === 'High' ?
              'warning' :
              'neutral'
              }>
              
              {wo.priority} Priority
            </Badge>
          </div>
          <p className="text-lg text-soil-600 mt-1">{wo.product}</p>
        </div>
        <div className="flex space-x-3">
          {wo.status === 'Planned' &&
          <Button onClick={() => handleAction('released')}>
              Release to Floor
            </Button>
          }
          {wo.status === 'In Progress' &&
          <>
              <Button
              variant="outline"
              onClick={() => handleAction('paused')}
              className="text-amber-600 border-amber-200 hover:bg-amber-50">
              
                <Pause className="w-4 h-4 mr-2" /> Pause
              </Button>
              <Button
              onClick={() => handleAction('completed')}
              className="bg-blue-600 hover:bg-blue-700 text-white">
              
                <CheckCircle2 className="w-4 h-4 mr-2" /> Complete
              </Button>
            </>
          }
          {wo.status === 'On Hold' &&
          <Button onClick={() => handleAction('resumed')}>
              <Play className="w-4 h-4 mr-2" /> Resume
            </Button>
          }
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 bg-soil-50 rounded-lg">
              <FileText className="w-5 h-5 text-soil-600" />
            </div>
            <div>
              <p className="text-xs text-soil-500 uppercase font-medium">
                Customer Ref
              </p>
              <p className="text-sm font-medium text-bark">
                {wo.customerRef || 'Internal Stock'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 bg-soil-50 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-soil-200 flex items-center justify-center text-xs font-bold text-soil-600">
                {wo.supervisor.charAt(0)}
              </div>
            </div>
            <div>
              <p className="text-xs text-soil-500 uppercase font-medium">
                Supervisor
              </p>
              <p className="text-sm font-medium text-bark">{wo.supervisor}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="p-2 bg-soil-50 rounded-lg">
              <div className="w-5 h-5 border-2 border-soil-400 rounded-sm flex items-center justify-center" />
            </div>
            <div>
              <p className="text-xs text-soil-500 uppercase font-medium">
                Scheduled Window
              </p>
              <p className="text-sm font-medium text-bark">
                {new Date(wo.scheduledStart).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border-b border-soil-100">
        <div className="flex space-x-6">
          {['Overview', 'Materials', 'Batches', 'Activity'].map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-soil-600' : 'text-soil-400 hover:text-soil-600'}`}>
            
              {tab}
              {activeTab === tab &&
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-soil-500 rounded-t-full" />
            }
            </button>
          )}
        </div>
      </div>

      {activeTab === 'Overview' &&
      <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-soil-600 font-medium">
                    Production Progress
                  </span>
                  <span className="text-bark font-bold tabular-nums">
                    {wo.progress}%
                  </span>
                </div>
                <div className="h-2 w-full bg-soil-100 rounded-full overflow-hidden">
                  <div
                  className="h-full bg-avocado-500 rounded-full"
                  style={{
                    width: `${wo.progress}%`
                  }} />
                
                </div>
                <div className="flex justify-between text-xs text-soil-500 mt-2 tabular-nums">
                  <span>
                    Produced:{' '}
                    {Math.round(
                    wo.targetQty * (wo.progress / 100)
                  ).toLocaleString()}{' '}
                    {wo.unit}
                  </span>
                  <span>
                    Target: {wo.targetQty.toLocaleString()} {wo.unit}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-soil-100">
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Assigned Line
                  </p>
                  <p className="text-sm text-bark font-medium">{wo.line}</p>
                </div>
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Expected Yield
                  </p>
                  <p className="text-sm text-bark font-medium">95.0%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold text-bark mb-4">Notes</h3>
              <p className="text-sm text-soil-600 bg-soil-50 p-4 rounded-lg border border-soil-100">
                Ensure strict temperature control during cold-press phase.
                Customer requested specific label alignment (see attached spec).
              </p>
            </CardContent>
          </Card>
        </div>
      }

      {activeTab === 'Batches' &&
      <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Batch ID</th>
                  <th className="px-6 py-4 font-medium">Started</th>
                  <th className="px-6 py-4 font-medium">Qty Out</th>
                  <th className="px-6 py-4 font-medium">Yield</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {mockBatches.
              filter((b) => b.workOrderId === wo.id).
              map((batch) =>
              <tr
                key={batch.id}
                className="hover:bg-soil-50 cursor-pointer transition-colors"
                onClick={() =>
                navigate(`/production/batches/${batch.id}`)
                }>
                
                      <td className="px-6 py-4 font-medium text-soil-700">
                        {batch.id}
                      </td>
                      <td className="px-6 py-4 text-soil-600 tabular-nums">
                        {new Date(batch.startedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-soil-600 tabular-nums">
                        {batch.qtyOut.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-soil-600 tabular-nums">
                        {batch.yieldPct}%
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                    variant={
                    batch.status === 'Running' ? 'success' : 'neutral'
                    }>
                    
                          {batch.status}
                        </Badge>
                      </td>
                    </tr>
              )}
                {mockBatches.filter((b) => b.workOrderId === wo.id).length ===
              0 &&
              <tr>
                    <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-soil-500">
                  
                      No batches have been started for this work order yet.
                    </td>
                  </tr>
              }
              </tbody>
            </table>
          </CardContent>
        </Card>
      }

      {activeTab === 'Materials' &&
      <Card>
          <CardContent className="p-6 text-center text-soil-500">
            Materials consumption view coming soon.
          </CardContent>
        </Card>
      }

      {activeTab === 'Activity' &&
      <Card>
          <CardContent className="p-6 text-center text-soil-500">
            Activity timeline view coming soon.
          </CardContent>
        </Card>
      }
    </div>);

}