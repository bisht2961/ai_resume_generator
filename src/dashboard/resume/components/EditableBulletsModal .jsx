// components/EditableBulletsModal.tsx

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  
  const EditableBulletsModal = ({
    open,
    bullets,
    onClose,
    onBulletChange,
    onRemove,
    onSave,
    onRegenerate,
  }) => {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Work Summary Bullets</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {bullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-2">
                <Textarea
                  value={bullet}
                  onChange={(e) => onBulletChange(index, e.target.value)}
                  className="w-full text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => onRemove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
  
          <DialogFooter className="mt-4 flex justify-between">
            <Button variant="ghost" onClick={onRegenerate}>
              🔄 Regenerate
            </Button>
            <div className="space-x-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onSave}>Save Summary</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditableBulletsModal;
  