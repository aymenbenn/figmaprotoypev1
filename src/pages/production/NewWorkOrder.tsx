import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Check, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const steps = [
{
  id: 1,
  name: 'Product & Quantity'
},
{
  id: 2,
  name: 'Materials Check'
},
{
  id: 3,
  name: 'Schedule'
},
{
  id: 4,
  name: 'Review'
}];

const materials = [
{
  name: 'Grade-A Avocados',
  required: 8000,
  unit: 'kg',
  available: 7760,
  shortage: 240
},
{
  name: 'Glass Bottles 500ml',
  required: 5000,
  unit: 'units',
  available: 6200,
  shortage: 0
},
{
  name: 'Bottle Caps',
  required: 5000,
  unit: 'units',
  available: 5500,
  shortage: 0
},
{
  name: 'Labels (500ml)',
  required: 5000,
  unit: 'units',
  available: 4800,
  shortage: 200
},
{
  name: 'Cartons (12-pack)',
  required: 417,
  unit: 'units',
  available: 500,
  shortage: 0
}];

export function NewWorkOrder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    product: 'Cold-Press Avocado Oil 500ml',
    targetQty: 5000,
    unit: 'units',
    priority: 'Normal',
    customerRef: '',
    notes: '',
    line: 'Bottling Line 1',
    startDate: '2026-05-09',
    startTime: '08:00',
    supervisor: 'Amara Okeke'
  });
  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    toast.success('Work order WO-1048 created successfully!');
    setTimeout(() => navigate('/production/work-orders'), 1000);
  };
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-bark">Create New Work Order</h2>
          <p className="text-sm text-soil-500 mt-1">
            Follow the steps to schedule a production run
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate('/production/work-orders')}>
          
          Cancel
        </Button>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) =>
        <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center space-x-3">
              <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step.id < currentStep ? 'bg-avocado-500 text-white' : step.id === currentStep ? 'bg-soil-500 text-white' : 'bg-soil-100 text-soil-400'}`}>
              
                {step.id < currentStep ?
              <Check className="w-5 h-5" /> :

              step.id
              }
              </div>
              <div>
                <p
                className={`text-sm font-medium ${step.id <= currentStep ? 'text-bark' : 'text-soil-400'}`}>
                
                  {step.name}
                </p>
              </div>
            </div>
            {idx < steps.length - 1 &&
          <div
            className={`flex-1 h-0.5 mx-4 ${step.id < currentStep ? 'bg-avocado-500' : 'bg-soil-100'}`} />

          }
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 &&
          <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-bark mb-2">
                  Product
                </label>
                <select
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                value={formData.product}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  product: e.target.value
                })
                }>
                
                  <option>Cold-Press Avocado Oil 500ml</option>
                  <option>Refined Avocado Oil 1L</option>
                  <option>Avocado Puree 250g</option>
                  <option>Dried Avocado Slices 50g</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-bark mb-2">
                    Target Quantity
                  </label>
                  <input
                  type="number"
                  className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                  value={formData.targetQty}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetQty: parseInt(e.target.value)
                  })
                  } />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-bark mb-2">
                    Unit
                  </label>
                  <select
                  className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                  value={formData.unit}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    unit: e.target.value
                  })
                  }>
                  
                    <option>units</option>
                    <option>kg</option>
                    <option>L</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-bark mb-2">
                  Priority
                </label>
                <div className="flex space-x-3">
                  {['Low', 'Normal', 'High', 'Urgent'].map((p) =>
                <button
                  key={p}
                  onClick={() =>
                  setFormData({
                    ...formData,
                    priority: p
                  })
                  }
                  className={`px-4 py-2 rounded-lg border transition-colors ${formData.priority === p ? 'bg-soil-500 text-white border-soil-500' : 'border-soil-200 text-soil-600 hover:bg-soil-50'}`}>
                  
                      {p}
                    </button>
                )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-bark mb-2">
                  Customer Order Reference (Optional)
                </label>
                <input
                type="text"
                placeholder="e.g. PO-RiftValley-092"
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                value={formData.customerRef}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  customerRef: e.target.value
                })
                } />
              
              </div>
              <div>
                <label className="block text-sm font-medium text-bark mb-2">
                  Notes
                </label>
                <textarea
                rows={3}
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                value={formData.notes}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value
                })
                } />
              
              </div>
            </div>
          }

          {currentStep === 2 &&
          <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Material Shortages Detected
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    You are short on 2 materials. Consider procurement before
                    releasing this work order.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">
                        Material
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Required
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Available
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Shortage
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soil-100">
                    {materials.map((mat, i) =>
                  <tr key={i}>
                        <td className="px-4 py-3 text-bark">{mat.name}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-soil-600">
                          {mat.required.toLocaleString()} {mat.unit}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-soil-600">
                          {mat.available.toLocaleString()} {mat.unit}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {mat.shortage > 0 ?
                      <span className="text-red-600 font-medium">
                              -{mat.shortage.toLocaleString()} {mat.unit}
                            </span> :

                      <span className="text-soil-400">—</span>
                      }
                        </td>
                        <td className="px-4 py-3 text-center">
                          {mat.shortage > 0 ?
                      <Badge variant="danger">Short</Badge> :

                      <Badge variant="success">Available</Badge>
                      }
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          }

          {currentStep === 3 &&
          <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-bark mb-2">
                  Production Line
                </label>
                <select
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                value={formData.line}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  line: e.target.value
                })
                }>
                
                  <option>Bottling Line 1 (Capacity: 2000 units/shift)</option>
                  <option>Cold-Press Line A (Capacity: 4000 L/shift)</option>
                  <option>Cold-Press Line B (Capacity: 4000 L/shift)</option>
                  <option>Packaging Line 2 (Capacity: 3000 units/shift)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-bark mb-2">
                    Preferred Start Date
                  </label>
                  <input
                  type="date"
                  className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                  value={formData.startDate}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: e.target.value
                  })
                  } />
                
                </div>
                <div>
                  <label className="block text-sm font-medium text-bark mb-2">
                    Start Time
                  </label>
                  <input
                  type="time"
                  className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                  value={formData.startTime}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    startTime: e.target.value
                  })
                  } />
                
                </div>
              </div>
              <div className="bg-soil-50 border border-soil-100 rounded-lg p-4">
                <p className="text-sm text-soil-600">
                  <span className="font-medium">Expected Duration:</span> 6.5
                  hours (based on line capacity)
                </p>
                <p className="text-sm text-soil-600 mt-1">
                  <span className="font-medium">Estimated Completion:</span> May
                  9, 2026 at 14:30
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-bark mb-2">
                  Assign Supervisor
                </label>
                <select
                className="w-full px-4 py-2 border border-soil-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soil-400"
                value={formData.supervisor}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  supervisor: e.target.value
                })
                }>
                
                  <option>Amara Okeke</option>
                  <option>Joseph Mwangi</option>
                  <option>Sarah Nakato</option>
                  <option>Fatima Diallo</option>
                  <option>David Omondi</option>
                </select>
              </div>
            </div>
          }

          {currentStep === 4 &&
          <div className="space-y-6">
              <div className="bg-avocado-50 border border-avocado-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-avocado-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-avocado-800">
                    Ready to Create
                  </p>
                  <p className="text-sm text-avocado-700 mt-1">
                    Review the details below and save when ready.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Product
                  </p>
                  <p className="text-sm text-bark font-medium">
                    {formData.product}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Target Quantity
                  </p>
                  <p className="text-sm text-bark font-medium">
                    {formData.targetQty.toLocaleString()} {formData.unit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Priority
                  </p>
                  <Badge
                  variant={
                  formData.priority === 'Urgent' ?
                  'danger' :
                  formData.priority === 'High' ?
                  'warning' :
                  'neutral'
                  }>
                  
                    {formData.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Production Line
                  </p>
                  <p className="text-sm text-bark font-medium">
                    {formData.line}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Scheduled Start
                  </p>
                  <p className="text-sm text-bark font-medium">
                    {formData.startDate} at {formData.startTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                    Supervisor
                  </p>
                  <p className="text-sm text-bark font-medium">
                    {formData.supervisor}
                  </p>
                </div>
                {formData.customerRef &&
              <div>
                    <p className="text-xs text-soil-500 uppercase font-medium mb-1">
                      Customer Reference
                    </p>
                    <p className="text-sm text-bark font-medium">
                      {formData.customerRef}
                    </p>
                  </div>
              }
              </div>
            </div>
          }
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}>
          
          Back
        </Button>
        <div className="flex space-x-3">
          {currentStep === 4 ?
          <>
              <Button variant="outline" onClick={handleSubmit}>
                Save as draft
              </Button>
              <Button onClick={handleSubmit}>Save & release to floor</Button>
            </> :

          <Button onClick={handleNext}>
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          }
        </div>
      </div>
    </div>);

}