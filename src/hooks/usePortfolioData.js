import { useState, useEffect } from 'react'

export function usePortfolioData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/portfolio.txt')
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load portfolio.txt (${r.status})`)
        return r.text()
      })
      .then(text => {
        const parsed = JSON.parse(text)
        setData(parsed)
      })
      .catch(err => {
        console.error('Error loading portfolio data:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
