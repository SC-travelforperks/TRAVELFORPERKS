export function Reviews() {
  const reviews = [
    {
      text: "Our honeymoon in Bali was absolutely perfect thanks to the impeccable planning. Every detail was thoughtfully arranged, from our overwater villa to private dining experiences.",
      author: "Sarah & Michael",
      location: "Bali, Indonesia"
    },
    {
      text: "The level of service and attention to detail exceeded all expectations. Our family trip to Italy was seamless, luxurious, and filled with unforgettable moments.",
      author: "The Johnson Family",
      location: "Tuscany, Italy"
    },
    {
      text: "From securing impossible reservations to arranging private tours, every aspect of our anniversary trip was extraordinary. We felt truly taken care of.",
      author: "Jennifer & David",
      location: "Paris & Provence"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Client Experiences</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Hear from travelers who've experienced the difference
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <div key={index} className="text-center">
              <p className="text-muted-foreground leading-relaxed mb-6 italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                "{review.text}"
              </p>
              <div className="text-sm tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>{review.author}</div>
              <div className="text-xs text-accent mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{review.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
