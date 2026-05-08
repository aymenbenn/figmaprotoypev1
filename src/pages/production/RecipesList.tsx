import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockRecipes } from '../../lib/data/production';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock } from 'lucide-react';
const recipeIcons: Record<string, JSX.Element> = {
  'R-001':
  <svg viewBox="0 0 64 64" className="w-12 h-12">
      <ellipse cx="32" cy="36" rx="14" ry="20" fill="#5C7F33" />
      <ellipse cx="32" cy="38" rx="6" ry="9" fill="#3B2A1F" />
      <path
      d="M32 14 Q34 10 38 12"
      stroke="#84431F"
      strokeWidth="2"
      fill="none" />
    
    </svg>,

  'R-002':
  <svg viewBox="0 0 64 64" className="w-12 h-12">
      <rect x="22" y="14" width="20" height="40" rx="3" fill="#A4BE76" />
      <rect x="26" y="10" width="12" height="6" rx="1" fill="#84431F" />
      <rect x="24" y="28" width="16" height="8" fill="#FFFFFF" opacity="0.4" />
    </svg>,

  'R-003':
  <svg viewBox="0 0 64 64" className="w-12 h-12">
      <path d="M16 22 L48 22 L44 54 L20 54 Z" fill="#7E9F4E" />
      <ellipse cx="32" cy="22" rx="16" ry="4" fill="#5C7F33" />
    </svg>,

  'R-004':
  <svg viewBox="0 0 64 64" className="w-12 h-12">
      <ellipse cx="20" cy="32" rx="8" ry="6" fill="#A0552F" />
      <ellipse cx="36" cy="28" rx="10" ry="7" fill="#B97F5C" />
      <ellipse cx="28" cy="42" rx="9" ry="6" fill="#84431F" />
    </svg>

};
export function RecipesList() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center -mt-20 relative z-10 mr-8">
        <p className="text-sm text-soil-500">
          {mockRecipes.length} active recipes · governed by QA
        </p>
        <Button variant="outline">+ New recipe</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRecipes.map((recipe) =>
        <Card
          key={recipe.id}
          className="hover:shadow-md transition-shadow cursor-pointer group"
          onClick={() => navigate(`/production/recipes/${recipe.id}`)}>
          
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-soil-50 border border-soil-100 flex items-center justify-center shrink-0">
                  {recipeIcons[recipe.id] ??
                <FileText className="w-7 h-7 text-soil-400" />
                }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-bark truncate">
                    {recipe.name}
                  </h3>
                  <p className="text-xs text-soil-500 mt-1">
                    Recipe ID · {recipe.id}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-avocado-700 bg-avocado-50 px-2 py-0.5 rounded">
                    {recipe.version}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-soil-100">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-soil-400 font-medium">
                    Output unit
                  </p>
                  <p className="text-sm font-medium text-bark mt-0.5">
                    {recipe.outputUnit}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-soil-400 font-medium">
                    Ingredients
                  </p>
                  <p className="text-sm font-medium text-bark mt-0.5 tabular-nums">
                    {recipe.ingredientsCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-xs text-soil-400">
                <Clock className="w-3 h-3" />
                <span>Updated {recipe.lastUpdated}</span>
                <span className="ml-auto text-soil-500 group-hover:text-soil-700 font-medium transition-colors">
                  View →
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

}