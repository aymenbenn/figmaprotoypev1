import {
  LayoutDashboard,
  Factory,
  ShoppingCart,
  Package,
  ClipboardCheck,
  Warehouse,
  Truck,
  Users,
  Wrench,
  BarChart3,
  LucideIcon } from
'lucide-react';

export type ModuleGroup =
'OVERVIEW' |
'OPERATIONS' |
'LOGISTICS & PEOPLE' |
'INSIGHTS';

export interface ModuleDef {
  id: string;
  name: string;
  path: string;
  icon: LucideIcon;
  group: ModuleGroup;
  description: string;
  features: string[];
}

export const MODULES: ModuleDef[] = [
{
  id: 'dashboard',
  name: 'Dashboard',
  path: '/',
  icon: LayoutDashboard,
  group: 'OVERVIEW',
  description: 'Global factory overview and key performance indicators.',
  features: []
},
{
  id: 'production',
  name: 'Production',
  path: '/production',
  icon: Factory,
  group: 'OPERATIONS',
  description: 'Manage production lines, batches, and throughput.',
  features: [
  'Live production line monitoring',
  'Batch creation and tracking',
  'Yield and waste reporting',
  'Shift handover logs']

},
{
  id: 'procurement',
  name: 'Procurement',
  path: '/procurement',
  icon: ShoppingCart,
  group: 'OPERATIONS',
  description: 'Manage supplier POs, raw material sourcing, and approvals.',
  features: [
  'Purchase order workflows',
  'Supplier performance tracking',
  'Invoice and payment approvals',
  'Raw material forecasting']

},
{
  id: 'inventory',
  name: 'Inventory',
  path: '/inventory',
  icon: Package,
  group: 'OPERATIONS',
  description: 'Track raw materials, WIP, and finished goods.',
  features: [
  'Real-time stock levels',
  'Reorder point alerts',
  'Cycle count management',
  'Multi-warehouse visibility']

},
{
  id: 'orders',
  name: 'Orders',
  path: '/orders',
  icon: ShoppingCart, // Reusing icon, could be different
  group: 'OPERATIONS',
  description: 'Process customer orders and fulfillment.',
  features: [
  'Sales order processing',
  'Fulfillment tracking',
  'Customer delivery schedules',
  'Return management']

},
{
  id: 'qc',
  name: 'Quality Control',
  path: '/qc',
  icon: ClipboardCheck,
  group: 'OPERATIONS',
  description: 'Manage quality checks, holds, and releases.',
  features: [
  'Batch testing workflows',
  'Quality hold management',
  'Compliance documentation',
  'Defect logging']

},
{
  id: 'warehouse',
  name: 'Warehouse',
  path: '/warehouse',
  icon: Warehouse,
  group: 'OPERATIONS',
  description: 'Manage bin locations, putaway, and picking.',
  features: [
  'Bin location mapping',
  'Directed putaway',
  'Pick list generation',
  'Space utilization metrics']

},
{
  id: 'logistics',
  name: 'Logistics & Gate',
  path: '/logistics',
  icon: Truck,
  group: 'LOGISTICS & PEOPLE',
  description: 'Manage inbound/outbound trucks and gate operations.',
  features: [
  'Gate check-in/check-out',
  'Weighbridge integration',
  'Driver documentation',
  'Dock scheduling']

},
{
  id: 'users',
  name: 'Users',
  path: '/users',
  icon: Users,
  group: 'LOGISTICS & PEOPLE',
  description: 'Manage staff, roles, and shift assignments.',
  features: [
  'Role-based access control',
  'Shift scheduling',
  'Certification tracking',
  'Activity audit logs']

},
{
  id: 'maintenance',
  name: 'Maintenance',
  path: '/maintenance',
  icon: Wrench,
  group: 'LOGISTICS & PEOPLE',
  description: 'Manage equipment work orders and preventive maintenance.',
  features: [
  'Work order creation',
  'Preventive maintenance schedules',
  'Spare parts inventory',
  'Downtime tracking']

},
{
  id: 'reports',
  name: 'Reports',
  path: '/reports',
  icon: BarChart3,
  group: 'INSIGHTS',
  description: 'Generate and export operational reports.',
  features: [
  'Custom dashboard builder',
  'Scheduled email reports',
  'Historical trend analysis',
  'Export to Excel/PDF']

}];