
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface BundleStatusSectionProps {
  form: any; // Using any for now to fix the build error
}

const BundleStatusSection: React.FC<BundleStatusSectionProps> = ({
  form
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Bundle Status</h2>
      <Separator />
      
      <FormField
        control={form.control}
        name="active"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Active</FormLabel>
              <FormDescription>
                Make this bundle available in your store
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default BundleStatusSection;
