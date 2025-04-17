
import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface ErrorLog {
  id: string;
  function_name: string;
  error_message: string;
  agent_id: string;
  metadata: Record<string, any>;
  created_at: string;
}

interface ErrorMonitoringProps {
  agentId?: string;
}

const ErrorMonitoring: React.FC<ErrorMonitoringProps> = ({ agentId }) => {
  const supabase = useSupabaseClient();
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('24h');
  const [functionFilter, setFunctionFilter] = useState('all');
  const [uniqueFunctions, setUniqueFunctions] = useState<string[]>([]);

  const fetchErrorLogs = async () => {
    if (!agentId) return;
    
    setLoading(true);
    
    // Calculate the date range based on selected timeframe
    let startDate;
    const now = new Date();
    
    switch (timeframe) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '3d':
        startDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    let query = supabase
      .from('error_logs')
      .select('*')
      .eq('agent_id', agentId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });
      
    if (functionFilter !== 'all') {
      query = query.eq('function_name', functionFilter);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching error logs:', error);
    } else {
      setErrorLogs(data || []);
      
      // Extract unique function names
      const functions = Array.from(new Set(data?.map(log => log.function_name) || []));
      setUniqueFunctions(functions);
    }
    
    setLoading(false);
  };
  
  useEffect(() => {
    fetchErrorLogs();
  }, [agentId, timeframe, functionFilter]);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, h:mm a');
  };
  
  const truncateMessage = (message: string, maxLength = 100) => {
    return message.length > maxLength 
      ? `${message.substring(0, maxLength)}...` 
      : message;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Error Monitoring</CardTitle>
            <CardDescription>
              Track and debug issues with your email agent
            </CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={fetchErrorLogs} disabled={loading}>
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Time Period</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="3d">Last 3 Days</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Function</label>
              <Select value={functionFilter} onValueChange={setFunctionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All functions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Functions</SelectItem>
                  {uniqueFunctions.map(fn => (
                    <SelectItem key={fn} value={fn}>{fn}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {errorLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No errors found</h3>
              <p className="text-sm text-muted-foreground max-w-md mt-2">
                No error logs were found for the selected time period and filters.
                That's good news!
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead className="w-[150px]">Function</TableHead>
                    <TableHead>Error Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{formatDate(log.created_at)}</TableCell>
                      <TableCell className="font-mono text-xs">{log.function_name}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {truncateMessage(log.error_message)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMonitoring;
