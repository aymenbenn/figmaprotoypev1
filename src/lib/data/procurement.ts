export interface Supplier {
  id: string;
  name: string;
  category: string;
  region: string;
  rating: number;
  spendYTD: number;
  poCount: number;
  onTimePct: number;
  qualityScore: number;
  leadTimeDays: number;
  contactPerson: string;
  email: string;
  phone: string;
  paymentTerms: string;
  certifications: string[];
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  itemsCount: number;
  totalUGX: number;
  status:
  'Draft' |
  'Awaiting Approval' |
  'Approved' |
  'Sent' |
  'Partially Received' |
  'Fully Received' |
  'Closed' |
  'Cancelled';
  createdAt: string;
  expectedDelivery: string;
  items: POItem[];
}

export interface POItem {
  id: string;
  material: string;
  qtyOrdered: number;
  qtyReceived: number;
  unit: string;
  unitPrice: number;
  lineTotal: number;
}

export interface RFQ {
  id: string;
  title: string;
  itemsCount: number;
  suppliersInvited: number;
  status:
  'Draft' |
  'Sent' |
  'Receiving Quotes' |
  'Comparing' |
  'Awarded' |
  'Closed';
  closingDate: string;
  responses: RFQResponse[];
}

export interface RFQResponse {
  supplierId: string;
  items: RFQResponseItem[];
}

export interface RFQResponseItem {
  material: string;
  unitPrice: number;
  leadTimeDays: number;
}

export interface GRN {
  id: string;
  poId: string;
  supplierId: string;
  receivedDate: string;
  receiver: string;
  itemsCount: number;
  status: 'Pending QC' | 'Accepted' | 'Partially Accepted' | 'Rejected';
}

export interface MaterialForecast {
  id: string;
  material: string;
  currentStock: number;
  unit: string;
  forecastConsumption30d: number;
  projectedShortfallDate: string;
  recommendedOrderQty: number;
}

export const mockSuppliers: Supplier[] = [
{
  id: 'SUP-001',
  name: 'Kakira Avocado Coop',
  category: 'Avocado Grower',
  region: 'Jinja',
  rating: 4.8,
  spendYTD: 450000000,
  poCount: 42,
  onTimePct: 96,
  qualityScore: 98,
  leadTimeDays: 2,
  contactPerson: 'Samuel Kintu',
  email: 'samuel@kakiracoop.ug',
  phone: '+256 772 123 456',
  paymentTerms: 'Net 30',
  certifications: ['Organic', 'Fair Trade']
},
{
  id: 'SUP-002',
  name: 'Mbale Smallholder Union',
  category: 'Avocado Grower',
  region: 'Mbale',
  rating: 4.5,
  spendYTD: 280000000,
  poCount: 28,
  onTimePct: 92,
  qualityScore: 95,
  leadTimeDays: 3,
  contactPerson: 'Grace Namukasa',
  email: 'grace@mbalesmallholders.ug',
  phone: '+256 782 987 654',
  paymentTerms: 'Net 15',
  certifications: ['Fair Trade']
},
{
  id: 'SUP-003',
  name: 'Rift Valley Logistics',
  category: 'Logistics',
  region: 'Rift Valley',
  rating: 4.2,
  spendYTD: 120000000,
  poCount: 15,
  onTimePct: 88,
  qualityScore: 90,
  leadTimeDays: 1,
  contactPerson: 'Peter Kiprono',
  email: 'peter@riftvalleylogistics.ke',
  phone: '+254 712 345 678',
  paymentTerms: 'Net 30',
  certifications: ['ISO9001']
},
{
  id: 'SUP-004',
  name: 'Nairobi Packaging Ltd',
  category: 'Packaging',
  region: 'Nairobi',
  rating: 4.9,
  spendYTD: 350000000,
  poCount: 35,
  onTimePct: 98,
  qualityScore: 99,
  leadTimeDays: 5,
  contactPerson: 'Jane Wanjiku',
  email: 'jane@nairobipackaging.ke',
  phone: '+254 722 111 222',
  paymentTerms: 'Net 45',
  certifications: ['ISO9001', 'FSC']
},
{
  id: 'SUP-005',
  name: 'East Africa Chemicals Ltd',
  category: 'Chemicals',
  region: 'Kampala',
  rating: 4.6,
  spendYTD: 180000000,
  poCount: 20,
  onTimePct: 95,
  qualityScore: 97,
  leadTimeDays: 4,
  contactPerson: 'David Ochieng',
  email: 'david@eachemicals.ug',
  phone: '+256 752 333 444',
  paymentTerms: 'Net 30',
  certifications: ['ISO14001']
},
{
  id: 'SUP-006',
  name: 'Kampala Cartons & Print',
  category: 'Packaging',
  region: 'Kampala',
  rating: 4.1,
  spendYTD: 90000000,
  poCount: 12,
  onTimePct: 85,
  qualityScore: 92,
  leadTimeDays: 7,
  contactPerson: 'Sarah Nakato',
  email: 'sarah@kampalacartons.ug',
  phone: '+256 702 555 666',
  paymentTerms: 'Net 30',
  certifications: []
},
{
  id: 'SUP-007',
  name: 'Lake Salt Traders',
  category: 'Other',
  region: 'Kampala',
  rating: 4.4,
  spendYTD: 45000000,
  poCount: 8,
  onTimePct: 90,
  qualityScore: 94,
  leadTimeDays: 3,
  contactPerson: 'John Mukasa',
  email: 'john@lakesalt.ug',
  phone: '+256 772 777 888',
  paymentTerms: 'Net 15',
  certifications: []
},
{
  id: 'SUP-008',
  name: 'Rift Citrus Co.',
  category: 'Other',
  region: 'Rift Valley',
  rating: 4.7,
  spendYTD: 60000000,
  poCount: 10,
  onTimePct: 94,
  qualityScore: 96,
  leadTimeDays: 4,
  contactPerson: 'Mary Wanjiru',
  email: 'mary@riftcitrus.ke',
  phone: '+254 712 999 000',
  paymentTerms: 'Net 30',
  certifications: ['Organic']
}];


export const mockPurchaseOrders: PurchaseOrder[] = [
{
  id: 'PO-2026-001',
  supplierId: 'SUP-001',
  itemsCount: 2,
  totalUGX: 15000000,
  status: 'Approved',
  createdAt: '2026-05-01T10:00:00Z',
  expectedDelivery: '2026-05-10T10:00:00Z',
  items: [
  {
    id: 'POI-001',
    material: 'Hass Avocados (Grade A)',
    qtyOrdered: 5000,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 2000,
    lineTotal: 10000000
  },
  {
    id: 'POI-002',
    material: 'Fuerte Avocados (Grade B)',
    qtyOrdered: 3000,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 1666.67,
    lineTotal: 5000000
  }]

},
{
  id: 'PO-2026-002',
  supplierId: 'SUP-004',
  itemsCount: 1,
  totalUGX: 8500000,
  status: 'Sent',
  createdAt: '2026-05-02T11:30:00Z',
  expectedDelivery: '2026-05-12T11:30:00Z',
  items: [
  {
    id: 'POI-003',
    material: 'Glass Bottles 500ml',
    qtyOrdered: 10000,
    qtyReceived: 0,
    unit: 'units',
    unitPrice: 850,
    lineTotal: 8500000
  }]

},
{
  id: 'PO-2026-003',
  supplierId: 'SUP-002',
  itemsCount: 1,
  totalUGX: 12000000,
  status: 'Awaiting Approval',
  createdAt: '2026-05-05T09:15:00Z',
  expectedDelivery: '2026-05-15T09:15:00Z',
  items: [
  {
    id: 'POI-004',
    material: 'Hass Avocados (Grade A)',
    qtyOrdered: 6000,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 2000,
    lineTotal: 12000000
  }]

},
{
  id: 'PO-2026-004',
  supplierId: 'SUP-005',
  itemsCount: 3,
  totalUGX: 4200000,
  status: 'Draft',
  createdAt: '2026-05-07T14:45:00Z',
  expectedDelivery: '2026-05-20T14:45:00Z',
  items: [
  {
    id: 'POI-005',
    material: 'Hexane Solvent',
    qtyOrdered: 500,
    qtyReceived: 0,
    unit: 'L',
    unitPrice: 5000,
    lineTotal: 2500000
  },
  {
    id: 'POI-006',
    material: 'Citric Acid',
    qtyOrdered: 100,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 12000,
    lineTotal: 1200000
  },
  {
    id: 'POI-007',
    material: 'Sodium Hydroxide',
    qtyOrdered: 50,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 10000,
    lineTotal: 500000
  }]

},
{
  id: 'PO-2026-005',
  supplierId: 'SUP-001',
  itemsCount: 1,
  totalUGX: 20000000,
  status: 'Fully Received',
  createdAt: '2026-04-20T08:00:00Z',
  expectedDelivery: '2026-04-25T08:00:00Z',
  items: [
  {
    id: 'POI-008',
    material: 'Hass Avocados (Grade A)',
    qtyOrdered: 10000,
    qtyReceived: 10000,
    unit: 'kg',
    unitPrice: 2000,
    lineTotal: 20000000
  }]

},
{
  id: 'PO-2026-006',
  supplierId: 'SUP-006',
  itemsCount: 2,
  totalUGX: 3500000,
  status: 'Partially Received',
  createdAt: '2026-04-28T13:20:00Z',
  expectedDelivery: '2026-05-05T13:20:00Z',
  items: [
  {
    id: 'POI-009',
    material: 'Cardboard Boxes (Medium)',
    qtyOrdered: 2000,
    qtyReceived: 1000,
    unit: 'units',
    unitPrice: 1000,
    lineTotal: 2000000
  },
  {
    id: 'POI-010',
    material: 'Packing Tape',
    qtyOrdered: 500,
    qtyReceived: 500,
    unit: 'rolls',
    unitPrice: 3000,
    lineTotal: 1500000
  }]

},
{
  id: 'PO-2026-007',
  supplierId: 'SUP-003',
  itemsCount: 1,
  totalUGX: 1500000,
  status: 'Closed',
  createdAt: '2026-04-15T09:00:00Z',
  expectedDelivery: '2026-04-18T09:00:00Z',
  items: [
  {
    id: 'POI-011',
    material: 'Transport Services (Jinja to Kampala)',
    qtyOrdered: 1,
    qtyReceived: 1,
    unit: 'trip',
    unitPrice: 1500000,
    lineTotal: 1500000
  }]

},
{
  id: 'PO-2026-008',
  supplierId: 'SUP-007',
  itemsCount: 1,
  totalUGX: 800000,
  status: 'Cancelled',
  createdAt: '2026-04-10T11:00:00Z',
  expectedDelivery: '2026-04-15T11:00:00Z',
  items: [
  {
    id: 'POI-012',
    material: 'Industrial Salt',
    qtyOrdered: 1000,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 800,
    lineTotal: 800000
  }]

},
{
  id: 'PO-2026-009',
  supplierId: 'SUP-008',
  itemsCount: 1,
  totalUGX: 2500000,
  status: 'Approved',
  createdAt: '2026-05-06T10:30:00Z',
  expectedDelivery: '2026-05-16T10:30:00Z',
  items: [
  {
    id: 'POI-013',
    material: 'Lemon Extract',
    qtyOrdered: 50,
    qtyReceived: 0,
    unit: 'L',
    unitPrice: 50000,
    lineTotal: 2500000
  }]

},
{
  id: 'PO-2026-010',
  supplierId: 'SUP-004',
  itemsCount: 2,
  totalUGX: 12500000,
  status: 'Awaiting Approval',
  createdAt: '2026-05-08T08:45:00Z',
  expectedDelivery: '2026-05-25T08:45:00Z',
  items: [
  {
    id: 'POI-014',
    material: 'Glass Bottles 1L',
    qtyOrdered: 5000,
    qtyReceived: 0,
    unit: 'units',
    unitPrice: 1500,
    lineTotal: 7500000
  },
  {
    id: 'POI-015',
    material: 'Bottle Caps',
    qtyOrdered: 10000,
    qtyReceived: 0,
    unit: 'units',
    unitPrice: 500,
    lineTotal: 5000000
  }]

},
{
  id: 'PO-2026-011',
  supplierId: 'SUP-001',
  itemsCount: 1,
  totalUGX: 18000000,
  status: 'Draft',
  createdAt: '2026-05-08T14:00:00Z',
  expectedDelivery: '2026-05-18T14:00:00Z',
  items: [
  {
    id: 'POI-016',
    material: 'Hass Avocados (Grade A)',
    qtyOrdered: 9000,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 2000,
    lineTotal: 18000000
  }]

},
{
  id: 'PO-2026-012',
  supplierId: 'SUP-002',
  itemsCount: 1,
  totalUGX: 9600000,
  status: 'Sent',
  createdAt: '2026-05-04T09:30:00Z',
  expectedDelivery: '2026-05-14T09:30:00Z',
  items: [
  {
    id: 'POI-017',
    material: 'Hass Avocados (Grade A)',
    qtyOrdered: 4800,
    qtyReceived: 0,
    unit: 'kg',
    unitPrice: 2000,
    lineTotal: 9600000
  }]

},
{
  id: 'PO-2026-013',
  supplierId: 'SUP-005',
  itemsCount: 1,
  totalUGX: 6000000,
  status: 'Approved',
  createdAt: '2026-05-07T11:15:00Z',
  expectedDelivery: '2026-05-17T11:15:00Z',
  items: [
  {
    id: 'POI-018',
    material: 'Hexane Solvent',
    qtyOrdered: 1200,
    qtyReceived: 0,
    unit: 'L',
    unitPrice: 5000,
    lineTotal: 6000000
  }]

},
{
  id: 'PO-2026-014',
  supplierId: 'SUP-006',
  itemsCount: 1,
  totalUGX: 4500000,
  status: 'Awaiting Approval',
  createdAt: '2026-05-08T15:30:00Z',
  expectedDelivery: '2026-05-22T15:30:00Z',
  items: [
  {
    id: 'POI-019',
    material: 'Cardboard Boxes (Large)',
    qtyOrdered: 3000,
    qtyReceived: 0,
    unit: 'units',
    unitPrice: 1500,
    lineTotal: 4500000
  }]

}];


export const mockRFQs: RFQ[] = [
{
  id: 'RFQ-2026-001',
  title: 'Q3 Packaging Materials Supply',
  itemsCount: 4,
  suppliersInvited: 3,
  status: 'Comparing',
  closingDate: '2026-05-10T17:00:00Z',
  responses: [
  {
    supplierId: 'SUP-004',
    items: [
    { material: 'Glass Bottles 500ml', unitPrice: 820, leadTimeDays: 5 },
    { material: 'Glass Bottles 1L', unitPrice: 1450, leadTimeDays: 5 },
    { material: 'Bottle Caps', unitPrice: 480, leadTimeDays: 3 },
    { material: 'Labels', unitPrice: 150, leadTimeDays: 4 }]

  },
  {
    supplierId: 'SUP-006',
    items: [
    { material: 'Glass Bottles 500ml', unitPrice: 850, leadTimeDays: 7 },
    { material: 'Glass Bottles 1L', unitPrice: 1500, leadTimeDays: 7 },
    { material: 'Bottle Caps', unitPrice: 500, leadTimeDays: 5 },
    { material: 'Labels', unitPrice: 140, leadTimeDays: 5 }]

  }]

},
{
  id: 'RFQ-2026-002',
  title: 'Annual Logistics Contract',
  itemsCount: 1,
  suppliersInvited: 4,
  status: 'Receiving Quotes',
  closingDate: '2026-05-15T17:00:00Z',
  responses: [
  {
    supplierId: 'SUP-003',
    items: [
    {
      material: 'Transport Services (Jinja to Kampala)',
      unitPrice: 1450000,
      leadTimeDays: 1
    }]

  }]

},
{
  id: 'RFQ-2026-003',
  title: 'Bulk Hexane Solvent',
  itemsCount: 1,
  suppliersInvited: 2,
  status: 'Sent',
  closingDate: '2026-05-20T17:00:00Z',
  responses: []
},
{
  id: 'RFQ-2026-004',
  title: 'Organic Fertilizer Supply',
  itemsCount: 2,
  suppliersInvited: 3,
  status: 'Draft',
  closingDate: '2026-05-25T17:00:00Z',
  responses: []
}];


export const mockGRNs: GRN[] = [
{
  id: 'GRN-2026-001',
  poId: 'PO-2026-005',
  supplierId: 'SUP-001',
  receivedDate: '2026-04-25T09:30:00Z',
  receiver: 'John Doe',
  itemsCount: 1,
  status: 'Accepted'
},
{
  id: 'GRN-2026-002',
  poId: 'PO-2026-006',
  supplierId: 'SUP-006',
  receivedDate: '2026-05-05T14:15:00Z',
  receiver: 'Jane Smith',
  itemsCount: 2,
  status: 'Partially Accepted'
},
{
  id: 'GRN-2026-003',
  poId: 'PO-2026-007',
  supplierId: 'SUP-003',
  receivedDate: '2026-04-18T11:00:00Z',
  receiver: 'Peter Jones',
  itemsCount: 1,
  status: 'Accepted'
},
{
  id: 'GRN-2026-004',
  poId: 'PO-2026-001',
  supplierId: 'SUP-001',
  receivedDate: '2026-05-08T08:45:00Z',
  receiver: 'Mary Williams',
  itemsCount: 2,
  status: 'Pending QC'
},
{
  id: 'GRN-2026-005',
  poId: 'PO-2026-002',
  supplierId: 'SUP-004',
  receivedDate: '2026-05-08T16:20:00Z',
  receiver: 'David Brown',
  itemsCount: 1,
  status: 'Pending QC'
}];


export const mockForecast: MaterialForecast[] = [
{
  id: 'MF-001',
  material: 'Hass Avocados (Grade A)',
  currentStock: 15000,
  unit: 'kg',
  forecastConsumption30d: 45000,
  projectedShortfallDate: '2026-05-18',
  recommendedOrderQty: 35000
},
{
  id: 'MF-002',
  material: 'Glass Bottles 500ml',
  currentStock: 25000,
  unit: 'units',
  forecastConsumption30d: 60000,
  projectedShortfallDate: '2026-05-20',
  recommendedOrderQty: 40000
},
{
  id: 'MF-003',
  material: 'Hexane Solvent',
  currentStock: 800,
  unit: 'L',
  forecastConsumption30d: 2000,
  projectedShortfallDate: '2026-05-25',
  recommendedOrderQty: 1500
},
{
  id: 'MF-004',
  material: 'Cardboard Boxes (Medium)',
  currentStock: 5000,
  unit: 'units',
  forecastConsumption30d: 12000,
  projectedShortfallDate: '2026-05-22',
  recommendedOrderQty: 8000
},
{
  id: 'MF-005',
  material: 'Bottle Caps',
  currentStock: 40000,
  unit: 'units',
  forecastConsumption30d: 80000,
  projectedShortfallDate: '2026-05-28',
  recommendedOrderQty: 50000
},
{
  id: 'MF-006',
  material: 'Citric Acid',
  currentStock: 300,
  unit: 'kg',
  forecastConsumption30d: 500,
  projectedShortfallDate: '2026-06-05',
  recommendedOrderQty: 300
},
{
  id: 'MF-007',
  material: 'Packing Tape',
  currentStock: 1200,
  unit: 'rolls',
  forecastConsumption30d: 2500,
  projectedShortfallDate: '2026-05-26',
  recommendedOrderQty: 1500
},
{
  id: 'MF-008',
  material: 'Fuerte Avocados (Grade B)',
  currentStock: 8000,
  unit: 'kg',
  forecastConsumption30d: 20000,
  projectedShortfallDate: '2026-05-21',
  recommendedOrderQty: 15000
}];