import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  description: string | ReactNode
  icon: LucideIcon
}

export const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => {
  return (
    <div className="stats shadow w-full bg-base-100 rounded-box">
      <div className="stat">
        <div className="stat-figure text-primary">
          <Icon className="h-8 w-8" />
        </div>
        <div className="stat-title">{title}</div>
        <div className="stat-value text-2xl">{value}</div>
        <div className="stat-desc">{description}</div>
      </div>
    </div>
  )
}
