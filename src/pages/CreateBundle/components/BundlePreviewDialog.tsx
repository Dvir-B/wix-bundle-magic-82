
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import BundleCard from "@/components/BundleCard";
import { Bundle } from "@/components/BundleCard";

interface BundlePreviewDialogProps {
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  previewBundle: Bundle;
}

const BundlePreviewDialog: React.FC<BundlePreviewDialogProps> = ({
  previewOpen,
  setPreviewOpen,
  previewBundle
}) => {
  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>תצוגה מקדימה של החבילה</DialogTitle>
          <DialogDescription>
            כך תראה החבילה בחנות שלך
          </DialogDescription>
        </DialogHeader>
        
        <div className="pt-4 pb-2">
          <BundleCard 
            bundle={previewBundle}
            index={0}
            onEdit={() => {}}
            onDelete={() => {}}
            onToggleActive={() => {}}
          />
        </div>
        
        <DialogFooter>
          <Button 
            onClick={() => setPreviewOpen(false)}
            className="w-full sm:w-auto"
          >
            סגור
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BundlePreviewDialog;
