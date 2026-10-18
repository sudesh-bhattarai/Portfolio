'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === 'light')
  }, [])

  function toggleTheme() {
    const nextLight = !light
    document.documentElement.dataset.theme = nextLight ? 'light' : 'dark'
    setLight(nextLight)
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${light ? 'dark' : 'light'} theme`}
      aria-pressed={light}
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
      <span>{light ? 'Dark' : 'Light'}</span>
    </button>
  )
}
