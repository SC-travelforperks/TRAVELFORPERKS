import {
  Anchor,
  BadgePercent,
  Binoculars,
  Building2,
  Flame,
  Gem,
  Gift,
  Globe,
  Sparkles,
  Ticket,
  Zap,
} from "lucide-react"

const badgeStyles: Record<string, string> = {
  Featured:
    "border-[#d8bf96]/70 bg-[#f6ecda]/92 text-[#6f5334]",
  "Hot Deal":
    "border-[#c85c45]/45 bg-[#fff0ea]/92 text-[#a34632]",
  "Limited Slots":
    "border-[#6f7f67]/45 bg-[#edf4ea]/92 text-[#4f6546]",
  New:
    "border-[#6b8aa1]/45 bg-[#edf5fb]/92 text-[#3f647e]",
}

export function getDealBadgeClassName(badge: string) {
  return badgeStyles[badge] ?? "border-black/10 bg-white/90 text-primary"
}

const badgeIcons: Record<string, typeof Gem> = {
  Featured: Gem,
  "Hot Deal": Flame,
  "Limited Slots": Ticket,
  New: Sparkles,
}

export function DealBadgeIcon({ badge }: { badge: string }) {
  const Icon = badgeIcons[badge] ?? Sparkles
  return <Icon className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
}

const typeIcons: Record<string, typeof Building2> = {
  Hotel: Building2,
  Safari: Binoculars,
  Cruise: Anchor,
  Activity: Zap,
  Destination: Globe,
  Package: Gift,
}

export function DealTypeIcon({ type }: { type: string }) {
  const Icon = typeIcons[type] ?? BadgePercent
  return <Icon className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
}

export const dealTypeLabels: Record<string, string> = {
  Hotel: "Hotels",
  Safari: "Safaris",
  Cruise: "Cruises",
  Activity: "Activities",
  Destination: "Destinations",
  Package: "Packages",
}
