export type TransactionType = 'income' | 'expense';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO date string
  type: TransactionType;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: 'monthly' | 'weekly';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FilterOptions {
  category?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
}

// Finance CRM Types
export type InvoiceStatus = 'PAID' | 'OPEN' | 'OVERDUE' | 'PARTIALLY_PAID';

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  owner: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  region: string; // Added as per blueprint Step 2
  totalRevenue: number;
  outstandingBalance: number;
  lastActivity: string;
  status: 'Active' | 'Inactive' | 'At Risk';
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
}

export interface AuditLog {
  id: string;
  entityType: 'Invoice' | 'Customer' | 'Payment';
  entityId: string;
  action: string;
  timestamp: string;
  userId: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  cashBalance: number;
  accountsReceivable: number;
  overdueAmount: number;
  revenueGrowth: number;
  overduePercentage: number;
}

export interface ArAging {
  current0_30: number;
  overdue31_60: number;
  overdue61_90: number;
  overdue90Plus: number;
}

export interface Risk {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  type: string;
}

export interface RevenueTrendData {
  month: string;
  revenue: number;
}
