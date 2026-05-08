import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockRFQs } from '../../lib/data/procurement';
export function RFQsList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
              <tr>
                <th className="px-6 py-4 font-medium">RFQ #</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Suppliers invited</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Closing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soil-100">
              {mockRFQs.map((rfq) =>
              <tr
                key={rfq.id}
                onClick={() => navigate(`/procurement/rfqs/${rfq.id}`)}
                className="hover:bg-soil-50 cursor-pointer">
                
                  <td className="px-6 py-4 font-medium text-soil-700">
                    {rfq.id}
                  </td>
                  <td className="px-6 py-4 text-bark">{rfq.title}</td>
                  <td className="px-6 py-4 text-soil-600 tabular-nums">
                    {rfq.itemsCount}
                  </td>
                  <td className="px-6 py-4 text-soil-600 tabular-nums">
                    {rfq.suppliersInvited}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                    variant={
                    rfq.status === 'Awarded' ?
                    'success' :
                    rfq.status === 'Comparing' ?
                    'info' :
                    rfq.status === 'Draft' ?
                    'neutral' :
                    'warning'
                    }>
                    
                      {rfq.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-soil-600 tabular-nums">
                    {new Date(rfq.closingDate).toLocaleDateString()}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>);

}