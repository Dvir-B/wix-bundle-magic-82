
import React from 'react';
import { useEffect, useState } from 'react';

interface WixAppWrapperProps {
  children: React.ReactNode;
}

// This component serves as a wrapper for our application in the Wix environment
const WixAppWrapper: React.FC<WixAppWrapperProps> = ({ children }) => {
  const [wixReady, setWixReady] = useState(false);
  const [wixSettings, setWixSettings] = useState<any>(null);
  
  useEffect(() => {
    // Check if we're in a Wix environment
    const isWixEnvironment = typeof window !== 'undefined' && 'Wix' in window;
    
    if (isWixEnvironment) {
      try {
        // Listen for Wix to be ready
        window.Wix?.addEventListener('ready', () => {
          console.log('Wix is ready');
          setWixReady(true);
          
          // Get Wix settings - wrapped in try/catch to prevent errors breaking the app
          try {
            window.Wix?.Settings.getSettings((settings: any) => {
              console.log('Received settings from Wix:', settings);
              setWixSettings(settings);
            });
          } catch (settingsError) {
            console.warn('Failed to get Wix settings:', settingsError);
            // Continue without settings
          }
        });
      } catch (error) {
        console.warn('Failed to initialize Wix event listener:', error);
        // Allow the app to render even if Wix integration fails
        setWixReady(true);
      }
    } else {
      // If not in Wix environment, set as ready for development
      console.log('Not in Wix environment, continuing with development mode');
      setWixReady(true);
    }
    
    // Set a fallback timer to prevent the app from being stuck on loading
    const fallbackTimer = setTimeout(() => {
      if (!wixReady) {
        console.warn('Wix ready event not fired after timeout, continuing anyway');
        setWixReady(true);
      }
    }, 3000);
    
    return () => {
      // Clean up
      clearTimeout(fallbackTimer);
      if (isWixEnvironment) {
        try {
          window.Wix?.removeEventListener('ready');
        } catch (error) {
          console.warn('Error removing Wix event listener:', error);
        }
      }
    };
  }, []);

  if (!wixReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-wixBlue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>טוען את אפליקציית Wix...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WixAppWrapper;
