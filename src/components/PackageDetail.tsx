import { motion, AnimatePresence } from "framer-motion";
import { X, Train, Plane, CheckCircle, XCircle } from "lucide-react";
import type { TravelPackage } from "@/data/packages";

interface PackageDetailProps {
  pkg: TravelPackage;
  onClose: () => void;
  onBook: (pkg: TravelPackage) => void;
}

const PackageDetail = ({ pkg, onClose, onBook }: PackageDetailProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl overflow-y-auto"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 20 }}
      transition={{ ease: [0.2, 0, 0, 1] }}
      className="glass-surface w-full max-w-3xl my-8 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header Image */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-background/50 backdrop-blur rounded-full hover:bg-background/70 transition-colors"
        >
          <X className="text-foreground" size={20} />
        </button>
        <div className="absolute bottom-6 left-6">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">{pkg.title}</h2>
          <p className="font-cursive text-primary text-xl">& {pkg.subtitle}</p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        <p className="text-muted-foreground">{pkg.description}</p>

        {/* Highlights */}
        <div>
          <h3 className="text-lg font-serif text-foreground mb-4">Tour Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {pkg.highlights.map((h, i) => (
              <p key={i} className="text-sm text-muted-foreground">{h}</p>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-5 text-center">
            <Train className="mx-auto mb-2 text-primary" size={24} />
            <p className="text-sm text-muted-foreground">Train</p>
            <p className="text-2xl font-serif text-foreground">₹{pkg.prices.train.toLocaleString("en-IN")}</p>
          </div>
          <div className="glass-card p-5 text-center">
            <Plane className="mx-auto mb-2 text-mountain" size={24} />
            <p className="text-sm text-muted-foreground">Flight</p>
            <p className="text-2xl font-serif text-foreground">₹{pkg.prices.flight.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2 mb-3">
              <CheckCircle size={16} /> Inclusions
            </h4>
            <ul className="space-y-1.5">
              {pkg.inclusions.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground">• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-destructive uppercase tracking-wider flex items-center gap-2 mb-3">
              <XCircle size={16} /> Exclusions
            </h4>
            <ul className="space-y-1.5">
              {pkg.exclusions.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={() => onBook(pkg)} className="btn-primary w-full text-lg">
          Book This Package
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default PackageDetail;
