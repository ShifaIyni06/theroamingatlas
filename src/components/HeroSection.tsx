import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onExplore: () => void;
}

const HeroSection = ({ onExplore }: HeroSectionProps) => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <motion.img
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2.5, ease: [0.2, 0, 0, 1] }}
      src={heroBg}
      alt="Himalayan sunrise landscape"
      className="absolute inset-0 w-full h-full object-cover opacity-60"
    />
    <div className="absolute inset-0 gradient-overlay" />

    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        className="font-cursive text-3xl md:text-4xl text-primary mb-6"
      >
        Curated journeys crafted for unforgettable experiences
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter mb-10 text-foreground leading-[0.95]"
      >
        Explore India Like <br /> Never Before
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0, 0, 1] }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button onClick={onExplore} className="btn-primary text-lg">
          Explore Packages
        </button>
        <a href="#about" className="btn-glass text-lg">
          Start Your Journey
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
