import { useState } from 'react';
import { Dashboard } from '@/components/layout/Dashboard';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { LandingPage } from '@/components/layout/LandingPage';

export function App() {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <SmoothScroll>
            {showDashboard ? (
                <Dashboard />
            ) : (
                <LandingPage onGetStarted={() => setShowDashboard(true)} />
            )}
        </SmoothScroll>
    );
}

export default App;