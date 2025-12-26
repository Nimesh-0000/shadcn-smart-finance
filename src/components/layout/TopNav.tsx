import { Search, Bell, Sun, Moon, ChevronRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';



export function TopNav() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-10 border-b border-border bg-background sticky top-0 z-30 flex items-center transition-all duration-300">
            <div className="flex-1 flex items-center justify-between px-4">
                <div className="flex items-center gap-4 flex-1">
                    {/* Logo Area */}
                    <div className="hidden md:flex items-center gap-2 pr-4 border-r border-border h-8">
                        <span className="font-medium text-[#5f6368] text-[13px]">Smart Finance</span>
                    </div>

                    {/* Project Selector Mockup */}
                    <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded hover:bg-muted cursor-pointer transition-colors max-w-[200px] h-8">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-[13px] font-medium text-[#3c4043] truncate">Smart-Finance-Production</span>
                        <ChevronRight className="h-3 w-3 text-[#5f6368] rotate-90" />
                    </div>

                    {/* Search Bar - Flat Design */}
                    <div className="hidden md:flex items-center relative w-full max-w-lg ml-4">
                        <div className="flex items-center w-full bg-[#f1f3f4] dark:bg-[#202124] border-transparent focus-within:bg-background focus-within:shadow-md focus-within:border-transparent rounded-lg transition-all h-8 px-3 group">
                            <Search className="h-4 w-4 text-[#5f6368] mr-2" />
                            <input
                                placeholder="Search resources, docs, and products"
                                className="bg-transparent border-none outline-none text-[13px] text-[#3c4043] dark:text-foreground w-full placeholder:text-[#5f6368]"
                            />
                            <div className="flex items-center gap-1 text-[10px] text-[#5f6368] bg-background border border-border px-1 py-0.5 rounded ml-2">
                                <span>/</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full h-10 w-10 text-[#5f6368] hover:bg-muted"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10 text-[#5f6368] hover:bg-muted relative"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                    </Button>

                    {/* Profile */}
                    <div className="flex items-center gap-2 ml-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-8 w-8 bg-blue-600 text-white hover:bg-blue-700 p-0 text-[12px] font-bold"
                        >
                            NL
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
