import { useEffect, useState } from 'react'
import { API_URL } from './config.js'

export default function VisitCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    // Only increment once per browser session/tab — refreshing the page
    // shouldn't inflate the count.
    if (sessionStorage.getItem('counted')) return

    fetch(`${API_URL}/api/visits`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === 'number') {
          setCount(data.count)
          sessionStorage.setItem('counted', 'true')
        }
      })
      .catch(() => {
        // Fails silently — a broken counter shouldn't break the page.
      })
  }, [])

  if (count === null) return null

  return (
    <div className="visit-counter">
      visitor <span className="hl">#{count}</span>
    </div>
  )
}
