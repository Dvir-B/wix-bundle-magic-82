
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// טיפוס להגדרות Wix
export interface WixSDKSettings {
  currencySymbol: string;
  defaultDiscountPercentage: number;
  [key: string]: any;
}

export function useWixSettings() {
  const [settings, setSettings] = useState<WixSDKSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      
      try {
        // בדיקה אם אנחנו בסביבת Wix
        if (typeof window !== 'undefined' && 'Wix' in window) {
          // קבלת הגדרות מ-Wix
          window.Wix?.Settings.getSettings((wixSettings: any) => {
            console.log('התקבלו הגדרות מ-Wix:', wixSettings);
            setSettings(wixSettings || {
              currencySymbol: '₪',
              defaultDiscountPercentage: 10
            });
            setLoading(false);
          });
        } else {
          // אם לא בסביבת Wix, השתמש בהגדרות ברירת מחדל
          console.log('לא בסביבת Wix, משתמש בהגדרות ברירת מחדל');
          setSettings({
            currencySymbol: '₪',
            defaultDiscountPercentage: 10
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('שגיאה בטעינת הגדרות:', err);
        setError(err instanceof Error ? err : new Error('שגיאה לא ידועה'));
        toast.error('שגיאה בטעינת הגדרות האפליקציה');
        
        // במקרה של שגיאה, השתמש בהגדרות ברירת מחדל
        setSettings({
          currencySymbol: '₪',
          defaultDiscountPercentage: 10
        });
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

// פונקציה לשמירת הגדרות באמצעות ה-API של Wix
export const saveWixSettings = async (newSettings: Partial<WixSDKSettings>): Promise<boolean> => {
  try {
    // כאן תהיה קריאה אמיתית ל-API של Wix לשמירת הגדרות
    // לצורך הדוגמה אנחנו רק מחכים ומדמים תשובה חיובית
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('שמירת הגדרות חדשות:', newSettings);
    return true;
  } catch (error) {
    console.error('שגיאה בשמירת הגדרות:', error);
    throw error;
  }
};
