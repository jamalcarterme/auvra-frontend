"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  children,
  width = "480px",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.18 }}
            className="relative bg-surface rounded-card shadow-raised w-full max-h-[85vh] overflow-y-auto thin-scroll"
            style={{ maxWidth: width }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line sticky top-0 bg-surface">
              <h3 className="text-[15px] font-medium text-ink">{title}</h3>
              <button onClick={onClose} className="p-1 rounded-md text-muted hover:text-ink hover:bg-ink/[0.05]" aria-label="Close">
                <X size={17} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative bg-surface w-full max-w-[420px] h-full overflow-y-auto thin-scroll shadow-raised"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line sticky top-0 bg-surface z-10">
              <h3 className="text-[15px] font-medium text-ink">{title}</h3>
              <button onClick={onClose} className="p-1 rounded-md text-muted hover:text-ink hover:bg-ink/[0.05]" aria-label="Close">
                <X size={17} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-ink text-white text-[14px] px-4 py-2.5 rounded-md shadow-raised"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
