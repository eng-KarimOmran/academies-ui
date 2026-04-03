import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

interface SocialMediaSectionProps {
  socials: SocialMedia[];
  onAction: (action: "add" | "update" | "delete", id?: string) => void;
}

export default function SocialMediaSection({ socials, onAction }: SocialMediaSectionProps) {
  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-5 border-b bg-muted/20">
        <h3 className="text-lg font-semibold">وسائل التواصل الاجتماعي</h3>
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
          {socials.length > 0 ? (
            socials.map((social) => (
              <li
                key={social.id}
                className="flex justify-between items-center p-4 bg-muted/30 border rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col gap-1 overflow-hidden max-w-[70%]">
                  <span className="font-semibold text-base">
                    {social.platform}
                  </span>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate block"
                  >
                    {social.url}
                  </a>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => onAction("update", social.id)}
                  >
                    <RiEditLine size={18} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onAction("delete", social.id)}
                  >
                    <RiDeleteBinLine size={18} />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-8 bg-muted/20 border border-dashed rounded-xl text-center text-muted-foreground">
              لا يوجد وسائل تواصل اجتماعي مضافة حالياً
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}