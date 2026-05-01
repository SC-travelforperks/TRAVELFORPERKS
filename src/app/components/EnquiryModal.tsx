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
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="relative bg-white max-w-2xl w-full mx-4 p-8 md:p-12 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl text-muted-foreground hover:text-foreground"
        >
          ×
        </button>

        <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Plan Your Journey</h2>
        <p className="text-muted-foreground mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Share your travel dreams with us</p>

        <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-border bg-input-background focus:outline-none focus:border-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-border bg-input-background focus:outline-none focus:border-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Dream Destination</label>
            <input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full px-4 py-3 border border-border bg-input-background focus:outline-none focus:border-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Travel Dates</label>
            <input
              type="text"
              placeholder="e.g., June 2026"
              value={formData.dates}
              onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
              className="w-full px-4 py-3 border border-border bg-input-background focus:outline-none focus:border-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Tell Us About Your Trip</label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-border bg-input-background focus:outline-none focus:border-accent resize-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-4 text-sm tracking-[0.15em] hover:bg-opacity-90 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            SUBMIT ENQUIRY
          </button>
        </form>
      </div>
    </div>
  );
}
