
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWizard } from '../../EmailAgentWizard';

const Branding: React.FC = () => {
  const { updateStepData, markStepAsCompleted, stepData } = useWizard();
  const savedData = stepData.branding || {};
  
  const [formData, setFormData] = useState({
    companyName: savedData.companyName || '',
    senderName: savedData.senderName || '',
    senderEmail: savedData.senderEmail || '',
    primaryColor: savedData.primaryColor || '#00A1FF',
    secondaryColor: savedData.secondaryColor || '#0F172A',
    signature: savedData.signature || '<p>Best regards,<br/>[Agent Name]<br/>[Company]</p>',
    logoUrl: savedData.logoUrl || ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');

  // Validate form and update completed step status
  useEffect(() => {
    const isValid = formData.companyName && formData.senderName && formData.senderEmail;
    
    if (isValid) {
      updateStepData('branding', formData);
      markStepAsCompleted('branding');
    }
  }, [formData]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    simulateAutosave();
  };

  const simulateAutosave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  // Simulate logo upload
  const handleLogoUpload = () => {
    // In a real implementation, this would handle file upload to a server
    setTimeout(() => {
      setFormData(prev => ({ 
        ...prev, 
        logoUrl: 'https://placehold.co/200x100/00A1FF/FFFFFF?text=Logo' 
      }));
      simulateAutosave();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="branding">Branding & Identity</TabsTrigger>
          <TabsTrigger value="signature">Email Signature</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-xl font-medium">Company Information</h3>
                  
                  <div className="space-y-4">
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your Company Name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input
                          type="text"
                          id="senderName"
                          name="senderName"
                          value={formData.senderName}
                          onChange={handleChange}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="senderEmail">Sender Email</Label>
                        <Input
                          type="email"
                          id="senderEmail"
                          name="senderEmail"
                          value={formData.senderEmail}
                          onChange={handleChange}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-xl font-medium">Brand Colors</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-3">
                        <div 
                          className="w-10 h-10 rounded-md border" 
                          style={{ backgroundColor: formData.primaryColor }}
                        />
                        <Input
                          type="text"
                          id="primaryColor"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-3">
                        <div 
                          className="w-10 h-10 rounded-md border" 
                          style={{ backgroundColor: formData.secondaryColor }}
                        />
                        <Input
                          type="text"
                          id="secondaryColor"
                          name="secondaryColor"
                          value={formData.secondaryColor}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-xl font-medium">Logo Upload</h3>
                  
                  <div className="grid w-full items-center gap-4">
                    <div 
                      className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                      onClick={handleLogoUpload}
                    >
                      {formData.logoUrl ? (
                        <div className="space-y-4">
                          <img 
                            src={formData.logoUrl} 
                            alt="Company Logo" 
                            className="mx-auto max-h-24" 
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({ ...prev, logoUrl: '' }));
                            }}
                          >
                            Change Logo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4 cursor-pointer">
                          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full">
                            <Upload size={24} />
                          </div>
                          <div>
                            <p className="font-medium">Click to upload a logo</p>
                            <p className="text-sm text-muted-foreground">SVG, PNG or JPG (max. 2MB)</p>
                          </div>
                          <Button variant="outline">Select File</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <div className="sticky top-24">
                <Card className="shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Preview</h3>
                    
                    <div className="border rounded-md p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        {formData.logoUrl && (
                          <img 
                            src={formData.logoUrl} 
                            alt="Company Logo" 
                            className="h-6" 
                          />
                        )}
                        <span className="font-medium">
                          {formData.companyName || "Your Company"}
                        </span>
                      </div>
                      
                      <div 
                        className="w-full h-3 rounded-full" 
                        style={{ backgroundColor: formData.primaryColor }}
                      />
                      
                      <div className="pt-2 text-sm">
                        <p>From: {formData.senderName || "Sender"}</p>
                        <p>Email: {formData.senderEmail || "email@example.com"}</p>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="text-sm">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          <p>Best regards,</p>
                          <p>{formData.senderName || "AI Assistant"}</p>
                          <p>{formData.companyName || "Your Company"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full flex items-center justify-center gap-1"
                    >
                      <RefreshCw size={14} />
                      Refresh Preview
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="signature">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-medium mb-4">Email Signature Editor</h3>
              <p className="text-muted-foreground mb-4">
                This signature will be added to all emails sent by your AI agent.
              </p>
              
              {/* Rich text editor would go here - using a simple textarea for now */}
              <textarea
                className="w-full h-48 p-4 border rounded-md"
                value={formData.signature}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, signature: e.target.value }));
                  simulateAutosave();
                }}
              />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Available Variables:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                    [Agent Name]
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                    [Company]
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                    [Website]
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-1 text-xs rounded">
                    [Phone]
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Branding;
