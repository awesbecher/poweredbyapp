
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const EmailAgent: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-16">
        <Header 
          showBackButton={true}
          title="Email Agent"
        />
        <main className="container-custom py-6">
          {/* Content will be added later */}
        </main>
      </div>
    </div>
  );
};

export default EmailAgent;
