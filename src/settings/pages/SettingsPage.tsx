
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";

const SettingsPage = () => {
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [defaultDiscount, setDefaultDiscount] = useState(10);
  const [updateInventory, setUpdateInventory] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Settings saved successfully");
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Configure your bundle app settings
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general settings for your bundles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency Symbol</Label>
                  <Input 
                    id="currency" 
                    value={currencySymbol} 
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    maxLength={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Symbol displayed for prices
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="discount">Default Discount</Label>
                    <span className="text-sm">{defaultDiscount}%</span>
                  </div>
                  <Slider 
                    id="discount"
                    min={0}
                    max={50}
                    step={1}
                    value={[defaultDiscount]}
                    onValueChange={(value) => setDefaultDiscount(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Default discount applied to new bundles
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Inventory Settings</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="update-inventory">Update Inventory</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically update product inventory when bundles are purchased
                    </p>
                  </div>
                  <Switch
                    id="update-inventory"
                    checked={updateInventory}
                    onCheckedChange={setUpdateInventory}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
