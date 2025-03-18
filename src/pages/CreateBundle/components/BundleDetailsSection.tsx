
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BundleDetailsSectionProps {
  bundleName: string;
  setBundleName: (name: string) => void;
  bundleDescription: string;
  setBundleDescription: (description: string) => void;
}

const BundleDetailsSection: React.FC<BundleDetailsSectionProps> = ({
  bundleName,
  setBundleName,
  bundleDescription,
  setBundleDescription
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">פרטי החבילה</h2>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">שם החבילה</Label>
          <Input
            id="name"
            placeholder="לדוגמה, חבילת מוצרי קיץ"
            value={bundleName}
            onChange={(e) => setBundleName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">תיאור</Label>
          <Textarea
            id="description"
            placeholder="תאר את החבילה ואת היתרונות שלה..."
            rows={3}
            value={bundleDescription}
            onChange={(e) => setBundleDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BundleDetailsSection;
