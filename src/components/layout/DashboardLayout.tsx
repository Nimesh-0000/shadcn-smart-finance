import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F8F9FA] dark:bg-[#0F1115] overflow-hidden relative">
            {/* Backdrop for Sidebar Drawer - Refined Transition */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/20 backdrop-blur-[1px] z-30 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                    sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar - GCP Style */}
            <div className="w-10 shrink-0 border-r border-sidebar-border h-full z-40">
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
                {/* Top Nav - Apple Style */}
                <TopNav />

                {/* Content Container */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
                    <div className="max-w-[1600px] w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
