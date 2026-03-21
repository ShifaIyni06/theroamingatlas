import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Priya Sharma", location: "Mumbai", text: "The Himalayan Harmony trip was life-changing. Every detail was perfect — from the train journey to the mountain stays.", rating: 5 },
  { name: "Arjun Patel", location: "Delhi", text: "Golden Sands gave us a royal Rajasthan experience. The desert camp under the stars was absolutely magical.", rating: 5 },
  { name: "Sneha Nair", location: "Bangalore", text: "Kerala's backwaters with The Roaming Atlas was the most serene holiday I've ever had. Can't wait for the next one!", rating: 5 },
];

const Testimonials = () => (
  <section className="section-padding">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className="text-center mb-16"
    >
      <p className="font-sans italic text-2xl md:text-3xl text-primary mb-6">Traveler Stories</p>
      <h2 className="text-4xl md:text-5xl font-serif text-foreground">Voices from the Road</h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
          className="glass-card p-8"
        >
          <div className="flex gap-1 mb-4">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} className="text-primary fill-primary" size={16} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
          <div>
            <p className="font-serif text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.location}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Testimonials;
