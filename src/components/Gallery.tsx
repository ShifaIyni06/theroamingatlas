import { motion } from "framer-motion";

const images = [
  "/gallery/IMG_3896.jpg",
  "/gallery/IMG_3935.jpg",
  "/gallery/IMG_3987.jpg",
  "/gallery/IMG_4005.jpg",
  "/gallery/IMG_4123.jpg",
  "/gallery/IMG_4134.jpg",
  "/gallery/IMG_4145.jpg",
  "/gallery/IMG_4179.jpg",
  "/gallery/IMG_4200.jpg",
  "/gallery/IMG_4239.jpg",
  "/gallery/IMG_4246.jpg",
  "/gallery/IMG_4266.jpg",
  "/gallery/IMG_4274.jpg",
  "/gallery/IMG_4284.jpg",
  "/gallery/IMG_4431.jpg",
  "/gallery/IMG_4535.jpg",
  "/gallery/IMG_4587.jpg",
  "/gallery/IMG_4614.jpg",
  "/gallery/IMG_4620.jpg",
  "/gallery/IMG_4798.jpg",
  "/gallery/IMG_4831.jpg",
  "/gallery/IMG_4855.jpg",
  "/gallery/IMG_4862.jpg",
  "/gallery/IMG_4889.jpg",
  "/gallery/IMG_4936.jpg",
  "/gallery/IMG_4942.jpg",
  "/gallery/IMG_4947.jpg",
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">

      {/* Heading */}
      <div className="mb-12 text-center">
        <p className="text-sm text-primary/80 tracking-wide mb-2">
          Captured Moments
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground">
          Travel Gallery
        </h2>
      </div>

      {/* Masonry Layout */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-2xl break-inside-avoid cursor-pointer"
          >
            <img
              src={img}
              alt={`gallery-${i}`}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Gallery;
