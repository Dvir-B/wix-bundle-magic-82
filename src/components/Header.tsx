
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, LayoutGrid, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedContainer from "./AnimatedContainer";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: LayoutGrid },
    { path: "/bundles", label: "Bundles", icon: Package },
    { path: "/create-bundle", label: "Create Bundle", icon: PlusCircle },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-md border-b border-border shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <AnimatedContainer animation="fade-in">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <span className="font-semibold text-xl hidden sm:inline-block">WixBundles</span>
          </Link>
        </AnimatedContainer>

        <nav className="flex items-center space-x-1">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <AnimatedContainer 
                key={item.path} 
                delay={100 + index * 50}
                animation="fade-in"
              >
                <Link
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md flex items-center space-x-1 transition-all hover:bg-accent",
                    isActive 
                      ? "bg-accent text-primary font-medium" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline-block text-sm">{item.label}</span>
                </Link>
              </AnimatedContainer>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
