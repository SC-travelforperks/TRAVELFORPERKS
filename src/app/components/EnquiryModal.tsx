import { useState } from 'react';

export function EnquiryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    dates: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will be in touch shortly.');
    onClose();
    setFormData({ name: '', email: '', destination: '', dates: '', message: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-card p-5 sm:p-8 md:p-12">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl text-muted-foreground hover:text-foreground sm:right-6 sm:top-6"
        >
          ×
        </button>

        <h2
          className="mb-3 pr-8 text-3xl uppercase tracking-[0.05em] md:text-4xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Plan Your Journey
        </h2>
        <p
          className="mb-6 text-sm leading-7 text-muted-foreground sm:mb-8 sm:text-base"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Share your travel dreams with us.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <div>
            <label className="mb-2 block text-sm tracking-[0.12em] uppercase">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-border bg-input-background px-4 py-3 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm tracking-[0.12em] uppercase">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-border bg-input-background px-4 py-3 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm tracking-[0.12em] uppercase">Dream Destination</label>
            <input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full border border-border bg-input-background px-4 py-3 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm tracking-[0.12em] uppercase">Travel Dates</label>
            <input
              type="text"
              placeholder="e.g., June 2026"
              value={formData.dates}
              onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
              className="w-full border border-border bg-input-background px-4 py-3 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm tracking-[0.12em] uppercase">Tell Us About Your Trip</label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none border border-border bg-input-background px-4 py-3 focus:border-accent focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full border border-accent bg-accent py-4 text-[11px] tracking-[0.24em] text-white transition-all hover:opacity-90"
          >
            SUBMIT ENQUIRY
          </button>
        </form>
      </div>
    </div>
  );
}
