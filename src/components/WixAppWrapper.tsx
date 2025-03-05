
import React from 'react';
import { useEffect, useState } from 'react';

interface WixAppWrapperProps {
  children: React.ReactNode;
}

// This component will serve as a wrapper for our application in the Wix environment
const WixAppWrapper: React.FC<WixAppWrapperProps> = ({ children }) => {
  const [wixReady, setWixReady] = useState(false);
  const [wixSettings, setWixSettings] = useState<any>(null);
  
  useEffect(() => {
    // Check if we're in a Wix environment
    const isWixEnvironment = typeof window !== 'undefined' && window.Wix;
    
    if (isWixEnvironment) {
      // Listen for Wix to be ready
      window.Wix?.addEventListener('ready', () => {
        console.log('Wix is ready');
        setWixReady(true);
        
        // Get Wix settings
        window.Wix?.Settings.getSettings((settings: any) => {
          console.log('Received settings from Wix:', settings);
          setWixSettings(settings);
        });
      });
    } else {
      // If not in Wix environment, set as ready for development
      console.log('Not in Wix environment, continuing with development mode');
      setWixReady(true);
    }
    
    return () => {
      // Clean up event listener
      if (isWixEnvironment) {
        window.Wix?.removeEventListener('ready');
      }
    };
  }, []);

  if (!wixReady) {
    return <div className="flex items-center justify-center h-screen">Loading Wix application...</div>;
  }

  return <>{children}</>;
};

export default WixAppWrapper;
