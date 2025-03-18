
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface BundleStatusSectionProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const BundleStatusSection: React.FC<BundleStatusSectionProps> = ({
  isActive,
  setIsActive
}) => {
  return (
    <>
      <Separator />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">סטטוס חבילה</h2>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="active-status">פעיל</Label>
            <p className="text-sm text-muted-foreground">
              החבילה תהיה זמינה בחנות שלך
            </p>
          </div>
          <Switch
            id="active-status"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>
      </div>
    </>
  );
};

export default BundleStatusSection;
