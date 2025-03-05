
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
    { path: "/", label: "דשבורד", icon: LayoutGrid },
    { path: "/bundles", label: "חבילות", icon: Package },
    { path: "/create-bundle", label: "יצירת חבילה", icon: PlusCircle },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8",
        scrolled 
          ? "py-2 bg-white shadow-sm border-b border-wixGray" 
          : "py-3 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <AnimatedContainer animation="fade-in">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 rounded-md bg-wixBlue flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <span className="font-medium text-lg hidden sm:inline-block text-wixDarkBlue">וויקס חבילות</span>
          </Link>
        </AnimatedContainer>

        <nav className="flex items-center space-x-1 rtl:space-x-reverse">
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
                    "px-3 py-2 rounded-md flex items-center space-x-1 rtl:space-x-reverse transition-all text-sm",
                    isActive 
                      ? "bg-wixLightBlue text-wixBlue font-medium" 
                      : "text-wixDarkGray hover:bg-wixGray"
                  )}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline-block">{item.label}</span>
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
