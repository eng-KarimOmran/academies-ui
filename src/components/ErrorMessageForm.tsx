import { RiErrorWarningFill } from "@remixicon/react";
export default function ErrorMessageForm({ message }: { message?: string }) {
  if (!message) return;
  return (
    <div className="flex items-center gap-2 text-red-700">
      <span>
        <RiErrorWarningFill size={18} />
      </span>
      <span>{message}</span>
    </div>
  );
}
