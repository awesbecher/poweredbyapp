
import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import TopNav from '@/components/layout/TopNav';
import HeroHeader from '@/components/dashboard/HeroHeader';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import AgentDashboard from '@/components/dashboard/AgentDashboard';

const Dashboard: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <TopNav />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-grow px-4 pb-24">
            <div className="max-w-7xl mx-auto">
              <HeroHeader 
                title="Pick your AI Agent" 
                subtitle="Configure once, automate forever."
              />
              
              <AgentDashboard />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
