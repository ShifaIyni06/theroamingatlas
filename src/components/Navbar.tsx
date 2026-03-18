import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Home", "Destinations", "Packages", "About", "Contact"];

interface NavbarProps {
  onBookNow: () => void;
}

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "light";
      return false;
    }
    return false;
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-foreground/5 backdrop-blur-md bg-background/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="text-2xl font-serif tracking-tighter text-foreground">
          THE ROAMING ATLAS
        </a>

        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-foreground transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2.5 rounded-full bg-foreground/10 border border-foreground/10 text-foreground hover:bg-foreground/20 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={onBookNow} className="btn-primary text-sm">
            Book Now
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2 rounded-full bg-foreground/10 border border-foreground/10 text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-foreground/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
              <button onClick={() => { onBookNow(); setMobileOpen(false); }} className="btn-primary text-sm mt-2">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
