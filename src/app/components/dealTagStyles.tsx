import {
  AlarmClock,
  Flame,
  Gem,
  Sparkles,
  Ticket,
} from "lucide-react"

const tagStyles: Record<string, string> = {
  Featured:
    "border-[#d8bf96]/70 bg-[#f6ecda]/92 text-[#6f5334]",
  "Hot Deal":
    "border-[#c85c45]/45 bg-[#fff0ea]/92 text-[#a34632]",
  "Ending Soon":
    "border-[#9a4d4d]/45 bg-[#fbe9e6]/92 text-[#8a3a3a]",
  "Limited Slots":
    "border-[#6f7f67]/45 bg-[#edf4ea]/92 text-[#4f6546]",
  New:
    "border-[#6b8aa1]/45 bg-[#edf5fb]/92 text-[#3f647e]",
}

export function getDealTagClassName(tag: string) {
  return (
    tagStyles[tag] ??
    "border-black/10 bg-white/90 text-primary"
  )
}

const tagIcons: Record<string, typeof Gem> = {
  Featured: Gem,
  "Hot Deal": Flame,
  "Ending Soon": AlarmClock,
  "Limited Slots": Ticket,
  New: Sparkles,
}

export function DealTagIcon({ tag }: { tag: string }) {
  const Icon = tagIcons[tag] ?? Sparkles

  return <Icon className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
}
