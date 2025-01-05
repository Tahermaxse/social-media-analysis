import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-[#D94E1E] z-[100] text-white md:rounded-t-lg">
      <h3 className="font-semibold text-lg">Ferranax</h3>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white hover:text-white/80 dark:hover:text-white/80 hover:bg-white/10 dark:hover:bg-white/10"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}