import { RiAddLine, RiEditLine, RiDeleteBinLine, RiPhoneFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";

interface Owner {
  id: string;
  name: string;
  phone: string;
}

interface OwnersSectionProps {
  owners: Owner[];
  onAction: (action: "add" | "update" | "delete", owner?: { phone: string }) => void;
}

export default function OwnersSection({ owners, onAction }: OwnersSectionProps) {
  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b bg-muted/20">
        <h3 className="text-lg font-semibold">المُلاّك</h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 h-9"
          onClick={() => onAction("add")}
        >
          <RiAddLine size={16} /> إضافة
        </Button>
      </div>

      {/* List */}
      <div className="p-5">
        <ul className="space-y-3">
          {owners.map((owner) => (
            <li
              key={owner.id}
              className="flex justify-between items-center p-4 bg-muted/30 border rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-base">
                  {owner.name}
                </span>
                {owner.phone && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <RiPhoneFill size={14} /> {owner.phone}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => onAction("update", { phone: owner.phone })}
                >
                  <RiEditLine size={18} />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onAction("delete", { phone: owner.phone })}
                >
                  <RiDeleteBinLine size={18} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}