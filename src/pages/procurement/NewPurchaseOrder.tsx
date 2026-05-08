import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
export function NewPurchaseOrder() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/procurement/purchase-orders')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Purchase Orders
      </button>
      <Card>
        <CardContent className="p-12 text-center">
          <h2 className="text-xl font-bold text-bark mb-2">
            New Purchase Order
          </h2>
          <p className="text-soil-500 mb-6">
            Multi-step wizard coming next iteration.
          </p>
          <Button onClick={() => navigate('/procurement/purchase-orders')}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>);

}