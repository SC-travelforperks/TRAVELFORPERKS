export type GalleryItem = {
  id: string;
  image: string;
  title: string;
  caption: string;
  tag: "hotel" | "food" | "location" | "experience";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "amalfi-cliffside-breakfast",
    image:
      "https://images.unsplash.com/photo-1767356498998-fc67c0101742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Cliffside Breakfast",
    caption: "A slow Amalfi morning with sea views, citrus pastries, and terrace service.",
    tag: "food",
  },
  {
    id: "kyoto-courtyard-stay",
    image:
      "https://images.unsplash.com/photo-1768679679336-16c7ae6b2b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Kyoto Courtyard Stay",
    caption: "A tucked-away stay where traditional design meets polished modern calm.",
    tag: "hotel",
  },
  {
    id: "santorini-harbor-scene",
    image:
      "https://images.unsplash.com/photo-1764831525958-7c74633f63d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Santorini Harbor",
    caption: "Late afternoon light over the caldera and a harbor lined with elegant boats.",
    tag: "location",
  },
  {
    id: "desert-camp-dinner",
    image:
      "https://images.unsplash.com/photo-1761810399682-a30e47737bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Desert Camp Dinner",
    caption: "An atmospheric private dinner setup under the stars after a golden-hour drive.",
    tag: "experience",
  },
  {
    id: "paris-suite-detail",
    image:
      "https://images.unsplash.com/photo-1770334655849-2c074d03d9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Paris Suite Detail",
    caption: "Soft textures, balcony doors, and the kind of room that makes lingering easy.",
    tag: "hotel",
  },
  {
    id: "tokyo-omakase-moment",
    image:
      "https://images.unsplash.com/photo-1760681543363-0cd6f4ad8675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Tokyo Omakase",
    caption: "A beautifully paced omakase evening with standout seasonal courses.",
    tag: "food",
  },
  {
    id: "cape-winelands-drive",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Cape Winelands Drive",
    caption: "Rolling vineyard views and a route made for a long unhurried afternoon.",
    tag: "location",
  },
  {
    id: "maldives-sunset-sailing",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    title: "Sunset Sailing",
    caption: "A warm-weather favorite: champagne, calm water, and a fading horizon.",
    tag: "experience",
  },
];

export const featuredGalleryItems = galleryItems.slice(0, 6);
