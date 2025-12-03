import { LucideIcon } from "lucide-react"

interface InfoRowProps {
  icon: LucideIcon
  label: string
  value: string
}

export const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
      <div className="p-2 bg-base-200 rounded-lg text-base-content/70">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-base-content/60">{label}</p>
        <p className="font-medium text-base-content">{value}</p>
      </div>
    </div>
  )
}
