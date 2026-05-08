import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppShell } from './components/shell/AppShell';
import { Dashboard } from './pages/Dashboard';
import { ModulePlaceholder } from './pages/ModulePlaceholder';
import { MODULES } from './lib/modules';
// Production
import { ProductionLayout } from './pages/production/ProductionLayout';
import { ProductionOverview } from './pages/production/ProductionOverview';
import { WorkOrdersList } from './pages/production/WorkOrdersList';
import { NewWorkOrder } from './pages/production/NewWorkOrder';
import { WorkOrderDetail } from './pages/production/WorkOrderDetail';
import { BatchesList } from './pages/production/BatchesList';
import { BatchDetail } from './pages/production/BatchDetail';
import { LinesList } from './pages/production/LinesList';
import { LineDetail } from './pages/production/LineDetail';
import { ProductionSchedule } from './pages/production/ProductionSchedule';
import { RecipesList } from './pages/production/RecipesList';
import { RecipeDetail } from './pages/production/RecipeDetail';
import { ShopFloor } from './pages/production/ShopFloor';
// Procurement
import { ProcurementLayout } from './pages/procurement/ProcurementLayout';
import { ProcurementOverview } from './pages/procurement/ProcurementOverview';
import { PurchaseOrdersList } from './pages/procurement/PurchaseOrdersList';
import { NewPurchaseOrder } from './pages/procurement/NewPurchaseOrder';
import { PurchaseOrderDetail } from './pages/procurement/PurchaseOrderDetail';
import { RFQsList } from './pages/procurement/RFQsList';
import { RFQDetail } from './pages/procurement/RFQDetail';
import { SuppliersList } from './pages/procurement/SuppliersList';
import { SupplierDetail } from './pages/procurement/SupplierDetail';
import { GRNList } from './pages/procurement/GRNList';
import { GRNDetail } from './pages/procurement/GRNDetail';
import { Forecast } from './pages/procurement/Forecast';
import { ApprovalsQueue } from './pages/procurement/ApprovalsQueue';
export function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#FFFFFF',
            color: '#3B2A1F',
            border: '1px solid #E2CFBE'
          }
        }} />
      
      <Routes>
        <Route element={<AppShell />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Production module */}
          <Route path="/production" element={<ProductionLayout />}>
            <Route index element={<ProductionOverview />} />
            <Route path="work-orders" element={<WorkOrdersList />} />
            <Route path="work-orders/new" element={<NewWorkOrder />} />
            <Route path="work-orders/:id" element={<WorkOrderDetail />} />
            <Route path="batches" element={<BatchesList />} />
            <Route path="batches/:id" element={<BatchDetail />} />
            <Route path="lines" element={<LinesList />} />
            <Route path="lines/:id" element={<LineDetail />} />
            <Route path="schedule" element={<ProductionSchedule />} />
            <Route path="recipes" element={<RecipesList />} />
            <Route path="recipes/:id" element={<RecipeDetail />} />
            <Route path="shop-floor" element={<ShopFloor />} />
          </Route>

          {/* Procurement module */}
          <Route path="/procurement" element={<ProcurementLayout />}>
            <Route index element={<ProcurementOverview />} />
            <Route path="purchase-orders" element={<PurchaseOrdersList />} />
            <Route path="purchase-orders/new" element={<NewPurchaseOrder />} />
            <Route
              path="purchase-orders/:id"
              element={<PurchaseOrderDetail />} />
            
            <Route path="rfqs" element={<RFQsList />} />
            <Route path="rfqs/:id" element={<RFQDetail />} />
            <Route path="suppliers" element={<SuppliersList />} />
            <Route path="suppliers/:id" element={<SupplierDetail />} />
            <Route path="grn" element={<GRNList />} />
            <Route path="grn/:id" element={<GRNDetail />} />
            <Route path="approvals" element={<ApprovalsQueue />} />
            <Route path="forecast" element={<Forecast />} />
          </Route>

          {/* Other modules — placeholders for now */}
          {MODULES.filter(
            (m) =>
            m.path !== '/' &&
            m.path !== '/production' &&
            m.path !== '/procurement'
          ).map((module) =>
          <Route
            key={module.id}
            path={module.path}
            element={<ModulePlaceholder />} />

          )}
        </Route>
      </Routes>
    </BrowserRouter>);

}