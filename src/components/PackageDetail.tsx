import { motion } from "framer-motion";
import { ArrowLeft, Train, Plane, CheckCircle, XCircle, Clock, MapPin, Calendar } from "lucide-react";
import type { TravelPackage } from "@/data/packages";

interface PackageDetailProps {
  pkg: TravelPackage;
  onClose: () => void;
  onBook: (pkg: TravelPackage) => void;
}

const themeAccent: Record<string, string> = {
  nature: "text-nature",
  mountain: "text-mountain",
  heritage: "text-heritage",
};

const themeBorder: Record<string, string> = {
  nature: "border-nature/30",
  mountain: "border-mountain/30",
  heritage: "border-heritage/30",
};

const themeBg: Record<string, string> = {
  nature: "bg-nature/10",
  mountain: "bg-mountain/10",
  heritage: "bg-heritage/10",
};

const PackageDetail = ({ pkg, onClose, onBook }: PackageDetailProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-xl overflow-y-auto"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ ease: [0.2, 0, 0, 1], duration: 0.4 }}
      className="w-full max-w-4xl mx-auto my-6 md:my-10"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Back Button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 px-4 md:px-0 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Packages</span>
      </button>

      <div className="glass-surface overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${themeBorder[pkg.theme]} ${themeBg[pkg.theme]} ${themeAccent[pkg.theme]}`}>
                {pkg.theme}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} /> {pkg.duration}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">{pkg.title}</h2>
            <p className="font-sans italic text-lg md:text-xl text-primary/80 mb-3">& {pkg.subtitle}</p>
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-10">
          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">{pkg.description}</p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="glass-card p-6 text-center group hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Train className="text-primary" size={22} />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">By Train</p>
              <p className="text-3xl md:text-4xl font-price text-foreground">₹{pkg.prices.train.toLocaleString("en-IN")}*</p>
              <p className="text-xs text-muted-foreground mt-1">per person</p>
            </div>
            <div className="glass-card p-6 text-center group hover:scale-[1.02] transition-transform">
              <div className="w-12 h-12 rounded-full bg-mountain/10 flex items-center justify-center mx-auto mb-3">
                <Plane className="text-mountain" size={22} />
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">By Flight</p>
              <p className="text-3xl md:text-4xl font-price text-foreground">₹{pkg.prices.flight.toLocaleString("en-IN")}*</p>
              <p className="text-xs text-muted-foreground mt-1">per person</p>
            </div>
          </div>

          {/* Tour Highlights */}
          <div>
            <h3 className="text-xl font-serif text-foreground mb-5 flex items-center gap-2">
              <MapPin size={18} className={themeAccent[pkg.theme]} />
              Tour Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pkg.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card px-4 py-3 text-sm text-muted-foreground"
                >
                  {h}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Day-wise Itinerary */}
          <div>
            <h3 className="text-xl font-serif text-foreground mb-5 flex items-center gap-2">
              <Calendar size={18} className={themeAccent[pkg.theme]} />
              Day-wise Itinerary
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-[19px] top-3 bottom-3 w-px ${themeBorder[pkg.theme]} border-l border-dashed`} />
              <div className="space-y-4">
                {pkg.itinerary.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex gap-4 relative"
                  >
                    {/* Day circle */}
                    <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${themeBg[pkg.theme]} ${themeAccent[pkg.theme]} border ${themeBorder[pkg.theme]} z-10`}>
                      D{day.day}
                    </div>
                    <div className="glass-card px-5 py-4 flex-1">
                      <h4 className="font-serif text-foreground text-base mb-1">{day.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{day.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-sm font-bold text-accent uppercase tracking-wider flex items-center gap-2 mb-4">
                <CheckCircle size={16} /> What's Included
              </h4>
              <ul className="space-y-2.5">
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-sm font-bold text-destructive uppercase tracking-wider flex items-center gap-2 mb-4">
                <XCircle size={16} /> Not Included
              </h4>
              <ul className="space-y-2.5">
                {pkg.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Book CTA */}
          {/* Contact CTA */}
<div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">

  {/* WhatsApp */}
  <a
    href={`https://wa.me/917093899504?text=${encodeURIComponent(
      `Hi, I am interested in the "${pkg.title}" package. Please share more details.`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-glass text-center text-sm md:text-base py-3 rounded-xl border border-green-400/30 hover:bg-green-500/10 transition-all duration-300 hover:scale-105"
  >
    💬 WhatsApp
  </a>

  {/* Mail */}
  <a
    href={`mailto:theroamingatlas@gmail.com?subject=${encodeURIComponent(
      `Inquiry for ${pkg.title} Package`
    )}&body=${encodeURIComponent(
      `Hi,\n\nI am interested in the "${pkg.title}" package. Please share details regarding pricing, availability, and booking process.\n\nThank you.`
    )}`}
    className="btn-glass text-center text-sm md:text-base py-3 rounded-xl border border-blue-400/30 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
  >
    📧 Mail Us
  </a>

  {/* Call */}
  <a
    href="tel:+917093899504"
    className="btn-glass text-center text-sm md:text-base py-3 rounded-xl border border-yellow-400/30 hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105"
  >
    📞 Call Us
  </a>

</div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default PackageDetail;
