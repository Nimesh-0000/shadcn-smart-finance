import type { FinancialSummary, ArAging, Risk, Invoice, Customer, RevenueTrendData } from "@/types";

const BASE_URL = 'http://localhost:8080/api';

// Basic Auth for local development (matching Spring Security Config)
const AUTH_HEADER = 'Basic ' + btoa('admin:password');

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Authorization': AUTH_HEADER,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

export const api = {
    dashboard: {
        getKpis: (startDate?: string, endDate?: string): Promise<FinancialSummary> => {
            let url = '/dashboard/kpis';
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);
            if (params.toString()) url += `?${params.toString()}`;
            return fetchWithAuth(url);
        },
        getArAging: (): Promise<ArAging> => fetchWithAuth('/dashboard/ar-aging'),
        getRisks: (): Promise<Risk[]> => fetchWithAuth('/dashboard/risks'),
        getRevenueTrend: (): Promise<RevenueTrendData[]> => fetchWithAuth('/dashboard/revenue-trend'),
        getTopRevenueCustomers: (): Promise<Customer[]> => fetchWithAuth('/dashboard/customers/top-revenue'),
        getTopOutstandingCustomers: (): Promise<Customer[]> => fetchWithAuth('/dashboard/customers/top-outstanding'),
    },
    customers: {
        getTop: (): Promise<Customer[]> => fetchWithAuth('/customers'),
    },
    invoices: {
        getOpen: (): Promise<Invoice[]> => fetchWithAuth('/invoices/open'),
        getOverdue: (): Promise<Invoice[]> => fetchWithAuth('/invoices/overdue'),
        getByCustomer: (accountId: string): Promise<Invoice[]> => fetchWithAuth(`/invoices/customer/${accountId}`),
        reassignOwner: (id: string, newOwnerId: string, performedBy: string): Promise<Invoice> =>
            fetchWithAuth(`/invoices/${id}/owner?newOwnerId=${newOwnerId}&performedBy=${performedBy}`, {
                method: 'PUT'
            }),
    },
};
