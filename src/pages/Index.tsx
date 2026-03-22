import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationCard from "@/components/DestinationCard";
import PackageDetail from "@/components/PackageDetail";
import BookingModal from "@/components/BookingModal";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { PACKAGES, FEATURED_IDS, type TravelPackage } from "@/data/packages";
import { motion } from "framer-motion";

const featuredPackages = PACKAGES.filter((p) => FEATURED_IDS.includes(p.id));
const allPackages = PACKAGES;

const Index = () => {
  const [detailPkg, setDetailPkg] = useState<TravelPackage | null>(null);
  const [bookingPkg, setBookingPkg] = useState<TravelPackage | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const packagesRef = useRef<HTMLDivElement>(null);

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openBooking = (pkg?: TravelPackage | null) => {
    setDetailPkg(null);
    setBookingPkg(pkg || null);
    setShowBooking(true);
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navbar onBookNow={() => openBooking()} />
      <HeroSection onExplore={scrollToPackages} />

      {/* Featured Destinations */}
      <section id="destinations" className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="mb-16"
        >
          <p className="font-sans italic text-2xl md:text-3xl text-primary mb-6">Where to next</p>
          <h2 className="text-4xl md:text-5xl font-serif">Featured Destinations</h2>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Hand-picked destinations where luxury meets the raw beauty of the Indian subcontinent.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg, i) => (
            <DestinationCard key={pkg.id} pkg={pkg} onSelect={setDetailPkg} index={i} />
          ))}
        </div>
      </section>

      {/* All Packages */}
      <section id="packages" ref={packagesRef} className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="mb-16"
        >
          <p className="font-sans italic text-2xl md:text-3xl text-primary mb-6">All experiences</p>
          <h2 className="text-4xl md:text-5xl font-serif">Our Curated Packages</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPackages.map((pkg, i) => (
            <DestinationCard key={pkg.id} pkg={pkg} onSelect={setDetailPkg} index={i} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />
      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {detailPkg && (
          <PackageDetail
            key="detail"
            pkg={detailPkg}
            onClose={() => setDetailPkg(null)}
            onBook={(pkg) => openBooking(pkg)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBooking && (
          <BookingModal
            key="booking"
            preselectedPkg={bookingPkg}
            onClose={() => setShowBooking(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
