import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockForecast } from '../../lib/data/procurement';
import { toast } from 'sonner';
export function Forecast() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="px-6 py-4 border-b border-soil-100">
              <h3 className="text-lg font-semibold text-bark">
                Material demand forecast — next 30 days
              </h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Material</th>
                  <th className="px-6 py-3 font-medium">Stock</th>
                  <th className="px-6 py-3 font-medium">Forecast 30d</th>
                  <th className="px-6 py-3 font-medium">Shortfall</th>
                  <th className="px-6 py-3 font-medium">Recommend</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {mockForecast.map((m) =>
                <tr key={m.id}>
                    <td className="px-6 py-3 font-medium text-bark">
                      {m.material}
                    </td>
                    <td className="px-6 py-3 text-soil-600 tabular-nums">
                      {m.currentStock.toLocaleString()} {m.unit}
                    </td>
                    <td className="px-6 py-3 text-soil-600 tabular-nums">
                      {m.forecastConsumption30d.toLocaleString()} {m.unit}
                    </td>
                    <td className="px-6 py-3 text-red-600 tabular-nums">
                      {new Date(m.projectedShortfallDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-avocado-700 font-semibold tabular-nums">
                      {m.recommendedOrderQty.toLocaleString()} {m.unit}
                    </td>
                    <td className="px-6 py-3">
                      <Button
                      size="sm"
                      onClick={() => {
                        toast.success(`PO draft created for ${m.material}`);
                        navigate('/procurement/purchase-orders/new');
                      }}>
                      
                        Create PO
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-bark mb-4">
              Stock coverage
            </h3>
            <div className="space-y-3">
              {mockForecast.map((m) => {
                const days = Math.round(
                  m.currentStock / m.forecastConsumption30d * 30
                );
                const pct = Math.min(100, days / 30 * 100);
                const danger = days < 10;
                return (
                  <div key={m.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-bark">{m.material}</span>
                      <span
                        className={`tabular-nums ${danger ? 'text-red-600' : 'text-soil-500'}`}>
                        
                        {days} days
                      </span>
                    </div>
                    <div className="h-2 bg-soil-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${danger ? 'bg-red-500' : 'bg-avocado-500'}`}
                        style={{
                          width: `${pct}%`
                        }} />
                      
                    </div>
                  </div>);

              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold text-bark mb-3">
            Forecast assumptions
          </h3>
          <ul className="text-sm text-soil-600 space-y-2 list-disc pl-4">
            <li>Based on rolling 90-day consumption</li>
            <li>Adjusted for current open work orders</li>
            <li>Reorder threshold: 10 days of cover</li>
            <li>Seasonality factor applied to avocado inputs</li>
            <li>Lead time buffer of 3 days added</li>
          </ul>
        </CardContent>
      </Card>
    </div>);

}