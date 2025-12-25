import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-3xl animate-bounce-slow">💰</div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary via-chart-4 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                                Smart Finance
                            </h1>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest opacity-70">Elevate Your Capital</p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}
