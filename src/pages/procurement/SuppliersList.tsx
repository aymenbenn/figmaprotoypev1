import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockSuppliers } from '../../lib/data/procurement';
import { MapPin, Star } from 'lucide-react';
export function SuppliersList() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockSuppliers.map((s) =>
      <Card key={s.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-soil-100 flex items-center justify-center text-soil-700 font-bold">
                {s.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-bark truncate">{s.name}</h3>
                <Badge variant="neutral">{s.category}</Badge>
              </div>
            </div>
            <div className="flex items-center text-sm text-soil-500 mb-2">
              <MapPin className="w-3.5 h-3.5 mr-1" /> {s.region}
            </div>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((i) =>
            <Star
              key={i}
              className={`w-4 h-4 ${i <= Math.round(s.rating) ? 'fill-amber-400 text-amber-400' : 'text-soil-200'}`} />

            )}
              <span className="text-xs text-soil-500 ml-2 tabular-nums">
                {s.rating}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-soil-100">
              <div>
                <p className="text-xs text-soil-500">POs</p>
                <p className="text-sm font-semibold text-bark tabular-nums">
                  {s.poCount}
                </p>
              </div>
              <div>
                <p className="text-xs text-soil-500">Spend YTD</p>
                <p className="text-sm font-semibold text-bark tabular-nums">
                  {(s.spendYTD / 1000000).toFixed(0)}M
                </p>
              </div>
              <div>
                <p className="text-xs text-soil-500">On-time</p>
                <p className="text-sm font-semibold text-avocado-600 tabular-nums">
                  {s.onTimePct}%
                </p>
              </div>
            </div>
            <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/procurement/suppliers/${s.id}`)}>
            
              View scorecard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>);

}