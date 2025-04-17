
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { toast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell } from 'recharts';
import { EmailLog } from "@/types";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  color?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, description, color }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={color ? { color } : {}}>
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

interface EmailAnalyticsProps {
  agentId?: string;
}

const EmailAnalytics: React.FC<EmailAnalyticsProps> = ({ agentId }) => {
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  
  // Metrics states
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalReplied, setTotalReplied] = useState(0);
  const [autoReplyRate, setAutoReplyRate] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState("0h 0m");
  const [rejectionRate, setRejectionRate] = useState(0);

  const COLORS = ['#4ade80', '#f59e0b', '#ef4444', '#a3a3a3'];
  const STATUS_COLORS = {
    replied: '#4ade80',
    awaiting_approval: '#f59e0b',
    rejected: '#ef4444',
    received: '#a3a3a3'
  };

  useEffect(() => {
    // In a real implementation, this would fetch data from Supabase
    setLoading(true);
    
    // Mock data for demonstration
    setTimeout(() => {
      const mockEmails: EmailLog[] = [
        {
          id: '1', agent_id: agentId || '', gmail_message_id: 'msg1', 
          from_address: 'client1@example.com', subject: 'Service inquiry',
          raw_body: 'Hello, do you offer consulting?',
          ai_reply: 'Yes, we do offer consulting services starting at $500/month.',
          status: 'awaiting_approval',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
        },
        {
          id: '2', agent_id: agentId || '', gmail_message_id: 'msg2',
          from_address: 'client2@example.com', subject: 'Pricing question',
          raw_body: 'What are your rates?',
          ai_reply: 'Our rates start at $150/hour for standard consulting.',
          status: 'replied',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
        },
        {
          id: '3', agent_id: agentId || '', gmail_message_id: 'msg3',
          from_address: 'client3@example.com', subject: 'Follow-up',
          raw_body: 'When can we meet?',
          ai_reply: 'I have availability next Tuesday at 2pm.',
          status: 'rejected',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
        },
        {
          id: '4', agent_id: agentId || '', gmail_message_id: 'msg4',
          from_address: 'client4@example.com', subject: 'Urgent request',
          raw_body: 'Need help ASAP!',
          ai_reply: 'I can help you immediately. What do you need?',
          status: 'replied',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days ago
        },
        {
          id: '5', agent_id: agentId || '', gmail_message_id: 'msg5',
          from_address: 'client5@example.com', subject: 'Partnership opportunity',
          raw_body: 'Would like to discuss partnership.',
          ai_reply: 'We would be interested in discussing this partnership.',
          status: 'replied',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() // 10 days ago
        }
      ];
      
      setEmails(mockEmails);
      calculateMetrics(mockEmails);
      generateChartData(mockEmails);
      setLoading(false);
    }, 1500);
  }, [agentId]);

  const calculateMetrics = (emails: EmailLog[]) => {
    // Total emails received
    setTotalReceived(emails.length);
    
    // Total replies sent
    const replied = emails.filter(e => e.status === 'replied').length;
    setTotalReplied(replied);
    
    // Auto-reply rate (for mock, assuming 70% auto-replied)
    setAutoReplyRate(70);
    
    // Average response time (mock for now)
    setAvgResponseTime('1h 24m');
    
    // Rejection rate
    const rejected = emails.filter(e => e.status === 'rejected').length;
    setRejectionRate(Math.round((rejected / emails.length) * 100));
  };

  const generateChartData = (emails: EmailLog[]) => {
    // Generate last 14 days for x-axis
    const last14Days = Array.from({length: 14}, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();
    
    // Create daily data with random counts for each day
    const dailyVolumeData = last14Days.map(date => {
      // Find emails for this date
      const dayEmails = emails.filter(e => 
        e.created_at.split('T')[0] === date
      );
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: dayEmails.length || Math.floor(Math.random() * 5) // Use actual or random count
      };
    });
    
    setDailyData(dailyVolumeData);
    
    // Create status data for pie chart
    const statusCounts = {
      replied: emails.filter(e => e.status === 'replied').length,
      awaiting: emails.filter(e => e.status === 'awaiting_approval').length,
      rejected: emails.filter(e => e.status === 'rejected').length,
      received: emails.filter(e => e.status === 'received').length
    };
    
    const statusChartData = [
      { name: 'Replied', value: statusCounts.replied },
      { name: 'Awaiting Approval', value: statusCounts.awaiting },
      { name: 'Rejected', value: statusCounts.rejected },
      { name: 'Received', value: statusCounts.received }
    ];
    
    setStatusData(statusChartData);
  };

  const refreshData = () => {
    toast({
      title: "Refreshing analytics",
      description: "Fetching latest data..."
    });
    setLoading(true);
    // In a real app, this would fetch from Supabase again
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Analytics refreshed",
        description: "Data is up to date"
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl">
                Agent Performance Analytics
              </CardTitle>
              <CardDescription>
                Monitor your email agent's performance and activity over time
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Top metrics */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mb-8">
                <AnalyticsCard 
                  title="Total Emails Received" 
                  value={totalReceived} 
                />
                <AnalyticsCard 
                  title="Replies Sent" 
                  value={totalReplied} 
                  description={`${Math.round((totalReplied / totalReceived) * 100)}% response rate`}
                />
                <AnalyticsCard 
                  title="Auto-Reply Rate" 
                  value={`${autoReplyRate}%`} 
                  description="Replies sent without edits"
                  color="#4ade80"
                />
                <AnalyticsCard 
                  title="Avg. Response Time" 
                  value={avgResponseTime} 
                  description="From received to replied"
                />
                <AnalyticsCard 
                  title="Rejection Rate" 
                  value={`${rejectionRate}%`} 
                  description="Draft replies rejected"
                  color={rejectionRate > 25 ? "#ef4444" : "#f59e0b"}
                />
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Email Volume</CardTitle>
                    <CardDescription>Last 14 days</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ChartContainer className="h-80" config={{}}>
                      <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={(props) => (
                          <div className="bg-background border rounded-md p-2 text-sm shadow-lg">
                            {props.payload?.[0] && (
                              <>
                                <div className="font-medium">{props.payload[0].payload.date}</div>
                                <div>Emails: {props.payload[0].value}</div>
                              </>
                            )}
                          </div>
                        )} />
                        <Bar dataKey="count" fill="#60a5fa" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Status Distribution</CardTitle>
                    <CardDescription>All time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ChartContainer className="h-80" config={{}}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={(props) => (
                          <div className="bg-background border rounded-md p-2 text-sm shadow-lg">
                            {props.payload?.[0] && (
                              <>
                                <div className="font-medium">{props.payload[0].name}</div>
                                <div>Count: {props.payload[0].value}</div>
                              </>
                            )}
                          </div>
                        )} />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailAnalytics;
