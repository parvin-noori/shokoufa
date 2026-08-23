"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";

type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "default" | "footer";
};

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  variant = "default",
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`w-full overflow-hidden rounded-xl ${
        variant === "default"
          ? "bg-gray-50 text-gray-800"
          : "text-white"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full cursor-pointer items-center justify-between px-5 py-5 font-bold ${variant==="footer"?"font-bold":"font-semibold"}`}
        aria-expanded={isOpen}
      >
        <span>{title}</span>

        {isOpen ? (
          <ChevronUp className="size-5 shrink-0" />
        ) : (
          <ChevronDown className="size-5 shrink-0" />
        )}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}