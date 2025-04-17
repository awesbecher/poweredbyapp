
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface ErrorLog {
  id: string;
  function_name: string;
  error_message: string;
  agent_id: string;
  metadata: any;
  created_at: string;
}

interface ErrorMonitoringProps {
  agentId?: string;
}

const ErrorMonitoring: React.FC<ErrorMonitoringProps> = ({ agentId }) => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedErrors, setExpandedErrors] = useState<string[]>([]);

  // Initialize Supabase client with proper error handling
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Initialize client only if variables are available
  const supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

  useEffect(() => {
    if (!agentId || !supabase) {
      setIsLoading(false);
      if (!supabase) {
        setError("Supabase client not initialized. Check your environment variables.");
      }
      return;
    }
    
    const fetchErrorLogs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('error_logs')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: false })
          .limit(100);
          
        if (error) throw new Error(error.message);
        
        setErrorLogs(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch error logs');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchErrorLogs();
  }, [agentId, supabase]);

  const toggleErrorExpand = (errorId: string) => {
    setExpandedErrors(prev => 
      prev.includes(errorId) 
        ? prev.filter(id => id !== errorId) 
        : [...prev, errorId]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (errorLogs.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium">No errors found</h3>
            <p className="text-gray-500 mt-2">
              Your email agent is running smoothly!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Error Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {errorLogs.map(log => (
              <div 
                key={log.id} 
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between cursor-pointer" onClick={() => toggleErrorExpand(log.id)}>
                  <div>
                    <h4 className="font-semibold text-red-600">{log.function_name}</h4>
                    <p className="text-sm text-gray-600 truncate" style={{ maxWidth: '80ch' }}>
                      {log.error_message}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(log.created_at)}
                    </div>
                  </div>
                  <div>
                    {expandedErrors.includes(log.id) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedErrors.includes(log.id) && (
                  <div className="mt-4 p-3 bg-gray-100 rounded text-sm overflow-auto">
                    <h5 className="font-medium mb-2">Error details:</h5>
                    <pre className="whitespace-pre-wrap">{log.error_message}</pre>
                    
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <>
                        <h5 className="font-medium mb-2 mt-4">Metadata:</h5>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(log.metadata, null, 2)}</pre>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMonitoring;
