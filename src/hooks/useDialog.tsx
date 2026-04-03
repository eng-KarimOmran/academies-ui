import { useState } from "react";

export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return { isOpen, setIsOpen };
}
