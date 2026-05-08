import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockRecipes } from '../../lib/data/production';
import { ArrowLeft, Edit3, Download, History } from 'lucide-react';
interface Ingredient {
  material: string;
  qty: number;
  unit: string;
  pctOfTotal: number;
  supplier: string;
  notes?: string;
}
const ingredientsByRecipe: Record<string, Ingredient[]> = {
  'R-001': [
  {
    material: 'Grade-A Hass Avocados',
    qty: 4500,
    unit: 'kg',
    pctOfTotal: 100,
    supplier: 'Kakira Avocado Coop (preferred)',
    notes: 'Min 24% oil content'
  }],

  'R-002': [
  {
    material: 'Cold-pressed crude oil',
    qty: 1000,
    unit: 'L',
    pctOfTotal: 92,
    supplier: 'Internal — Cold-Press Line A'
  },
  {
    material: 'Bleaching earth',
    qty: 25,
    unit: 'kg',
    pctOfTotal: 5,
    supplier: 'East Africa Chemicals Ltd'
  },
  {
    material: 'Citric acid (food grade)',
    qty: 3,
    unit: 'kg',
    pctOfTotal: 3,
    supplier: 'Mbale Industrial Supplies'
  }],

  'R-003': [
  {
    material: 'Grade-B Avocados',
    qty: 800,
    unit: 'kg',
    pctOfTotal: 80,
    supplier: 'Mbale Smallholder Union'
  },
  {
    material: 'Lemon juice concentrate',
    qty: 80,
    unit: 'L',
    pctOfTotal: 8,
    supplier: 'Rift Citrus Co.'
  },
  {
    material: 'Sea salt',
    qty: 12,
    unit: 'kg',
    pctOfTotal: 2,
    supplier: 'Lake Salt Traders'
  },
  {
    material: 'Ascorbic acid',
    qty: 5,
    unit: 'kg',
    pctOfTotal: 0.5,
    supplier: 'East Africa Chemicals Ltd'
  }],

  'R-004': [
  {
    material: 'Grade-B Avocados',
    qty: 600,
    unit: 'kg',
    pctOfTotal: 95,
    supplier: 'Mbale Smallholder Union'
  },
  {
    material: 'Lemon juice concentrate',
    qty: 30,
    unit: 'L',
    pctOfTotal: 5,
    supplier: 'Rift Citrus Co.'
  }]

};
const stepsByRecipe: Record<
  string,
  {
    step: string;
    duration: string;
    notes: string;
  }[]> =
{
  'R-001': [
  {
    step: 'Wash & sort avocados',
    duration: '45 min',
    notes: 'Reject any with skin damage > 5%'
  },
  {
    step: 'De-stone & crush',
    duration: '1 h 15 min',
    notes: 'Maintain temp below 22°C'
  },
  {
    step: 'Malaxation (slow mixing)',
    duration: '40 min',
    notes: '20–22°C, 40 RPM'
  },
  {
    step: 'Cold press extraction',
    duration: '2 h 30 min',
    notes: 'Two-phase decanter'
  },
  {
    step: 'Filtration',
    duration: '1 h 15 min',
    notes: 'Plate filter, 5 micron'
  },
  {
    step: 'Settling tank rest',
    duration: '12 h',
    notes: 'Pre-bottling clarity check'
  }],

  'R-002': [
  {
    step: 'Receive crude oil from press',
    duration: '15 min',
    notes: 'QC sample required'
  },
  {
    step: 'Bleaching',
    duration: '1 h',
    notes: '95–105°C, vacuum'
  },
  {
    step: 'Filtration of bleaching earth',
    duration: '45 min',
    notes: 'Sealed filter press'
  },
  {
    step: 'Deodorization',
    duration: '2 h',
    notes: 'Steam distillation 240°C'
  },
  {
    step: 'Cooling & polishing',
    duration: '1 h 30 min',
    notes: 'Final filter 1 micron'
  }],

  'R-003': [
  {
    step: 'Wash & sort avocados',
    duration: '40 min',
    notes: ''
  },
  {
    step: 'De-stone & blanch',
    duration: '30 min',
    notes: '70°C for 90 sec'
  },
  {
    step: 'Pulping',
    duration: '45 min',
    notes: 'Achieve smooth particle size'
  },
  {
    step: 'Acidification',
    duration: '20 min',
    notes: 'Lemon + ascorbic for color'
  },
  {
    step: 'Pasteurization',
    duration: '1 h',
    notes: '85°C for 30 sec, then cool'
  },
  {
    step: 'Hot-fill into pouches',
    duration: '1 h 30 min',
    notes: 'Maintain 75°C at fill'
  }],

  'R-004': [
  {
    step: 'Wash & sort avocados',
    duration: '30 min',
    notes: ''
  },
  {
    step: 'Slice to 4 mm',
    duration: '45 min',
    notes: 'Industrial mandolin'
  },
  {
    step: 'Acid bath dip',
    duration: '5 min',
    notes: 'Anti-browning'
  },
  {
    step: 'Dehydration',
    duration: '8 h',
    notes: '57°C, 15% target moisture'
  },
  {
    step: 'Cool & weigh',
    duration: '30 min',
    notes: ''
  },
  {
    step: 'Vacuum pack',
    duration: '1 h',
    notes: 'N2 flush optional'
  }]

};
export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipes.find((r) => r.id === id) ?? mockRecipes[0];
  const ingredients = ingredientsByRecipe[recipe.id] ?? [];
  const steps = stepsByRecipe[recipe.id] ?? [];
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/production/recipes')}
        className="flex items-center text-sm text-soil-500 hover:text-soil-700 transition-colors -mt-20 relative z-10">
        
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Recipes
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-bark">{recipe.name}</h2>
            <Badge variant="success">{recipe.version}</Badge>
            <Badge variant="neutral">Active</Badge>
          </div>
          <p className="text-sm text-soil-500 mt-1">
            Recipe {recipe.id} · Output unit: {recipe.outputUnit} · Last updated{' '}
            {recipe.lastUpdated}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button>
            <Edit3 className="w-4 h-4 mr-2" /> Propose change
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-soil-500 bg-soil-50 uppercase border-b border-soil-100">
                <tr>
                  <th className="px-6 py-3 font-medium">Material</th>
                  <th className="px-6 py-3 font-medium text-right">Qty</th>
                  <th className="px-6 py-3 font-medium text-right">
                    % of total
                  </th>
                  <th className="px-6 py-3 font-medium">Preferred supplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soil-100">
                {ingredients.map((ing, i) =>
                <tr key={i} className="hover:bg-soil-50/50">
                    <td className="px-6 py-3">
                      <p className="text-bark font-medium">{ing.material}</p>
                      {ing.notes &&
                    <p className="text-xs text-soil-500 mt-0.5">
                          {ing.notes}
                        </p>
                    }
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums text-soil-700">
                      {ing.qty.toLocaleString()} {ing.unit}
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums text-soil-600">
                      {ing.pctOfTotal}%
                    </td>
                    <td className="px-6 py-3 text-soil-600">{ing.supplier}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yield expectations</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="text-xs text-soil-500 uppercase font-medium">
                Target yield
              </p>
              <p className="text-3xl font-bold text-bark mt-1 tabular-nums">
                {recipe.id === 'R-001' ?
                '22.5%' :
                recipe.id === 'R-002' ?
                '94.0%' :
                recipe.id === 'R-003' ?
                '78.0%' :
                '15.0%'}
              </p>
            </div>
            <div className="pt-4 border-t border-soil-100">
              <p className="text-xs text-soil-500 uppercase font-medium">
                Tolerance
              </p>
              <p className="text-sm text-bark mt-1">±2% before quality flag</p>
            </div>
            <div className="pt-4 border-t border-soil-100">
              <p className="text-xs text-soil-500 uppercase font-medium">
                Std cost / output
              </p>
              <p className="text-sm text-bark mt-1 tabular-nums">
                UGX 5,217 / unit
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Process steps</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ol className="space-y-4">
            {steps.map((s, i) =>
            <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 shrink-0 rounded-full bg-soil-500 text-bone flex items-center justify-center text-sm font-bold tabular-nums">
                  {i + 1}
                </div>
                <div className="flex-1 pb-4 border-b border-soil-50 last:border-b-0">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-bark">{s.step}</p>
                    <span className="text-xs text-soil-500 tabular-nums shrink-0">
                      {s.duration}
                    </span>
                  </div>
                  {s.notes &&
                <p className="text-xs text-soil-500 mt-1">{s.notes}</p>
                }
                </div>
              </li>
            )}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-4 h-4" /> Change history
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-soil-50">
            {[
            {
              v: recipe.version,
              date: recipe.lastUpdated,
              author: 'Amara Okeke',
              note: 'Updated malaxation temperature window per QA finding 2026-Q1.'
            },
            {
              v: 'v2.2',
              date: '2025-09-04',
              author: 'Joseph Mwangi',
              note: 'Added supplier alternative for off-season periods.'
            },
            {
              v: 'v2.1',
              date: '2025-04-12',
              author: 'Sarah Nakato',
              note: 'Initial production-ready version.'
            }].
            map((h, i) =>
            <div key={i} className="p-4 flex items-start gap-4">
                <Badge variant={i === 0 ? 'success' : 'neutral'}>{h.v}</Badge>
                <div className="flex-1">
                  <p className="text-sm text-bark">{h.note}</p>
                  <p className="text-xs text-soil-500 mt-1 tabular-nums">
                    {h.date} · {h.author}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>);

}