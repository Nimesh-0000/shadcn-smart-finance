import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import GradientBlinds from '@/components/GradientBlinds';
import { useTheme } from '@/hooks/useTheme';
import { FeatureCard } from './FeatureCard';
import { useState } from 'react';

interface LandingPageProps {
    onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
    const { theme, setTheme } = useTheme();
    const heroRef = useRef<HTMLElement>(null);

    const [prefersReducedMotion] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
    );

    const [isMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTheme('dark');
                } else {
                    setTheme('light');
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of hero is visible
            }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, [setTheme]);

    const lightColors = ['#e0f2fe', '#f0fdf4', '#fafafa', '#ffffff'];
    const darkColors = ['#001428', '#003264', '#00bd78', '#020617'];
    const currentColors = theme === 'dark' ? darkColors : lightColors;

    return (
        <div className="min-h-screen bg-background relative">

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full min-h-[75vh] flex items-center"
                data-scroll-section
            >
                {/* Dynamic Background Restricted to Hero with Seamless Fade */}
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-100">
                    <GradientBlinds
                        gradientColors={currentColors}
                        angle={20}
                        noise={0.15}
                        blindCount={isMobile ? 8 : 16}
                        blindMinWidth={60}
                        mouseDampening={0.15}
                        distortAmount={5}
                        paused={prefersReducedMotion}
                        spotlightOpacity={theme === 'dark' ? 0.6 : 0.4}
                        mixBlendMode={theme === 'dark' ? 'screen' : 'multiply'}
                    />
                    {/* Seamless Fade Mask */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                </div>

                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center space-y-8" data-scroll data-scroll-speed="1">
                        <Badge className="bg-white/5 border-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Welcome to the Future of Finance
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            Master Your <span className="bg-gradient-to-r from-emerald-400 via-white to-emerald-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Wealth</span> with Precision.
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            Smart Finance is the all-in-one platform for tracking expenses, managing budgets, and gaining deep insights into your financial health.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <Button size="lg" className="h-12 px-8 text-base font-semibold rounded-full group" onClick={onGetStarted}>
                                Get Started Free
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                                View Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative container mx-auto px-4 py-24 border-t border-white/5" data-scroll-section>
                {/* Ambient Glows for Features - Updated for Royal Mint */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] -z-10" />

                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold">Everything you need to <span className="text-primary">thrive</span>.</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Powerful features designed to give you complete control over your money, without the complexity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="h-7 w-7 text-amber-400" />}
                        title="Instant Tracking"
                        description="Log your income and expenses in seconds. Category-based tagging keeps everything organized."
                        glowColor="#f59e0b"
                        delay="0"
                    />
                    <FeatureCard
                        icon={<BarChart3 className="h-7 w-7 text-blue-400" />}
                        title="Visual Insights"
                        description="Beautifully crafted charts and analytics help you visualize where your money goes every month."
                        glowColor="#3b82f6"
                        delay="150"
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="h-7 w-7 text-emerald-400" />}
                        title="Secure & Private"
                        description="Your data is stored locally on your device. We never see your financial information."
                        glowColor="#10b981"
                        delay="300"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative container mx-auto px-4 py-24" data-scroll-section>
                {/* Ambient Glow for CTA Section - Updated for Royal Mint */}
                <div className="absolute inset-0 bg-blue-600/[0.02] rounded-[4rem] blur-[100px] -z-10 mx-4" />

                <div className="relative rounded-[3rem] overflow-hidden bg-primary/5 border border-primary/20 p-8 md:p-16 text-center space-y-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-chart-4/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                    <h2 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
                        Ready to revolutionize your finances?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of users who are already building a better financial future with Smart Finance.
                    </p>
                    <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full shadow-lg shadow-primary/20" onClick={onGetStarted}>
                        Get Started Now
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-12 border-t border-white/5 text-center text-muted-foreground" data-scroll-section>
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl">💰</span>
                    <span className="font-bold whitespace-nowrap text-foreground">Smart Finance</span>
                </div>
                <p>© 2025 Smart Finance Inc. All rights reserved.</p>
            </footer>
        </div>
    );
}
