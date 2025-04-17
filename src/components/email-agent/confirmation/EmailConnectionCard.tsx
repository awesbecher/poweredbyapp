
import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EmailConnectionCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Connect Email
        </CardTitle>
        <CardDescription>
          Connect your business Gmail account to start receiving emails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">
          Connect with Google Workspace
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailConnectionCard;
