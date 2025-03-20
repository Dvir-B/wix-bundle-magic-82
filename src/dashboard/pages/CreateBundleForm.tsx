
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BundleDetailsSection from '@/pages/CreateBundle/components/BundleDetailsSection';
import ProductSelectionSection from '@/pages/CreateBundle/components/ProductSelectionSection';
import BundlePricingSection from '@/pages/CreateBundle/components/BundlePricingSection';
import BundleStatusSection from '@/pages/CreateBundle/components/BundleStatusSection';
import BundleSummary from '@/pages/CreateBundle/components/BundleSummary';
import BundlePreviewDialog from '@/pages/CreateBundle/components/BundlePreviewDialog';
import { saveBundle } from '@/utils/wixUtils';
import { Product } from '@/components/BundleCard';
import Header from '@/components/Header';

// Schema for form validation
const bundleFormSchema = z.object({
  name: z.string().min(3, { message: 'Bundle name must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  discountPercentage: z.number().min(0).max(100),
  active: z.boolean().default(true),
  products: z.array(z.any()).min(2, { message: 'At least 2 products must be selected' }),
});

type BundleFormValues = z.infer<typeof bundleFormSchema>;

interface CreateBundleFormProps {
  availableProducts: Product[];
  wixSettings: any;
}

const CreateBundleForm: React.FC<CreateBundleFormProps> = ({ availableProducts, wixSettings }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const defaultValues: Partial<BundleFormValues> = {
    name: '',
    description: '',
    discountPercentage: wixSettings?.defaultDiscountPercentage || 10,
    active: true,
    products: [],
  };

  const form = useForm<BundleFormValues>({
    resolver: zodResolver(bundleFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: BundleFormValues) => {
    setIsSubmitting(true);
    try {
      await saveBundle({
        ...data,
        id: crypto.randomUUID(), // Generate a unique ID for the bundle
      });
      
      toast.success('Bundle created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating bundle:', error);
      toast.error('Failed to create bundle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTab = () => {
    if (activeTab === 'details') setActiveTab('products');
    else if (activeTab === 'products') setActiveTab('pricing');
    else if (activeTab === 'pricing') setActiveTab('status');
  };

  const previousTab = () => {
    if (activeTab === 'status') setActiveTab('pricing');
    else if (activeTab === 'pricing') setActiveTab('products');
    else if (activeTab === 'products') setActiveTab('details');
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const products = form.watch('products');
  const formIsValid = form.formState.isValid;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Bundle</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="p-6 mb-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="products">Products</TabsTrigger>
                      <TabsTrigger value="pricing">Pricing</TabsTrigger>
                      <TabsTrigger value="status">Status</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details">
                      <BundleDetailsSection form={form} />
                      <div className="flex justify-end mt-6">
                        <Button type="button" onClick={nextTab}>Next</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="products">
                      <ProductSelectionSection 
                        form={form} 
                        availableProducts={availableProducts}
                      />
                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={previousTab}>Previous</Button>
                        <Button type="button" onClick={nextTab}>Next</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pricing">
                      <BundlePricingSection 
                        form={form}
                        products={products}
                        currencySymbol={wixSettings?.currencySymbol || '$'}
                      />
                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={previousTab}>Previous</Button>
                        <Button type="button" onClick={nextTab}>Next</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="status">
                      <BundleStatusSection form={form} />
                      <div className="flex justify-between mt-6">
                        <Button type="button" variant="outline" onClick={previousTab}>Previous</Button>
                        <Button 
                          type="submit" 
                          disabled={!formIsValid || products.length < 2 || isSubmitting}
                        >
                          {isSubmitting ? 'Creating...' : 'Create Bundle'}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </form>
            </Form>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="sticky top-24">
              <Card className="p-6 mb-4">
                <h2 className="text-xl font-semibold mb-4">Bundle Summary</h2>
                <BundleSummary 
                  form={form} 
                  currencySymbol={wixSettings?.currencySymbol || '$'}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-4" 
                  onClick={handlePreview}
                  disabled={products.length === 0}
                >
                  Preview Bundle
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <BundlePreviewDialog 
        open={previewOpen} 
        onOpenChange={setPreviewOpen}
        bundle={{
          id: 'preview',
          name: form.watch('name') || 'Bundle Preview',
          description: form.watch('description') || 'Bundle description preview',
          products: form.watch('products') || [],
          discountPercentage: form.watch('discountPercentage') || 0,
          active: form.watch('active') || false,
        }}
        currencySymbol={wixSettings?.currencySymbol || '$'}
      />
    </div>
  );
};

export default CreateBundleForm;
