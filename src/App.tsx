import { useState } from 'react';
import { Dashboard } from '@/components/layout/Dashboard';
import { LandingPage } from '@/components/layout/LandingPage';

export function App() {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <>
            {showDashboard ? (
                <Dashboard />
            ) : (
                <LandingPage onGetStarted={() => setShowDashboard(true)} />
            )}
        </>
    );
}

export default App;