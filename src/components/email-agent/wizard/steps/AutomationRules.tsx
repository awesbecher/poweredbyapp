
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useWizard } from '../../EmailAgentWizard';

interface Rule {
  id: string;
  when: string;
  condition: string;
  action: string;
  enabled: boolean;
}

const AutomationRules: React.FC = () => {
  const { updateStepData, markStepAsCompleted, stepData } = useWizard();
  const savedData = stepData.automation || {};
  
  const [rules, setRules] = useState<Rule[]>(
    savedData.rules || [
      {
        id: '1',
        when: 'email-received',
        condition: 'subject-contains',
        action: 'reply-with-template',
        enabled: true
      }
    ]
  );

  // Track whether to enable automatic replies
  const [autoRepliesEnabled, setAutoRepliesEnabled] = useState(
    savedData.autoRepliesEnabled !== undefined ? savedData.autoRepliesEnabled : true
  );

  // Update step completion status
  useEffect(() => {
    if (rules.length > 0) {
      updateStepData('automation', { 
        rules,
        autoRepliesEnabled
      });
      markStepAsCompleted('automation');
    }
  }, [rules, autoRepliesEnabled]);

  const addRule = () => {
    const newRule = {
      id: Date.now().toString(),
      when: 'email-received',
      condition: 'subject-contains',
      action: 'reply-with-template',
      enabled: true
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id: string, field: keyof Rule, value: string | boolean) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Automatic Replies</CardTitle>
              <CardDescription>Control when your agent should respond automatically</CardDescription>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-replies"
                checked={autoRepliesEnabled}
                onCheckedChange={setAutoRepliesEnabled}
              />
              <Label htmlFor="auto-replies">Enable auto-replies</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!autoRepliesEnabled ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Auto-replies are disabled</AlertTitle>
              <AlertDescription>
                Your agent will only suggest replies for your approval without sending them automatically.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div 
                    key={rule.id} 
                    className="flex items-center gap-2 p-4 border rounded-md bg-card"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                      <div>
                        <Label className="text-xs mb-1 block">WHEN</Label>
                        <Select 
                          value={rule.when}
                          onValueChange={(value) => updateRule(rule.id, 'when', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email-received">Email is received</SelectItem>
                            <SelectItem value="no-reply-48h">No reply for 48h</SelectItem>
                            <SelectItem value="out-of-office">Out of office</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs mb-1 block">IF</Label>
                        <Select 
                          value={rule.condition}
                          onValueChange={(value) => updateRule(rule.id, 'condition', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="subject-contains">Subject contains</SelectItem>
                            <SelectItem value="from-address">From address</SelectItem>
                            <SelectItem value="has-attachment">Has attachment</SelectItem>
                            <SelectItem value="is-urgent">Marked urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label className="text-xs mb-1 block">THEN</Label>
                        <Select 
                          value={rule.action}
                          onValueChange={(value) => updateRule(rule.id, 'action', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reply-with-template">Reply with template</SelectItem>
                            <SelectItem value="forward-to-team">Forward to team</SelectItem>
                            <SelectItem value="mark-for-review">Mark for review</SelectItem>
                            <SelectItem value="tag-and-categorize">Tag and categorize</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-end gap-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(checked) => updateRule(rule.id, 'enabled', checked)}
                          aria-label="Toggle rule"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteRule(rule.id)}
                          aria-label="Delete rule"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-1"
                onClick={addRule}
              >
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>Rules are processed in order from top to bottom.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Templates</CardTitle>
          <CardDescription>Reusable email templates for common scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Welcome Follow-up', 'Meeting Request', 'Support Acknowledgment'].map((template) => (
                <Card key={template} className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium">{template}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Standard reply</p>
                    <Button variant="link" size="sm" className="px-0 h-6 mt-2">
                      Use template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button variant="link" className="flex items-center justify-center gap-1">
              <Plus className="h-4 w-4" />
              Create New Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AutomationRules;
