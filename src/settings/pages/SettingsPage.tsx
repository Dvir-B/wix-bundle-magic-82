
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import { getWixSettings } from '@/utils/wixUtils';

const formSchema = z.object({
  currencySymbol: z.string().min(1, {
    message: 'Currency symbol is required',
  }),
  defaultDiscountPercentage: z.coerce.number().min(0).max(100, {
    message: 'Discount must be between 0 and 100',
  }),
});

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currencySymbol: '$',
      defaultDiscountPercentage: 10,
    },
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getWixSettings();
        
        form.reset({
          currencySymbol: settings?.currencySymbol || '$',
          defaultDiscountPercentage: settings?.defaultDiscountPercentage || 10,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading settings:', error);
        toast.error('Failed to load settings');
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    
    // In a real app, you would save to Wix settings here
    setTimeout(() => {
      toast.success('Settings saved successfully');
      setIsSaving(false);
    }, 1000);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>טוען הגדרות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">App Settings</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general settings for your bundle app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="currencySymbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency Symbol</FormLabel>
                        <FormControl>
                          <Input placeholder="$" {...field} />
                        </FormControl>
                        <FormDescription>
                          Symbol used for displaying prices (e.g., $, €, ₪)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="defaultDiscountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Discount Percentage</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={0} 
                            max={100} 
                            placeholder="10" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Default discount percentage for new bundles
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Settings'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
