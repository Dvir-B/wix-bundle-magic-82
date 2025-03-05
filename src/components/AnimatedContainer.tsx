
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 
    | "fade-in" 
    | "fade-up" 
    | "scale-in"
    | "slide-in-right"
    | "none";
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  delay = 0,
  animation = "fade-up",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    if (animation === "none") return "opacity-100";
    return `animate-${animation}`;
  };

  return (
    <div
      className={cn(
        "transition-all duration-500",
        getAnimationClass(),
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform"
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
