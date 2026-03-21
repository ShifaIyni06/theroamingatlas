import { MapPin, Phone, Mail } from "lucide-react";

const socialLinks = [
  { name: "Instagram", link: "https://instagram.com/theroamingatlas.official_" },
  { name: "Facebook", link: "https://facebook.com/" }
];

const Footer = () => (
  <footer id="contact" className="border-t border-foreground/5 bg-secondary/20">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-serif text-foreground mb-4">THE ROAMING ATLAS</h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Curated travel experiences across India. We craft journeys that blend luxury, culture, and adventure into unforgettable memories.
          </p>
          <div className="flex gap-4 mt-6">
  {socialLinks.map((s) => (
    <a 
  key={s.name}
  href={s.link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-xs text-muted-foreground hover:text-primary transition-colors"
>
  {s.name}
</a>
  ))}
</div>
        </div>

        <div>
          <h4 className="font-serif text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Home", "Destinations", "Packages", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-foreground mb-4">Contact Us</h4>
          <div className="space-y-3">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
       <MapPin size={14} className="text-primary" />
    1st Floor, Neelkanth Bhavan, 1-19-72/50, Hi-Tension Rd, near TVS Workshop, Kapra, Hyderabad, Telangana - 500062
  </p>

  <a href="tel:+919121014210" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
    <Phone size={14} className="text-primary" />
    +91 91210 14210
  </a>

  <a href="mailto:roamingatlas@zohomail.in" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
    <Mail size={14} className="text-primary" />
    roamingatlas@zohomail.in
  </a>

</div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-foreground/5 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} The Roaming Atlas. All rights reserved. Crafted with ❤️ for wanderers.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
