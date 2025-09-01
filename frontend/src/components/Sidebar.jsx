import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ items }) {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 hidden md:block shadow-lg">
      <nav className="space-y-3">
        {items.map((it) => (
          <Link
            key={it.href}
            to={it.href}
            className="block px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
