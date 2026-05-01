export type BlogPost = {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "top-safari-destinations-for-2026",
    image:
      "https://images.unsplash.com/photo-1775834501353-e7258e642f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Top Safari Destinations for 2026",
    excerpt:
      "Discover the most exclusive wildlife experiences from Tanzania to Botswana.",
    date: "April 15, 2026",
    category: "Destinations",
    readTime: "5 min read",
    intro:
      "For travelers planning a major safari, the best-fit destination depends less on trend and more on the style of experience you want: dramatic migration scenes, intimate camps, or a slower luxury rhythm.",
    sections: [
      {
        heading: "Tanzania for cinematic first safaris",
        body:
          "Tanzania continues to be the strongest recommendation for travelers who want scale, iconic landscapes, and a classic sense of occasion. The Serengeti delivers the recognizable safari imagery many people dream about, while properties in Ngorongoro or Tarangire add contrast and depth.",
      },
      {
        heading: "Botswana for privacy and polish",
        body:
          "Botswana is often the right answer for repeat safari travelers or anyone prioritizing a more exclusive lodge experience. The service rhythm is refined, helicopter transfers can be part of the appeal, and the Okavango Delta remains one of the most transportive settings in Africa.",
      },
      {
        heading: "Where advisor planning matters most",
        body:
          "Safari is one of the clearest examples of why sequencing and lodge pairing matter. The right combination of camps, transit pacing, and pre- and post-safari stays can make the trip feel smooth instead of overly ambitious.",
      },
    ],
  },
  {
    slug: "luxury-hotels-opening-this-year",
    image:
      "https://images.unsplash.com/photo-1777170191230-3f357b815483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Luxury Hotels Opening This Year",
    excerpt:
      "The most anticipated property launches that should be on your radar.",
    date: "April 10, 2026",
    category: "Hotels",
    readTime: "4 min read",
    intro:
      "New hotel openings are exciting, but not every launch is ideal in its earliest months. The sweet spot is often knowing which openings are worth booking immediately and which are better after the first operational stretch.",
    sections: [
      {
        heading: "What makes an opening worth watching",
        body:
          "The most interesting launches are not just new buildings. They bring a strong location, a point of view in service or design, and enough brand maturity to make the early guest experience feel reliable.",
      },
      {
        heading: "Why timing matters",
        body:
          "An opening can be a great fit for flexible travelers who enjoy novelty and strong introductory value. For milestone trips, I usually look closely at whether the hotel has settled into its service rhythm before making it the centerpiece of an itinerary.",
      },
      {
        heading: "How to use openings in a larger itinerary",
        body:
          "The smartest move is often pairing a newly opened property with a proven favorite elsewhere in the trip. That keeps the itinerary feeling fresh without making every component dependent on a hotel still finding its footing.",
      },
    ],
  },
  {
    slug: "how-to-maximize-your-vip-travel-perks",
    image:
      "https://images.unsplash.com/photo-1771387401938-ab14728f152b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "How to Maximize Your VIP Travel Perks",
    excerpt:
      "Expert tips on getting the most value from luxury hotel programs.",
    date: "April 5, 2026",
    category: "Tips",
    readTime: "6 min read",
    intro:
      "VIP perks sound straightforward on paper, but their real value depends on choosing the right rate, the right property, and the right stay length for the benefit mix to matter.",
    sections: [
      {
        heading: "Focus on total trip value, not just nightly rate",
        body:
          "A preferred-partner rate with breakfast, upgrade priority, and a meaningful property credit can easily outperform a superficially cheaper prepaid rate. The smartest comparison is always the total experience value, not just the headline number.",
      },
      {
        heading: "Choose hotels where perks are likely to be felt",
        body:
          "Some properties operationalize advisor benefits exceptionally well while others treat them as secondary. Knowing where upgrades clear more consistently or where credits stretch further makes a real difference.",
      },
      {
        heading: "Use perks to support the trip style you want",
        body:
          "Perks are most useful when they align with how you actually travel. Breakfast matters more on urban itineraries, resort credits matter more when you plan to linger on property, and flexible arrival privileges matter most on complex long-haul travel days.",
      },
    ],
  },
  {
    slug: "why-shoulder-season-is-the-luxury-sweet-spot",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Why Shoulder Season Is the Luxury Sweet Spot",
    excerpt:
      "A quieter, more graceful way to travel well without sacrificing the experience.",
    date: "March 30, 2026",
    category: "Planning",
    readTime: "4 min read",
    intro:
      "Some of the best luxury trips happen just outside the peak crush. Shoulder season often brings a better ratio of atmosphere to crowding, which is exactly what many travelers are actually looking for.",
    sections: [
      {
        heading: "The pace is often better",
        body:
          "Restaurants are easier to access, transfers feel less chaotic, and hotels can deliver a more attentive rhythm. That subtle reduction in friction tends to improve the overall feeling of the trip.",
      },
      {
        heading: "Value can improve without feeling discounted",
        body:
          "Shoulder season is not about bargain travel. It is about getting stronger experiential value, whether that shows up as better room categories, easier availability, or fewer tradeoffs around the itinerary.",
      },
      {
        heading: "It works especially well for Europe and Japan",
        body:
          "For many high-demand destinations, these windows give you the strongest balance of beauty, comfort, and manageable energy. The exact dates matter, but the principle holds surprisingly often.",
      },
    ],
  },
  {
    slug: "how-to-build-a-two-center-italy-itinerary",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "How to Build a Two-Center Italy Itinerary",
    excerpt:
      "A simple framework for pairing city energy with a softer coastal or countryside finish.",
    date: "March 24, 2026",
    category: "Itineraries",
    readTime: "5 min read",
    intro:
      "Italy trips often improve when they do less. A strong two-center itinerary creates contrast without turning the vacation into a checklist of transfers and constant unpacking.",
    sections: [
      {
        heading: "Start with a tone-setting city",
        body:
          "Rome, Florence, or Milan can work beautifully depending on the traveler, but the point is to begin with energy, dining, and a sense of place before shifting into a slower second act.",
      },
      {
        heading: "Choose one restorative finish",
        body:
          "That might be Lake Como, the Amalfi Coast, Puglia, or the Tuscan countryside. The right answer depends on how social, polished, or quiet you want the back half of the trip to feel.",
      },
      {
        heading: "Protect the rhythm of the itinerary",
        body:
          "The best pairings look effortless from the outside because they avoid unnecessary hops. That usually means fewer bases, better transfer logic, and enough time to settle into each place.",
      },
    ],
  },
];

export const featuredBlogPosts = blogPosts.slice(0, 3);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
