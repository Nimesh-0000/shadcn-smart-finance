import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-[#F8F9FA] dark:bg-[#0F1115] overflow-hidden">
            {/* Sidebar - GCP Style */}
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
                {/* Top Nav - Apple Style */}
                <TopNav />

                {/* Content Container */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
