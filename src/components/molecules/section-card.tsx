import { ReactNode } from "react"

interface SectionCardProps {
  title: string
  children: ReactNode
}

export const SectionCard = ({ title, children }: SectionCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title border-b border-base-200 pb-2 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}
