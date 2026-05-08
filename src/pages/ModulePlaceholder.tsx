import React from 'react';
import { useLocation } from 'react-router-dom';
import { MODULES } from '../lib/modules';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
export function ModulePlaceholder() {
  const location = useLocation();
  const module = MODULES.find((m) => m.path === location.pathname) || MODULES[0];
  const Icon = module.icon;
  return (
    <div className="p-6 lg:p-10 max-w-screen-2xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bark">{module.name}</h1>
        <p className="text-soil-500 mt-1">{module.description}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-lg relative overflow-hidden">
          {/* Subtle decorative background element */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-soil-50 rounded-full opacity-50 pointer-events-none" />

          <div className="p-10 text-center relative z-10">
            <div className="w-20 h-20 mx-auto bg-avocado-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-avocado-100">
              <Icon className="h-10 w-10 text-avocado-600" />
            </div>

            <h2 className="text-xl font-bold text-bark mb-2">
              Coming in Phase 2
            </h2>
            <p className="text-soil-500 mb-8 text-sm">
              The {module.name.toLowerCase()} module is currently under
              construction. Once deployed, it will enable your team to:
            </p>

            <ul className="text-left space-y-3 mb-8">
              {module.features.map((feature, idx) =>
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-bark">
                
                  <div className="w-1.5 h-1.5 rounded-full bg-soil-400 mt-1.5 shrink-0" />
                  {feature}
                </li>
              )}
            </ul>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}>
              
              Return to Previous Page
            </Button>
          </div>
        </Card>
      </div>
    </div>);

}