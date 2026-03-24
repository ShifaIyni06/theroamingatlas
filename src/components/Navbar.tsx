import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Home", "Destinations", "Packages", "Gallery", "About", "Contact"];

interface NavbarProps {}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });

  // 🌗 Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  // 🎯 Active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      NAV_LINKS.forEach((item) => {
        const section = document.getElementById(item.toLowerCase());
        if (section) {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(item.toLowerCase());
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚀 Smooth scroll
  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/60 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* 🌍 Logo + Tagline */}
        <div className="flex flex-col">
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/LOGO.png"
              alt="logo"
              className="w-12 h-12 object-contain drop-shadow-md"
            />
            <span className="text-lg md:text-xl font-semibold tracking-wide text-foreground">
              THE ROAMING ATLAS
            </span>
          </div>

          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Explore • Experience • Escape
          </span>
        </div>

        {/* 🖥️ Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_LINKS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;

            return (
              <button
                key={item}
                onClick={() => handleNavClick(id)}
                className={`relative transition-all duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item}

                {/* ✨ Active underline animation */}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-foreground rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 🌗 + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsLight(!isLight)}
            className="p-2.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

         <a
  href="https://wa.me/917093899504?text=Hi%20I%20am%20interested%20in%20your%20travel%20packages"
  target="_blank"
  rel="noopener noreferrer"
  className="px-5 py-2 rounded-full border border-green-400/30 text-sm font-medium hover:bg-green-500/10 hover:scale-105 transition-all duration-300"
>
  💬 Chat to Book
</a>
        </div>

        {/* 📱 Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsLight(!isLight)}>
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="text-lg text-muted-foreground hover:text-foreground transition"
                >
                  {item}
                </button>
              ))}

              <a
  href="https://wa.me/917093899504?text=Hi%20I%20am%20interested%20in%20your%20travel%20packages"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setMobileOpen(false)}
  className="mt-2 px-5 py-2 rounded-full border border-green-400/30 text-center hover:bg-green-500/10 transition"
>
  💬 Chat to Book
</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
