import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '../../components/ui/Tabs';
export function ProductionLayout() {
  const location = useLocation();
  const isShopFloor = location.pathname === '/production/shop-floor';
  if (isShopFloor) {
    return <Outlet />;
  }
  return (
    <div className="flex flex-col w-full min-h-full bg-cream">
      <div className="px-8 pt-8 pb-4 bg-bone border-b border-soil-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-bark">
              Production Processing
            </h1>
            <p className="text-soil-500 mt-1">
              Real-time production status across all lines and batches
            </p>
          </div>
        </div>
        <Tabs>
          <Tab href="/production" active={location.pathname === '/production'}>
            Overview
          </Tab>
          <Tab href="/production/work-orders">Work Orders</Tab>
          <Tab href="/production/batches">Batches</Tab>
          <Tab href="/production/lines">Lines</Tab>
          <Tab href="/production/schedule">Schedule</Tab>
          <Tab href="/production/recipes">Recipes</Tab>
          <Tab href="/production/shop-floor">Shop Floor</Tab>
        </Tabs>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>);

}