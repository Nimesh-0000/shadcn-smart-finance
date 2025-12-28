import {
    LayoutDashboard,
    Receipt,
    Wallet,
    PieChart,
    Settings,
    HelpCircle,
    TrendingUp,
    Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true, color: '#4285F4' }, // Blue
    { icon: Receipt, label: 'Transactions', color: '#EA4335' }, // Red
    { icon: Wallet, label: 'Budgets', color: '#34A853' }, // Green
    { icon: PieChart, label: 'Insights', color: '#FBBC05' }, // Yellow
    { icon: TrendingUp, label: 'Predictions', color: '#A142F4' }, // Purple
];

const secondaryItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Support' },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    return (
        <aside
            className={cn(
                "absolute top-0 left-0 flex flex-col bg-sidebar border-r border-sidebar-border h-full transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[width,transform,box-shadow] z-50",
                isOpen ? "w-56 shadow-[0_8px_10px_-5px_rgba(0,0,0,0.2),0_16px_24px_2px_rgba(0,0,0,0.14),0_6px_30px_5px_rgba(0,0,0,0.12)]" : "w-10 shadow-none"
            )}
        >
            {/* Logo Section - GCP Console Style with Hamburger */}
            <div className={cn("h-10 flex items-center border-b border-sidebar-border overflow-hidden shrink-0 transition-all duration-300", isOpen ? "px-[12px]" : "px-0 justify-center")}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="h-9 w-9 text-[#5f6368] hover:bg-muted"
                >
                    <Menu className="h-5 w-5" />
                </Button>
                {isOpen && (
                    <span className="font-medium text-[13px] text-[#3c4043] whitespace-nowrap tracking-tight ml-2 animate-in fade-in duration-300">
                        Smart Finance
                    </span>
                )}
            </div>

            {/* Main Nav */}
            <nav className="flex-1 py-4 space-y-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            "gcp-sidebar-item w-full group/item flex items-center h-10 transition-all duration-300",
                            item.active && "active",
                            isOpen ? "px-[18px]" : "px-0 justify-center"
                        )}
                    >
                        <div
                            className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200"
                            style={{ backgroundColor: `${item.color}15`, color: item.color }}
                        >
                            <item.icon
                                className="h-3.5 w-3.5 transition-colors duration-200"
                                style={{ color: item.color }}
                            />
                        </div>
                        {isOpen && <span className="text-[13px] font-medium ml-3 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Bottom Nav */}
            <div className="py-2 border-t border-sidebar-border space-y-0.5 shrink-0">
                {secondaryItems.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            "gcp-sidebar-item w-full flex items-center h-10 transition-all duration-300 opacity-70 hover:opacity-100",
                            isOpen ? "px-[18px]" : "px-0 justify-center"
                        )}
                    >
                        <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                            <item.icon className="h-3.5 w-3.5 text-[#5f6368]" />
                        </div>
                        {isOpen && <span className="text-[13px] font-medium ml-3 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
                    </button>
                ))}
            </div>

        </aside>
    );
}
