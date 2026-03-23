import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  const next = () => setIndex((prev) => (prev! + 1) % images.length);
  const prev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));

  // 🔥 Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  return (
    <section id="gallery" className="scroll-mt-24 py-20 px-6 max-w-7xl mx-auto">

      {/* 🔥 HEADER */}
      <div className="text-center mb-12">
        <p className="text-sm text-primary/80 tracking-wide mb-2">
          Captured Moments
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">
          Travel Gallery
        </h2>

        <button onClick={() => setOpen(true)} className="btn-primary text-lg">
          View Gallery
        </button>
      </div>

      {/* 🔥 FULL GALLERY MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl z-50"
            >
              ✕
            </button>

            {/* GRID */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4 mt-16">
              {images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIndex(i)}
                  className="rounded-xl cursor-pointer transition"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 LIGHTBOX VIEWER */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIndex(null)}
          >
            {/* LEFT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 text-white text-5xl opacity-70 hover:opacity-100"
            >
              ‹
            </button>

            {/* IMAGE */}
            <motion.img
              key={images[index]}
              src={images[index]}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) next();
                if (info.offset.x > 100) prev();
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="max-h-[85%] max-w-[90%] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* RIGHT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 text-white text-5xl opacity-70 hover:opacity-100"
            >
              ›
            </button>

            {/* CLOSE */}
            <button
              onClick={() => setIndex(null)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            {/* COUNTER */}
            <div className="absolute bottom-6 text-white text-sm opacity-80">
              {index + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Gallery;
