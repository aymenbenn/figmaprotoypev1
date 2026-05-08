import { LucideIcon } from 'lucide-react';

export interface WorkOrder {
  id: string;
  product: string;
  targetQty: number;
  unit: string;
  line: string;
  scheduledStart: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status:
  'Planned' |
  'Released' |
  'In Progress' |
  'On Hold' |
  'Completed' |
  'Closed';
  progress: number;
  customerRef?: string;
  supervisor: string;
}

export interface Batch {
  id: string;
  workOrderId: string;
  product: string;
  line: string;
  startedAt: string;
  qtyIn: number;
  qtyOut: number;
  yieldPct: number;
  qcStatus: 'Pending' | 'Passed' | 'Failed' | 'Hold';
  status:
  'Running' |
  'On Hold' |
  'Awaiting QC' |
  'Released' |
  'Rejected' |
  'Closed';
  operator: string;
  progress: number;
}

export interface Line {
  id: string;
  name: string;
  type: string;
  status: 'Running' | 'Idle' | 'Stopped';
  currentBatch?: string;
  outputToday: number;
  unit: string;
  oee: number;
  availability: number;
  performance: number;
  quality: number;
}

export interface Recipe {
  id: string;
  name: string;
  version: string;
  outputUnit: string;
  ingredientsCount: number;
  lastUpdated: string;
}

export const mockWorkOrders: WorkOrder[] = [
{
  id: 'WO-1042',
  product: 'Cold-Press Avocado Oil 500ml',
  targetQty: 5000,
  unit: 'units',
  line: 'Bottling Line 1',
  scheduledStart: '2026-05-08T08:00:00Z',
  priority: 'High',
  status: 'In Progress',
  progress: 45,
  customerRef: 'PO-RiftValley-092',
  supervisor: 'Amara Okeke'
},
{
  id: 'WO-1043',
  product: 'Refined Avocado Oil 1L',
  targetQty: 2000,
  unit: 'units',
  line: 'Bottling Line 1',
  scheduledStart: '2026-05-09T08:00:00Z',
  priority: 'Normal',
  status: 'Planned',
  progress: 0,
  supervisor: 'Joseph Mwangi'
},
{
  id: 'WO-1044',
  product: 'Avocado Puree 250g',
  targetQty: 10000,
  unit: 'units',
  line: 'Packaging Line 2',
  scheduledStart: '2026-05-08T10:00:00Z',
  priority: 'Urgent',
  status: 'Released',
  progress: 0,
  customerRef: 'PO-NairobiFresh-11',
  supervisor: 'Sarah Nakato'
},
{
  id: 'WO-1045',
  product: 'Dried Avocado Slices 50g',
  targetQty: 1500,
  unit: 'units',
  line: 'Packaging Line 2',
  scheduledStart: '2026-05-07T08:00:00Z',
  priority: 'Normal',
  status: 'Completed',
  progress: 100,
  supervisor: 'Fatima Diallo'
},
{
  id: 'WO-1046',
  product: 'Cold-Press Bulk',
  targetQty: 5000,
  unit: 'L',
  line: 'Cold-Press Line A',
  scheduledStart: '2026-05-08T06:00:00Z',
  priority: 'High',
  status: 'In Progress',
  progress: 60,
  supervisor: 'David Omondi'
},
{
  id: 'WO-1047',
  product: 'Cold-Press Bulk',
  targetQty: 5000,
  unit: 'L',
  line: 'Cold-Press Line B',
  scheduledStart: '2026-05-08T06:00:00Z',
  priority: 'Normal',
  status: 'On Hold',
  progress: 20,
  supervisor: 'Grace Achieng'
}];


export const mockBatches: Batch[] = [
{
  id: 'B-0501',
  workOrderId: 'WO-1042',
  product: 'Cold-Press Avocado Oil 500ml',
  line: 'Bottling Line 1',
  startedAt: '2026-05-08T08:15:00Z',
  qtyIn: 1200,
  qtyOut: 1150,
  yieldPct: 95.8,
  qcStatus: 'Pending',
  status: 'Running',
  operator: 'Sarah Nakato',
  progress: 45
},
{
  id: 'B-0502',
  workOrderId: 'WO-1046',
  product: 'Cold-Press Bulk',
  line: 'Cold-Press Line A',
  startedAt: '2026-05-08T06:30:00Z',
  qtyIn: 8000,
  qtyOut: 3200,
  yieldPct: 40.0,
  qcStatus: 'Passed',
  status: 'Running',
  operator: 'David Omondi',
  progress: 60
},
{
  id: 'B-0503',
  workOrderId: 'WO-1047',
  product: 'Cold-Press Bulk',
  line: 'Cold-Press Line B',
  startedAt: '2026-05-08T06:45:00Z',
  qtyIn: 2000,
  qtyOut: 750,
  yieldPct: 37.5,
  qcStatus: 'Hold',
  status: 'On Hold',
  operator: 'Grace Achieng',
  progress: 20
},
{
  id: 'B-0498',
  workOrderId: 'WO-1030',
  product: 'Refined Avocado Oil 1L',
  line: 'Bottling Line 1',
  startedAt: '2026-05-07T14:00:00Z',
  qtyIn: 2100,
  qtyOut: 2050,
  yieldPct: 97.6,
  qcStatus: 'Pending',
  status: 'Awaiting QC',
  operator: 'Joseph Mwangi',
  progress: 100
},
{
  id: 'B-0499',
  workOrderId: 'WO-1045',
  product: 'Dried Avocado Slices 50g',
  line: 'Packaging Line 2',
  startedAt: '2026-05-07T08:30:00Z',
  qtyIn: 500,
  qtyOut: 1500,
  yieldPct: 92.0,
  qcStatus: 'Passed',
  status: 'Released',
  operator: 'Fatima Diallo',
  progress: 100
}];


export const mockLines: Line[] = [
{
  id: 'L-CPA',
  name: 'Cold-Press Line A',
  type: 'Extraction',
  status: 'Running',
  currentBatch: 'B-0502',
  outputToday: 3200,
  unit: 'L',
  oee: 84.5,
  availability: 92,
  performance: 95,
  quality: 97
},
{
  id: 'L-CPB',
  name: 'Cold-Press Line B',
  type: 'Extraction',
  status: 'Stopped',
  currentBatch: 'B-0503',
  outputToday: 750,
  unit: 'L',
  oee: 45.2,
  availability: 60,
  performance: 80,
  quality: 94
},
{
  id: 'L-BL1',
  name: 'Bottling Line 1',
  type: 'Packaging',
  status: 'Running',
  currentBatch: 'B-0501',
  outputToday: 1150,
  unit: 'units',
  oee: 91.2,
  availability: 98,
  performance: 94,
  quality: 99
},
{
  id: 'L-PL2',
  name: 'Packaging Line 2',
  type: 'Packaging',
  status: 'Idle',
  outputToday: 1500,
  unit: 'units',
  oee: 78.4,
  availability: 85,
  performance: 90,
  quality: 98
}];


export const mockRecipes: Recipe[] = [
{
  id: 'R-001',
  name: 'Cold-Press Avocado Oil',
  version: 'v2.3',
  outputUnit: 'L',
  ingredientsCount: 1,
  lastUpdated: '2026-01-15'
},
{
  id: 'R-002',
  name: 'Refined Avocado Oil',
  version: 'v1.8',
  outputUnit: 'L',
  ingredientsCount: 3,
  lastUpdated: '2025-11-20'
},
{
  id: 'R-003',
  name: 'Avocado Puree',
  version: 'v3.0',
  outputUnit: 'kg',
  ingredientsCount: 4,
  lastUpdated: '2026-03-10'
},
{
  id: 'R-004',
  name: 'Dried Avocado Slices',
  version: 'v1.2',
  outputUnit: 'kg',
  ingredientsCount: 2,
  lastUpdated: '2025-08-05'
}];