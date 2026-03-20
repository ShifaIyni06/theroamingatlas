import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Train, Plane, CheckCircle2, Loader2, User, Mail, Phone, CalendarDays, Users, ChevronRight, Shield, ArrowLeft, Sparkles } from "lucide-react";
import { PACKAGES, type TravelPackage } from "@/data/packages";
import { z } from "zod";

const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(10, "Enter valid phone number").max(15),
  travelDate: z.string().min(1, "Select a travel date"),
});

interface BookingModalProps {
  preselectedPkg?: TravelPackage | null;
  onClose: () => void;
}

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const BookingModal = ({ preselectedPkg, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedPkgId, setSelectedPkgId] = useState(preselectedPkg?.id || PACKAGES[0].id);
  const [mode, setMode] = useState<"train" | "flight">("train");
  const [people, setPeople] = useState(1);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", travelDate: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const pkg = PACKAGES.find((p) => p.id === selectedPkgId)!;
  const total = pkg.prices[mode] * people;

  const validateAndProceed = () => {
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setStep(3);
  };

  const inputClasses = "w-full p-3.5 pl-11 rounded-xl bg-secondary/80 border border-foreground/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ ease: [0.2, 0, 0, 1], duration: 0.4 }}
        className="glass-surface w-full max-w-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with package image */}
        {step !== 3 && (
          <div className="relative h-32 overflow-hidden">
            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-between px-6 md:px-8">
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-foreground">Book Your Journey</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{pkg.title} • {pkg.duration}</p>
              </div>
              <button onClick={onClose} className="p-2 bg-background/50 backdrop-blur rounded-full hover:bg-background/70 transition-colors">
                <X className="text-foreground" size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step Progress Bar */}
        {step !== 3 && (
          <div className="px-6 md:px-8 pt-5">
            <div className="flex items-center gap-2">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    s <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {s}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${s <= step ? "text-foreground" : "text-muted-foreground"}`}>
                    {s === 1 ? "Details" : "Review & Pay"}
                  </span>
                  {s < 2 && (
                    <div className="flex-1 h-px mx-2">
                      <div className={`h-full transition-all ${step > 1 ? "bg-primary" : "bg-foreground/10"}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Package select */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Select Package</label>
                  <select
                    value={selectedPkgId}
                    onChange={(e) => setSelectedPkgId(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-secondary/80 border border-foreground/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>{p.title} — {p.duration}</option>
                    ))}
                  </select>
                </div>

                {/* Personal info with icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className={inputClasses}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClasses}
                        placeholder="john@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClasses}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Travel Date</label>
                  <div className="relative">
                    <CalendarDays size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      value={form.travelDate}
                      onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  {errors.travelDate && <p className="text-destructive text-xs mt-1">{errors.travelDate}</p>}
                </div>

                {/* Travel mode */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">Travel Mode</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setMode("train")}
                      className={`relative p-4 rounded-xl border-2 transition-all group ${
                        mode === "train"
                          ? "border-primary bg-primary/5 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                          : "border-foreground/10 bg-secondary/30 hover:border-foreground/20"
                      }`}
                    >
                      {mode === "train" && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-primary-foreground" />
                        </div>
                      )}
                      <Train className={`mb-2 ${mode === "train" ? "text-primary" : "text-muted-foreground"}`} size={24} />
                      <div className="text-left font-bold text-foreground text-sm">Express Train</div>
                      <div className="text-left text-lg font-serif text-foreground mt-1">₹{pkg.prices.train.toLocaleString("en-IN")}</div>
                      <div className="text-left text-xs text-muted-foreground">per person</div>
                    </button>
                    <button
                      onClick={() => setMode("flight")}
                      className={`relative p-4 rounded-xl border-2 transition-all group ${
                        mode === "flight"
                          ? "border-mountain bg-mountain/5 shadow-[0_0_20px_-5px_hsl(var(--mountain)/0.3)]"
                          : "border-foreground/10 bg-secondary/30 hover:border-foreground/20"
                      }`}
                    >
                      {mode === "flight" && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-mountain flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-primary-foreground" />
                        </div>
                      )}
                      <Plane className={`mb-2 ${mode === "flight" ? "text-mountain" : "text-muted-foreground"}`} size={24} />
                      <div className="text-left font-bold text-foreground text-sm">Premium Flight</div>
                      <div className="text-left text-lg font-serif text-foreground mt-1">₹{pkg.prices.flight.toLocaleString("en-IN")}</div>
                      <div className="text-left text-xs text-muted-foreground">per person</div>
                    </button>
                  </div>
                </div>

                {/* People counter */}
                <div className="flex items-center justify-between p-4 glass-card">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-muted-foreground" />
                    <span className="text-foreground text-sm font-medium">Number of Travelers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      className="w-9 h-9 rounded-full bg-secondary border border-foreground/10 text-foreground text-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    >−</button>
                    <span className="text-xl font-serif text-foreground tabular-nums w-6 text-center">{people}</span>
                    <button
                      onClick={() => setPeople(Math.min(20, people + 1))}
                      className="w-9 h-9 rounded-full bg-secondary border border-foreground/10 text-foreground text-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Total & proceed */}
                <div className="pt-4 border-t border-foreground/10">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Amount</p>
                      <p className="text-3xl font-serif text-foreground">₹{total.toLocaleString("en-IN")}</p>
                      <p className="text-xs text-muted-foreground">{people} traveler{people > 1 ? "s" : ""} × ₹{pkg.prices[mode].toLocaleString("en-IN")}</p>
                    </div>
                    <button onClick={validateAndProceed} className="btn-primary text-base w-full sm:w-auto flex items-center justify-center gap-2">
                      Review Booking <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 space-y-4">
                  <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" /> Booking Summary
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Package", value: `${pkg.title} (${pkg.duration})` },
                      { label: "Traveler", value: form.fullName },
                      { label: "Email", value: form.email },
                      { label: "Phone", value: form.phone },
                      { label: "Travel Mode", value: mode === "train" ? "🚂 Express Train" : "✈️ Premium Flight" },
                      { label: "Travelers", value: `${people} person${people > 1 ? "s" : ""}` },
                      { label: "Travel Date", value: new Date(form.travelDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-2 border-b border-foreground/5 last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm text-foreground font-medium text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t-2 border-foreground/10 flex justify-between items-center">
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider">Total Payable</span>
                    <span className="text-3xl font-serif text-foreground">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-glass flex-1 text-sm flex items-center justify-center gap-2">
                    <ArrowLeft size={16} /> Edit Details
                  </button>
                  <button onClick={handlePayment} disabled={loading} className="btn-primary flex-1 text-sm flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Processing...
                      </>
                    ) : (
                      <>Pay ₹{total.toLocaleString("en-IN")}</>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield size={14} className="text-accent" />
                  <span>Secure payment powered by Razorpay • 256-bit SSL encryption</span>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                className="py-10 text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-accent/15 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="text-accent" size={48} />
                </motion.div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-serif text-foreground">Journey Booked!</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    Confirmation & itinerary sent to <strong className="text-foreground">{form.email}</strong>
                  </p>
                </div>

                <div className="glass-card p-5 max-w-sm mx-auto text-left space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={pkg.image} alt={pkg.title} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <p className="font-serif text-foreground">{pkg.title}</p>
                      <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                    </div>
                  </div>
                  <div className="border-t border-foreground/10 pt-3 space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="text-foreground">{new Date(form.travelDate).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Travelers</span>
                      <span className="text-foreground">{people}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mode</span>
                      <span className="text-foreground">{mode === "train" ? "🚂 Train" : "✈️ Flight"}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-foreground/10">
                      <span className="text-foreground">Amount Paid</span>
                      <span className="text-foreground">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <button onClick={onClose} className="btn-primary mt-4 px-8">
                  Back to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
