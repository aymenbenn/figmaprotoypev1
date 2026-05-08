import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockRFQs, mockSuppliers } from '../../lib/data/procurement';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
export function RFQDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rfq = mockRFQs.find((r) => r.id === id) || mockRFQs[0];
  const allMaterials = Array.from(
    new Set(rfq.responses.flatMap((r) => r.items.map((i) => i.material)))
  );
  const bestPriceFor = (material: string) => {
    const prices = rfq.responses.
    map((r) => r.items.find((i) => i.material === material)?.unitPrice).
    filter(Boolean) as number[];
    return prices.length ? Math.min(...prices) : null;
  };
  const worstPriceFor = (material: string) => {
    const prices = rfq.responses.
    map((r) => r.items.find((i) => i.material === material)?.unitPrice).
    filter(Boolean) as number[];
    return prices.length ? Math.max(...prices) : null;
  };
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/procurement/rfqs')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to RFQs
      </button>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-bark">{rfq.id}</h2>
            <Badge variant="info">{rfq.status}</Badge>
          </div>
          <p className="text-lg text-soil-600 mt-1">{rfq.title}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-soil-500 uppercase">Closes</p>
          <p className="text-sm font-semibold text-bark">
            {new Date(rfq.closingDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {rfq.responses.length === 0 ?
      <Card>
          <CardContent className="p-12 text-center text-soil-500">
            No supplier responses yet. {rfq.suppliersInvited} suppliers invited.
          </CardContent>
        </Card> :

      <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Material</th>
                  {rfq.responses.map((r) => {
                  const supplier = mockSuppliers.find(
                    (s) => s.id === r.supplierId
                  );
                  return (
                    <th
                      key={r.supplierId}
                      className="px-6 py-4 font-medium text-center">
                      
                        {supplier?.name}
                      </th>);

                })}
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {allMaterials.map((mat) => {
                const best = bestPriceFor(mat);
                const worst = worstPriceFor(mat);
                return (
                  <tr key={mat}>
                      <td className="px-6 py-4 text-bark font-medium">{mat}</td>
                      {rfq.responses.map((r) => {
                      const item = r.items.find((i) => i.material === mat);
                      if (!item)
                      return (
                        <td
                          key={r.supplierId}
                          className="px-6 py-4 text-center text-soil-300">
                          
                              —
                            </td>);

                      const isBest = item.unitPrice === best;
                      const isWorst =
                      item.unitPrice === worst && best !== worst;
                      return (
                        <td
                          key={r.supplierId}
                          className={`px-6 py-4 text-center tabular-nums ${isBest ? 'bg-avocado-50 text-avocado-700 font-semibold' : isWorst ? 'bg-red-50 text-red-700' : 'text-soil-600'}`}>
                          
                            UGX {item.unitPrice.toLocaleString()}
                            <div className="text-xs opacity-70">
                              {item.leadTimeDays}d lead
                            </div>
                          </td>);

                    })}
                    </tr>);

              })}
                <tr className="bg-soil-50">
                  <td className="px-6 py-4 font-semibold text-bark">Award</td>
                  {rfq.responses.map((r) =>
                <td key={r.supplierId} className="px-6 py-4 text-center">
                      <Button
                    size="sm"
                    onClick={() =>
                    toast.success(
                      `Awarded to ${mockSuppliers.find((s) => s.id === r.supplierId)?.name}`
                    )
                    }>
                    
                        Award
                      </Button>
                    </td>
                )}
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      }
    </div>);

}