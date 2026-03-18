import { useState } from "react";
import { motion } from "framer-motion";
import { X, Train, Plane, CheckCircle2, Loader2 } from "lucide-react";
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
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setStep(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="glass-surface w-full max-w-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                {step === 3 ? "Journey Booked!" : "Book Your Journey"}
              </h2>
              {step !== 3 && (
                <p className="text-muted-foreground text-sm mt-1">
                  {pkg.title} • Step {step} of 2
                </p>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
              <X className="text-foreground" size={20} />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              {/* Package select */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Select Package</label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-secondary border border-foreground/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              {/* Personal info */}
              {(["fullName", "email", "phone"] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm text-muted-foreground mb-1.5 block capitalize">
                    {field === "fullName" ? "Full Name" : field === "email" ? "Email" : "Phone Number"}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-secondary border border-foreground/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={field === "fullName" ? "John Doe" : field === "email" ? "john@email.com" : "+91 98765 43210"}
                  />
                  {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Travel Date</label>
                <input
                  type="date"
                  value={form.travelDate}
                  onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-secondary border border-foreground/10 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.travelDate && <p className="text-destructive text-xs mt-1">{errors.travelDate}</p>}
              </div>

              {/* Travel mode */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMode("train")}
                  className={`p-5 rounded-2xl border transition-all ${
                    mode === "train" ? "border-primary bg-primary/10" : "border-foreground/5 bg-secondary/50"
                  }`}
                >
                  <Train className="mb-2 text-primary" size={22} />
                  <div className="text-left font-bold text-foreground text-sm">Express Train</div>
                  <div className="text-left text-xs text-muted-foreground">₹{pkg.prices.train.toLocaleString("en-IN")}/pp</div>
                </button>
                <button
                  onClick={() => setMode("flight")}
                  className={`p-5 rounded-2xl border transition-all ${
                    mode === "flight" ? "border-mountain bg-mountain/10" : "border-foreground/5 bg-secondary/50"
                  }`}
                >
                  <Plane className="mb-2 text-mountain" size={22} />
                  <div className="text-left font-bold text-foreground text-sm">Premium Flight</div>
                  <div className="text-left text-xs text-muted-foreground">₹{pkg.prices.flight.toLocaleString("en-IN")}/pp</div>
                </button>
              </div>

              {/* People */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-2xl">
                <span className="text-foreground text-sm">Number of Travelers</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPeople(Math.max(1, people - 1))}
                    className="w-8 h-8 rounded-full bg-foreground/10 text-foreground text-lg flex items-center justify-center"
                  >-</button>
                  <span className="text-xl font-mono text-foreground tabular-nums w-6 text-center">{people}</span>
                  <button
                    onClick={() => setPeople(Math.min(20, people + 1))}
                    className="w-8 h-8 rounded-full bg-foreground/10 text-foreground text-lg flex items-center justify-center"
                  >+</button>
                </div>
              </div>

              {/* Total & proceed */}
              <div className="pt-4 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Total Amount</p>
                  <p className="text-3xl font-serif text-foreground">₹{total.toLocaleString("en-IN")}</p>
                </div>
                <button onClick={validateAndProceed} className="btn-primary text-base w-full sm:w-auto">
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="glass-card p-6 space-y-3">
                <h3 className="font-serif text-lg text-foreground">Booking Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="text-foreground">{pkg.title}</span>
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">{form.fullName}</span>
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">{form.email}</span>
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground">{form.phone}</span>
                  <span className="text-muted-foreground">Travel Mode</span>
                  <span className="text-foreground capitalize">{mode}</span>
                  <span className="text-muted-foreground">Travelers</span>
                  <span className="text-foreground">{people}</span>
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{form.travelDate}</span>
                </div>
                <div className="pt-3 border-t border-foreground/10 flex justify-between">
                  <span className="text-muted-foreground font-bold">Total</span>
                  <span className="text-2xl font-serif text-foreground">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-glass flex-1 text-sm">
                  Back
                </button>
                <button onClick={handlePayment} disabled={loading} className="btn-primary flex-1 text-sm flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Processing...
                    </>
                  ) : (
                    `Pay ₹${total.toLocaleString("en-IN")}`
                  )}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                🔒 Secure payment powered by Razorpay. Test mode enabled.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-4">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="text-accent" size={40} />
              </div>
              <h3 className="text-3xl font-serif text-foreground">🎉 Your Journey is Booked!</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Your itinerary and tickets have been sent to <strong className="text-foreground">{form.email}</strong>.
              </p>
              <div className="glass-card p-4 text-sm text-left max-w-xs mx-auto space-y-1">
                <p className="text-muted-foreground">Package: <span className="text-foreground">{pkg.title}</span></p>
                <p className="text-muted-foreground">Date: <span className="text-foreground">{form.travelDate}</span></p>
                <p className="text-muted-foreground">Amount: <span className="text-foreground">₹{total.toLocaleString("en-IN")}</span></p>
              </div>
              <button onClick={onClose} className="mt-6 text-primary font-medium hover:underline">
                Back to Home
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
