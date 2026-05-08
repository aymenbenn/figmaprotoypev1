import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '../../components/ui/Tabs';
export function ProcurementLayout() {
  const location = useLocation();
  return (
    <div className="flex flex-col w-full min-h-full bg-cream">
      <div className="px-8 pt-8 pb-4 bg-bone border-b border-soil-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-bark">
              Procurement Processing
            </h1>
            <p className="text-soil-500 mt-1">
              Manage suppliers, purchase orders, and raw material sourcing
            </p>
          </div>
        </div>
        <Tabs>
          <Tab
            href="/procurement"
            active={location.pathname === '/procurement'}>
            
            Overview
          </Tab>
          <Tab
            href="/procurement/purchase-orders"
            active={location.pathname.startsWith(
              '/procurement/purchase-orders'
            )}>
            
            Purchase Orders
          </Tab>
          <Tab
            href="/procurement/rfqs"
            active={location.pathname.startsWith('/procurement/rfqs')}>
            
            RFQs
          </Tab>
          <Tab
            href="/procurement/suppliers"
            active={location.pathname.startsWith('/procurement/suppliers')}>
            
            Suppliers
          </Tab>
          <Tab
            href="/procurement/grn"
            active={location.pathname.startsWith('/procurement/grn')}>
            
            Goods Receipt
          </Tab>
          <Tab
            href="/procurement/forecast"
            active={location.pathname.startsWith('/procurement/forecast')}>
            
            Forecast
          </Tab>
        </Tabs>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>);

}