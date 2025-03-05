
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ArrowRight, LineChart, Zap, Settings, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedContainer from "@/components/AnimatedContainer";
import Header from "@/components/Header";
import { Bundle } from "@/components/BundleCard";
import { generateMockProducts, generateMockBundles } from "@/utils/bundleUtils";

const Index = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading mock data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProducts = generateMockProducts(20);
      const mockBundles = generateMockBundles(8, mockProducts);
      
      setBundles(mockBundles);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const activeBundlesCount = bundles.filter(bundle => bundle.active).length;
  const totalProducts = bundles.reduce((count, bundle) => count + bundle.products.length, 0);
  const averageDiscount = bundles.length 
    ? (bundles.reduce((sum, bundle) => sum + bundle.discountPercentage, 0) / bundles.length).toFixed(1) 
    : "0";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <AnimatedContainer>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage product bundles for your Wix store
          </p>
        </AnimatedContainer>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedContainer delay={100} className="col-span-full md:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Welcome to WixBundles</CardTitle>
                <CardDescription>
                  Start boosting your sales by creating product bundles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-52 sm:h-64 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
                    <div className="h-full flex flex-col justify-center px-4 sm:px-8">
                      <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                        Create Your First Bundle
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-base max-w-md mb-4">
                        Increase average order value by offering customers curated product bundles at special prices.
                      </p>
                      <div>
                        <Button asChild>
                          <Link to="/create-bundle" className="inline-flex items-center gap-1">
                            Get Started
                            <ArrowRight size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="absolute right-8 bottom-8 transform rotate-6">
                    <Package size={120} className="text-primary/20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer delay={150} className="col-span-full md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <Link to="/bundles" className="flex items-center gap-2">
                    <ShoppingBag size={16} />
                    <span>View All Bundles</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <Link to="/create-bundle" className="flex items-center gap-2">
                    <Package size={16} />
                    <span>Create New Bundle</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="justify-start h-auto py-3">
                  <a href="#" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedContainer delay={200}>
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardDescription>Total Bundles</CardDescription>
                <CardTitle className="text-3xl">{bundles.length}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pb-2 flex-grow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Package size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    {activeBundlesCount} active
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {bundles.length - activeBundlesCount} inactive
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer delay={250}>
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardDescription>Total Products</CardDescription>
                <CardTitle className="text-3xl">{totalProducts}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pb-2 flex-grow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <ShoppingBag size={20} className="text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Products used across all bundles
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          <AnimatedContainer delay={300}>
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardDescription>Average Discount</CardDescription>
                <CardTitle className="text-3xl">{averageDiscount}%</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center pb-2 flex-grow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Zap size={20} className="text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Average discount across all bundles
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </main>
    </div>
  );
};

export default Index;
