"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Palette } from "lucide-react"

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"
]

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
       <button className="btn btn-ghost btn-block justify-start gap-3">
        <Palette className="h-5 w-5" />
        <span className="font-medium">Theme</span>
      </button>
    )
  }

  return (
    <div className="dropdown dropdown-top w-full">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-block justify-start gap-3">
        <Palette className="h-5 w-5" />
        <span className="font-medium">Theme</span>
        <span className="text-xs opacity-50 ml-auto capitalize">{theme}</span>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto flex-nowrap block">
        {themes.map((t) => (
          <li key={t}>
            <button 
              onClick={() => setTheme(t)}
              className={`${theme === t ? 'active' : ''} capitalize`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

