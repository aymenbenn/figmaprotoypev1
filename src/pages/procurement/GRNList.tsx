import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockGRNs, mockSuppliers } from '../../lib/data/procurement';
export function GRNList() {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
            <tr>
              <th className="px-6 py-4 font-medium">GRN #</th>
              <th className="px-6 py-4 font-medium">PO #</th>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">Received</th>
              <th className="px-6 py-4 font-medium">Receiver</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soil-100">
            {mockGRNs.map((g) => {
              const sup = mockSuppliers.find((s) => s.id === g.supplierId);
              return (
                <tr
                  key={g.id}
                  onClick={() => navigate(`/procurement/grn/${g.id}`)}
                  className="hover:bg-soil-50 cursor-pointer">
                  
                  <td className="px-6 py-4 font-medium text-soil-700">
                    {g.id}
                  </td>
                  <td className="px-6 py-4 text-soil-600">{g.poId}</td>
                  <td className="px-6 py-4 text-bark">{sup?.name}</td>
                  <td className="px-6 py-4 text-soil-600 tabular-nums">
                    {new Date(g.receivedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-soil-600">{g.receiver}</td>
                  <td className="px-6 py-4 text-soil-600 tabular-nums">
                    {g.itemsCount}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                      g.status === 'Accepted' ?
                      'success' :
                      g.status === 'Rejected' ?
                      'danger' :
                      g.status === 'Partially Accepted' ?
                      'warning' :
                      'info'
                      }>
                      
                      {g.status}
                    </Badge>
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </CardContent>
    </Card>);

}