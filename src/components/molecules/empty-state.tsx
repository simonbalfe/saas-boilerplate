import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mb-6">
        <Icon className="h-12 w-12 opacity-50" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-base-content/60 max-w-md mx-auto">{description}</p>
    </div>
  )
}
