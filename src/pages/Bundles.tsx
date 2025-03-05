
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Package, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Header from "@/components/Header";
import BundleCard, { Bundle } from "@/components/BundleCard";
import AnimatedContainer from "@/components/AnimatedContainer";
import { generateMockProducts, generateMockBundles } from "@/utils/bundleUtils";

const Bundles = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [filteredBundles, setFilteredBundles] = useState<Bundle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Simulate loading mock data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProducts = generateMockProducts(20);
      const mockBundles = generateMockBundles(12, mockProducts);
      
      setBundles(mockBundles);
      setFilteredBundles(mockBundles);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Apply filters
    let results = bundles;
    
    if (searchQuery) {
      results = results.filter(bundle => 
        bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bundle.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      results = results.filter(bundle => bundle.active === isActive);
    }
    
    setFilteredBundles(results);
  }, [searchQuery, statusFilter, bundles]);

  const handleEditBundle = (bundleId: string) => {
    // In a real app, this would navigate to edit page
    toast.info(`Editing bundle ${bundleId}`);
  };

  const handleDeleteBundle = (bundleId: string) => {
    // Show deletion confirmation in a real app
    setBundles(prev => prev.filter(bundle => bundle.id !== bundleId));
    setFilteredBundles(prev => prev.filter(bundle => bundle.id !== bundleId));
    toast.success("Bundle deleted successfully");
  };

  const handleToggleActive = (bundleId: string, active: boolean) => {
    setBundles(prev => 
      prev.map(bundle => 
        bundle.id === bundleId 
          ? { ...bundle, active } 
          : bundle
      )
    );
    
    setFilteredBundles(prev => 
      prev.map(bundle => 
        bundle.id === bundleId 
          ? { ...bundle, active } 
          : bundle
      )
    );
    
    toast.success(`Bundle ${active ? "activated" : "deactivated"} successfully`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const hasActiveFilters = searchQuery || statusFilter !== "all";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 px-6 md:px-12 pb-16 max-w-7xl mx-auto">
        <AnimatedContainer className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bundles</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product bundles
            </p>
          </div>
          <Button asChild>
            <Link to="/create-bundle" className="flex items-center gap-1">
              <Plus size={16} />
              <span>Create Bundle</span>
            </Link>
          </Button>
        </AnimatedContainer>
        
        <AnimatedContainer delay={100} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bundles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-40">
                  <div className="flex items-center gap-1.5">
                    <Filter size={14} />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bundles</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
              
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-9"
                >
                  <X size={14} className="mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </AnimatedContainer>
        
        <AnimatedContainer delay={150} className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-44 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredBundles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBundles.map((bundle, index) => (
                <BundleCard
                  key={bundle.id}
                  bundle={bundle}
                  index={index}
                  onEdit={handleEditBundle}
                  onDelete={handleDeleteBundle}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                <Package size={20} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No bundles found</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {hasActiveFilters
                  ? "Try adjusting your search filters"
                  : "You haven't created any bundles yet"}
              </p>
              {!hasActiveFilters && (
                <Button asChild>
                  <Link to="/create-bundle">
                    <Plus size={16} className="mr-1" />
                    Create Bundle
                  </Link>
                </Button>
              )}
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  <X size={16} className="mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </AnimatedContainer>
      </main>
    </div>
  );
};

export default Bundles;
