import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    glowColor: string;
    delay: string;
}

export function FeatureCard({
    icon,
    title,
    description,
    glowColor,
    delay
}: FeatureCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="glass-card border-white/10 hover:border-primary/50 group cursor-default h-full animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
            style={{
                animationDelay: `${delay}ms`,
                ['--glow-color' as any]: glowColor
            } as React.CSSProperties}
        >
            <CardContent className="p-10 space-y-6 relative z-10">
                <div
                    className="premium-glow h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/10"
                    style={{ ['--glow-color' as any]: glowColor } as React.CSSProperties}
                >
                    {icon}
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                        {description}
                    </p>
                </div>

                {/* Subtle Decorative element */}
                <div className="pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
            </CardContent>

            {/* Background pattern */}
            <div className="absolute top-0 right-0 -z-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </Card>
    );
}
