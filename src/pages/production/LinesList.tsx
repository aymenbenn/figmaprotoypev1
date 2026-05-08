import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockLines } from '../../lib/data/production';
import { useNavigate } from 'react-router-dom';
import { Activity, Settings, AlertTriangle } from 'lucide-react';
export function LinesList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLines.map((line) =>
        <Card key={line.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-bark">{line.name}</h3>
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
                  <p className="text-sm text-soil-500 mt-1">{line.type}</p>
                </div>
                <div className="p-2 bg-soil-50 rounded-lg">
                  {line.status === 'Running' ?
                <Activity className="w-5 h-5 text-avocado-600" /> :
                line.status === 'Stopped' ?
                <AlertTriangle className="w-5 h-5 text-red-600" /> :

                <Settings className="w-5 h-5 text-amber-600" />
                }
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-soil-50 p-3 rounded-lg border border-soil-100">
                  <p className="text-xs text-soil-500 uppercase font-medium">
                    Current Run
                  </p>
                  <p className="text-sm font-medium text-bark mt-1">
                    {line.currentBatch || 'Idle'}
                  </p>
                </div>
                <div className="bg-soil-50 p-3 rounded-lg border border-soil-100">
                  <p className="text-xs text-soil-500 uppercase font-medium">
                    Output Today
                  </p>
                  <p className="text-sm font-medium text-bark mt-1 tabular-nums">
                    {line.outputToday.toLocaleString()} {line.unit}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-soil-600 font-medium">OEE</span>
                    <span className="text-bark font-bold tabular-nums">
                      {line.oee}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-soil-100 rounded-full overflow-hidden">
                    <div
                    className={`h-full rounded-full ${line.oee >= 80 ? 'bg-avocado-500' : line.oee >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{
                      width: `${line.oee}%`
                    }} />
                  
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-soil-500 mb-1">Availability</p>
                    <p className="text-sm font-medium text-bark tabular-nums">
                      {line.availability}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-soil-500 mb-1">Performance</p>
                    <p className="text-sm font-medium text-bark tabular-nums">
                      {line.performance}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-soil-500 mb-1">Quality</p>
                    <p className="text-sm font-medium text-bark tabular-nums">
                      {line.quality}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-soil-500 uppercase font-medium mb-2">
                  Last 12 Hours
                </p>
                <div className="h-4 w-full flex rounded-sm overflow-hidden">
                  {/* Mock timeline bars */}
                  <div
                  className="h-full bg-avocado-500"
                  style={{
                    width: '40%'
                  }}
                  title="Running" />
                
                  <div
                  className="h-full bg-amber-400"
                  style={{
                    width: '10%'
                  }}
                  title="Idle" />
                
                  <div
                  className="h-full bg-avocado-500"
                  style={{
                    width: '30%'
                  }}
                  title="Running" />
                
                  <div
                  className="h-full bg-red-500"
                  style={{
                    width: '5%'
                  }}
                  title="Stopped" />
                
                  <div
                  className="h-full bg-avocado-500"
                  style={{
                    width: '15%'
                  }}
                  title="Running" />
                
                </div>
              </div>

              <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate(`/production/lines/${line.id}`)}>
              
                View Details
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

}