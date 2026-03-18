import { motion } from "framer-motion";
import { Shield, MapPin, Users, Headphones } from "lucide-react";

const REASONS = [
  { icon: Shield, title: "100% Safe & Secure", desc: "Verified stays, insured travel, and 24x7 emergency support on every trip." },
  { icon: MapPin, title: "Handpicked Destinations", desc: "Every route is curated by travel experts who have walked the same paths." },
  { icon: Users, title: "Small Group Experiences", desc: "Intimate groups of 15-25 travelers for personal, unforgettable journeys." },
  { icon: Headphones, title: "24x7 Trip Manager", desc: "A dedicated tour manager travels with you — handling every detail." },
];

const WhyChooseUs = () => (
  <section id="about" className="section-padding">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className="text-center mb-16"
    >
      <p className="font-cursive text-2xl text-primary mb-2">Why travel with us</p>
      <h2 className="text-4xl md:text-5xl font-serif text-foreground">Built for Unforgettable Journeys</h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {REASONS.map((r, i) => (
        <motion.div
          key={r.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
          className="glass-card p-8 text-center hover:border-primary/30 transition-colors duration-300"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <r.icon className="text-primary" size={24} />
          </div>
          <h3 className="font-serif text-lg text-foreground mb-2">{r.title}</h3>
          <p className="text-sm text-muted-foreground">{r.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
