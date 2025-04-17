
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { EmailLog } from "@/lib/types";

interface EmailAnalyticsProps {
  agentId?: string;
}

const EmailAnalytics: React.FC<EmailAnalyticsProps> = ({ agentId }) => {
  const [loading, setLoading] = useState(true);
  const [emailMetrics, setEmailMetrics] = useState<any>(null);
  const [volumeData, setVolumeData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [ratingData, setRatingData] = useState<any[]>([]);

  useEffect(() => {
    // This would be replaced with actual Supabase queries once integrated
    const fetchAnalyticsData = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Mock email logs for analytics
        const mockEmailLogs: EmailLog[] = [
          // ... imagine 30-50 sample email logs with various dates, statuses, and ratings
        ];
        
        // Calculate metrics
        const metrics = {
          totalReceived: 48,
          totalReplied: 32,
          autoRepliedPercentage: 75, // 75% auto-replied
          averageResponseTime: '1.2 hours',
          rejectionRate: 15, // 15%
          averageSatisfaction: 4.2 // Average rating out of 5
        };
        
        // Generate volume data for the last 14 days
        const volumeData = [
          { date: '04/04', received: 2, awaiting: 0, replied: 2, rejected: 0 },
          { date: '04/05', received: 4, awaiting: 1, replied: 3, rejected: 0 },
          { date: '04/06', received: 3, awaiting: 0, replied: 2, rejected: 1 },
          { date: '04/07', received: 1, awaiting: 0, replied: 1, rejected: 0 },
          { date: '04/08', received: 5, awaiting: 1, replied: 3, rejected: 1 },
          { date: '04/09', received: 2, awaiting: 0, replied: 2, rejected: 0 },
          { date: '04/10', received: 4, awaiting: 1, replied: 3, rejected: 0 },
          { date: '04/11', received: 6, awaiting: 2, replied: 3, rejected: 1 },
          { date: '04/12', received: 3, awaiting: 0, replied: 3, rejected: 0 },
          { date: '04/13', received: 5, awaiting: 1, replied: 4, rejected: 0 },
          { date: '04/14', received: 2, awaiting: 0, replied: 1, rejected: 1 },
          { date: '04/15', received: 4, awaiting: 1, replied: 2, rejected: 1 },
          { date: '04/16', received: 3, awaiting: 0, replied: 3, rejected: 0 },
          { date: '04/17', received: 4, awaiting: 2, replied: 0, rejected: 2 },
        ];
        
        // Status distribution
        const statusData = [
          { name: 'Replied', value: 32 },
          { name: 'Awaiting Approval', value: 9 },
          { name: 'Rejected', value: 7 }
        ];
        
        // Rating distribution
        const ratingData = [
          { name: '5 Stars', value: 18 },
          { name: '4 Stars', value: 8 },
          { name: '3 Stars', value: 4 },
          { name: '2 Stars', value: 1 },
          { name: '1 Star', value: 1 },
        ];
        
        setEmailMetrics(metrics);
        setVolumeData(volumeData);
        setStatusData(statusData);
        setRatingData(ratingData);
        setLoading(false);
      }, 1500);
    };
    
    fetchAnalyticsData();
  }, [agentId]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const STATUS_COLORS = ['#4ade80', '#f97316', '#ef4444'];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-20 bg-gray-100"></CardHeader>
              <CardContent className="h-10 bg-gray-50"></CardContent>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse">
          <CardHeader className="h-10 bg-gray-100"></CardHeader>
          <CardContent className="h-80 bg-gray-50"></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Emails"
          value={emailMetrics.totalReceived}
          description="Total emails received"
        />
        <MetricCard
          title="Replied"
          value={emailMetrics.totalReplied}
          description={`${emailMetrics.autoRepliedPercentage}% auto-approved`}
        />
        <MetricCard
          title="Avg. Response Time"
          value={emailMetrics.averageResponseTime}
          description="From received to replied"
        />
        <MetricCard
          title="Rejection Rate"
          value={`${emailMetrics.rejectionRate}%`}
          description="Drafts rejected"
        />
        <MetricCard
          title="Average Satisfaction"
          value={emailMetrics.averageSatisfaction}
          description="Out of 5 stars"
          showStars={true}
          rating={emailMetrics.averageSatisfaction}
        />
        <MetricCard
          title="Feedback Received"
          value={`${ratingData.reduce((sum: number, item: any) => sum + item.value, 0)}`}
          description="User ratings submitted"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Email Volume (Last 14 Days)</CardTitle>
            <CardDescription>
              Daily count of emails by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={volumeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="received" stackId="a" fill="#8884d8" name="Received" />
                  <Bar dataKey="awaiting" stackId="b" fill="#f97316" name="Awaiting" />
                  <Bar dataKey="replied" stackId="b" fill="#4ade80" name="Replied" />
                  <Bar dataKey="rejected" stackId="b" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 lg:col-span-1">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>
              Current email status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>User Feedback Ratings</CardTitle>
            <CardDescription>
              Distribution of ratings from 1-5 stars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ratingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Number of Ratings">
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  showStars?: boolean;
  rating?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  description,
  showStars = false,
  rating = 0 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {showStars ? (
            <div className="flex items-center">
              {value}
              <div className="ml-2 flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i}
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill={i < Math.floor(Number(rating)) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={i < Math.floor(Number(rating)) ? "text-yellow-400" : "text-gray-300"}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default EmailAnalytics;
