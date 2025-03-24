import { useLocalStorage } from './useLocalStorage'

const MAX_RECENT_CITIES = 3

export function useRecentCities() {
  const [recentCities, setRecentCities] = useLocalStorage<string[]>('recentCities', [])

  const addRecentCity = (city: string) => {
    setRecentCities((prev) => {
      const filtered = prev.filter((c) => c !== city)
      return [city, ...filtered].slice(0, MAX_RECENT_CITIES)
    })
  }

  return {
    recentCities,
    addRecentCity,
  }
}
