"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="w-12 h-6 rounded-full flex items-center border border-input bg-muted relative transition-colors duration-300 dark:bg-zinc-700"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-5 h-5 rounded-full bg-white absolute shadow-md ${
          isDark ? "right-0.5" : "left-0.5"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="w-3 h-3 text-zinc-900" />
            ) : (
              <Sun className="w-3 h-3 text-yellow-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
