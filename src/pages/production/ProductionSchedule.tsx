import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockLines } from '../../lib/data/production';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlertCircle } from 'lucide-react';
interface ScheduledRun {
  woId: string;
  product: string;
  line: string;
  startHour: number;
  durationHours: number;
  day: number; // 0 = today, 1 = tomorrow, 2 = day after
  color: string;
}
const scheduledRuns: ScheduledRun[] = [
{
  woId: 'WO-1042',
  product: 'Cold-Press 500ml',
  line: 'Bottling Line 1',
  startHour: 8,
  durationHours: 7,
  day: 0,
  color: 'bg-avocado-500'
},
{
  woId: 'WO-1046',
  product: 'Cold-Press Bulk',
  line: 'Cold-Press Line A',
  startHour: 6,
  durationHours: 9,
  day: 0,
  color: 'bg-soil-500'
},
{
  woId: 'WO-1047',
  product: 'Cold-Press Bulk',
  line: 'Cold-Press Line B',
  startHour: 6,
  durationHours: 8,
  day: 0,
  color: 'bg-soil-500'
},
{
  woId: 'WO-1044',
  product: 'Avocado Puree 250g',
  line: 'Packaging Line 2',
  startHour: 10,
  durationHours: 6,
  day: 0,
  color: 'bg-avocado-600'
},
{
  woId: 'WO-1043',
  product: 'Refined 1L',
  line: 'Bottling Line 1',
  startHour: 8,
  durationHours: 5,
  day: 1,
  color: 'bg-soil-400'
},
{
  woId: 'WO-1049',
  product: 'Cold-Press 500ml',
  line: 'Bottling Line 1',
  startHour: 14,
  durationHours: 4,
  day: 1,
  color: 'bg-avocado-500'
},
{
  woId: 'WO-1050',
  product: 'Cold-Press Bulk',
  line: 'Cold-Press Line A',
  startHour: 6,
  durationHours: 8,
  day: 1,
  color: 'bg-soil-500'
},
{
  woId: 'WO-1051',
  product: 'Dried Slices 50g',
  line: 'Packaging Line 2',
  startHour: 8,
  durationHours: 5,
  day: 2,
  color: 'bg-amber-500'
},
{
  woId: 'WO-1052',
  product: 'Cold-Press Bulk',
  line: 'Cold-Press Line B',
  startHour: 6,
  durationHours: 9,
  day: 2,
  color: 'bg-soil-500'
}];

const unscheduled = [
{
  id: 'WO-1053',
  product: 'Refined Avocado Oil 1L',
  qty: '3,000 units',
  priority: 'High'
},
{
  id: 'WO-1054',
  product: 'Avocado Puree 250g',
  qty: '8,000 units',
  priority: 'Normal'
},
{
  id: 'WO-1055',
  product: 'Cold-Press Bulk',
  qty: '6,000 L',
  priority: 'Urgent'
},
{
  id: 'WO-1056',
  product: 'Dried Slices 50g',
  qty: '2,000 units',
  priority: 'Normal'
},
{
  id: 'WO-1057',
  product: 'Cold-Press 500ml',
  qty: '4,500 units',
  priority: 'Normal'
}];

const days = ['Today · Fri 8 May', 'Tomorrow · Sat 9 May', 'Sun 10 May'];
const hours = Array.from(
  {
    length: 18
  },
  (_, i) => i + 6
); // 06:00 to 23:00
export function ProductionSchedule() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center -mt-20 relative z-10 mr-8">
        <div className="flex items-center gap-2 text-sm text-soil-500">
          <Calendar className="w-4 h-4" />
          <span>3-day production schedule across all lines</span>
        </div>
        <Button onClick={() => navigate('/production/work-orders/new')}>
          + Schedule run
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Gantt area */}
        <Card className="xl:col-span-3">
          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[1100px]">
              {days.map((dayLabel, dayIdx) =>
              <div
                key={dayLabel}
                className="border-b border-soil-100 last:border-b-0">
                
                  <div className="px-6 py-3 bg-soil-50 border-b border-soil-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-bark">
                      {dayLabel}
                    </h3>
                    {dayIdx === 0 && <Badge variant="success">Live</Badge>}
                  </div>
                  {/* Hour ruler */}
                  <div className="flex items-center pl-44 pr-4 py-1 border-b border-soil-50 text-[10px] text-soil-400 tabular-nums">
                    {hours.map((h) =>
                  <div key={h} className="flex-1 text-left">
                        {h.toString().padStart(2, '0')}
                      </div>
                  )}
                  </div>
                  {/* Line rows */}
                  {mockLines.map((line) =>
                <div
                  key={line.id}
                  className="flex items-center border-t border-soil-50 hover:bg-soil-50/30">
                  
                      <div className="w-44 shrink-0 px-6 py-3 text-xs">
                        <p className="font-medium text-bark">{line.name}</p>
                        <p className="text-soil-400 mt-0.5">{line.type}</p>
                      </div>
                      <div className="flex-1 relative h-12 mr-4">
                        {/* Today indicator */}
                        {dayIdx === 0 &&
                    <div
                      className="absolute top-0 bottom-0 w-px bg-status-danger z-10"
                      style={{
                        left: `${(10 - 6) / 18 * 100}%`
                      }}
                      title="Now" />

                    }
                        {/* Hour gridlines */}
                        {hours.map((_, i) =>
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-soil-50"
                      style={{
                        left: `${i / 18 * 100}%`
                      }} />

                    )}
                        {/* Scheduled bars */}
                        {scheduledRuns.
                    filter(
                      (r) => r.line === line.name && r.day === dayIdx
                    ).
                    map((run) => {
                      const left = (run.startHour - 6) / 18 * 100;
                      const width = run.durationHours / 18 * 100;
                      return (
                        <div
                          key={run.woId}
                          onClick={() =>
                          navigate(
                            `/production/work-orders/${run.woId}`
                          )
                          }
                          className={`${run.color} absolute top-1.5 bottom-1.5 rounded-md text-bone text-[11px] font-medium px-2 flex items-center cursor-pointer hover:brightness-110 transition-all shadow-sm`}
                          style={{
                            left: `${left}%`,
                            width: `${width}%`
                          }}
                          title={`${run.woId} · ${run.product}`}>
                          
                                <span className="truncate">
                                  {run.woId} · {run.product}
                                </span>
                              </div>);

                    })}
                      </div>
                    </div>
                )}
                </div>
              )}
              {/* Legend */}
              <div className="px-6 py-3 flex items-center gap-4 text-xs text-soil-500 bg-bone border-t border-soil-100">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-avocado-500" /> Bottling
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-soil-500" /> Cold-press
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500" /> Drying
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-soil-400" /> Refining
                </span>
                <span className="flex items-center gap-1.5 ml-auto">
                  <span className="w-px h-3 bg-status-danger" /> Now
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unscheduled work orders */}
        <Card>
          <div className="px-5 py-4 border-b border-soil-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-bark">
              Unscheduled work orders
            </h3>
            <span className="ml-auto text-xs text-soil-500 tabular-nums">
              {unscheduled.length}
            </span>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-soil-50">
              {unscheduled.map((wo) =>
              <div
                key={wo.id}
                className="p-4 hover:bg-soil-50/50 transition-colors cursor-pointer group">
                
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-soil-700">
                      {wo.id}
                    </span>
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
                  </div>
                  <p className="text-sm text-bark truncate">{wo.product}</p>
                  <p className="text-xs text-soil-500 mt-1 tabular-nums">
                    {wo.qty}
                  </p>
                  <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  
                    Slot into schedule
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

}