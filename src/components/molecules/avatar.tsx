import { User } from "lucide-react"

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "w-9 h-9",
  md: "w-12 h-12",
  lg: "w-20 h-20"
}

const iconSizes = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-10 w-10"
}

export const Avatar = ({ src, alt = "User", size = "md" }: AvatarProps) => {
  return (
    <div className={`avatar ${!src ? 'placeholder' : ''}`}>
      <div className={`${sizeClasses[size]} rounded-full ${!src ? 'bg-neutral text-neutral-content' : ''}`}>
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className={iconSizes[size]} />
          </div>
        )}
      </div>
    </div>
  )
}
