import { motion } from "framer-motion";
import type { TravelPackage } from "@/data/packages";

const THEME_STYLES = {
  nature: { text: "text-nature", border: "border-nature/30", glow: "glow-nature" },
  mountain: { text: "text-mountain", border: "border-mountain/30", glow: "glow-mountain" },
  heritage: { text: "text-heritage", border: "border-heritage/30", glow: "glow-heritage" },
};

interface DestinationCardProps {
  pkg: TravelPackage;
  onSelect: (pkg: TravelPackage) => void;
  index: number;
}

const DestinationCard = ({ pkg, onSelect, index }: DestinationCardProps) => {
  const theme = THEME_STYLES[pkg.theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
      whileHover={{ y: -10 }}
      className={`relative group overflow-hidden rounded-3xl border ${theme.border} bg-foreground/5 backdrop-blur-sm cursor-pointer`}
      onClick={() => onSelect(pkg)}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 p-6 md:p-8 w-full">
        <span className={`text-xs uppercase tracking-[0.2em] font-bold ${theme.text}`}>
          {pkg.theme}
        </span>
        <h3 className="text-2xl md:text-3xl font-serif text-foreground mt-2">{pkg.title}</h3>
        <p className="font-cursive text-primary/80 text-lg">& {pkg.subtitle}</p>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{pkg.description}</p>
        <div className="mt-5 flex justify-between items-end">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Starting from</p>
            <p className="text-2xl font-price text-foreground tabular-nums">
              ₹{pkg.prices.train.toLocaleString("en-IN")}*
            </p>
          </div>
          <span className="px-5 py-2 bg-foreground/10 hover:bg-foreground hover:text-background border border-foreground/20 rounded-full text-sm font-medium transition-all duration-300">
            View Details
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
