import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CameraDialog({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose} disablePointerDismissal={true}>
      <form>
        <DialogContent className="min-h-svh min-w-svw rounded-none">
          {children}
        </DialogContent>
      </form>
    </Dialog>
  );
}
