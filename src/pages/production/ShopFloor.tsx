import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLines, mockBatches } from '../../lib/data/production';
import { ArrowLeft, AlertTriangle, Activity } from 'lucide-react';
export function ShopFloor() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [tickedQty, setTickedQty] = useState<Record<string, number>>(
    Object.fromEntries(mockLines.map((l) => [l.id, l.outputToday]))
  );
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => {
      setTickedQty((prev) => {
        const next = {
          ...prev
        };
        mockLines.forEach((l) => {
          if (l.status === 'Running')
          next[l.id] = (next[l.id] ?? 0) + Math.floor(Math.random() * 4 + 1);
        });
        return next;
      });
    }, 2500);
    return () => clearInterval(t);
  }, []);
  const totalOutput = Object.values(tickedQty).reduce((a, b) => a + b, 0);
  const alerts = mockLines.filter((l) => l.status === 'Stopped').length;
  return (
    <div className="min-h-screen w-full bg-[#1A1109] text-bone p-6 lg:p-8 flex flex-col">
      {/* Top strip */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/production')}
            className="flex items-center gap-1.5 text-sm text-soil-300 hover:text-bone transition-colors">
            
            <ArrowLeft className="w-4 h-4" /> Exit shop floor view
          </button>
          <div className="h-8 w-px bg-[#3B2A1F]" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-soil-400">
              Shift A
            </p>
            <p className="text-xl font-bold text-bone tabular-nums">
              06:00 → 14:00
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-soil-400">
            Kakira Factory · Live
          </p>
          <p className="text-3xl font-bold text-bone tabular-nums">
            {now.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-soil-400">
            Total output today
          </p>
          <p className="text-3xl font-bold text-avocado-300 tabular-nums">
            {totalOutput.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-soil-400">
            Active alerts
          </p>
          <p
            className={`text-3xl font-bold tabular-nums ${alerts > 0 ? 'text-status-danger animate-pulse' : 'text-bone'}`}>
            
            {alerts}
          </p>
        </div>
      </div>

      {/* Lines grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLines.map((line) => {
          const batch = mockBatches.find((b) => b.id === line.currentBatch);
          const qty = tickedQty[line.id] ?? 0;
          const target = 5000;
          const pct = Math.min(100, qty / target * 100);
          const statusColor =
          line.status === 'Running' ?
          'bg-avocado-500' :
          line.status === 'Stopped' ?
          'bg-status-danger' :
          'bg-amber-500';
          return (
            <div
              key={line.id}
              className="relative bg-[#241710] border border-[#3B2A1F] rounded-2xl p-6 lg:p-8 flex flex-col overflow-hidden">
              
              {line.status === 'Running' &&
              <div className="absolute inset-0 bg-gradient-to-br from-avocado-500/5 to-transparent pointer-events-none" />
              }
              {line.status === 'Stopped' &&
              <div className="absolute inset-0 bg-gradient-to-br from-status-danger/10 to-transparent pointer-events-none animate-pulse" />
              }

              <div className="relative flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-bone tracking-tight">
                    {line.name}
                  </h2>
                  <p className="text-sm text-soil-300 mt-1">
                    {batch?.product ?? 'No active batch'}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusColor}/20 border border-current ${line.status === 'Running' ? 'text-avocado-300' : line.status === 'Stopped' ? 'text-status-danger' : 'text-amber-400'}`}>
                  
                  <span
                    className={`w-2 h-2 rounded-full ${statusColor} ${line.status === 'Running' ? 'animate-pulse' : ''}`} />
                  
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {line.status}
                  </span>
                </div>
              </div>

              <div className="relative flex items-end gap-3 mb-6">
                <p className="text-6xl lg:text-7xl font-bold text-bone tabular-nums leading-none">
                  {qty.toLocaleString()}
                </p>
                <p className="text-lg text-soil-300 mb-1.5">
                  / {target.toLocaleString()} {line.unit}
                </p>
              </div>

              <div className="relative h-3 w-full bg-[#3B2A1F] rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full ${statusColor} transition-all duration-700`}
                  style={{
                    width: `${pct}%`
                  }} />
                
              </div>

              <div className="relative flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-soil-400">
                    Supervisor
                  </p>
                  <p className="text-sm font-medium text-bone mt-1">
                    {batch?.operator ?? '—'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-soil-400">
                    OEE
                  </p>
                  <p className="text-2xl font-bold text-bone tabular-nums mt-0.5">
                    {line.oee}%
                  </p>
                </div>
                {line.status === 'Stopped' &&
                <div className="flex items-center gap-2 text-status-danger">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-bold">ATTENTION</span>
                  </div>
                }
                {line.status === 'Running' &&
                <Activity className="w-5 h-5 text-avocado-400 animate-pulse" />
                }
              </div>
            </div>);

        })}
      </div>
    </div>);

}