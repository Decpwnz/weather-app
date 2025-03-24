import { useLocalStorage } from './useLocalStorage'

interface CityView {
  name: string
  views: number
  lastViewed: number
}

export function useMostViewedCities() {
  const [cityViews, setCityViews] = useLocalStorage<CityView[]>('cityViews', [])

  const addCityView = (cityName: string) => {
    setCityViews((prev) => {
      const now = Date.now()
      const existing = prev.find((c) => c.name === cityName)

      const updatedCities = existing
        ? prev.map((city) =>
            city.name === cityName ? { ...city, views: city.views + 1, lastViewed: now } : city
          )
        : [...prev, { name: cityName, views: 1, lastViewed: now }]

      return updatedCities.sort((a, b) => b.views - a.views)
    })
  }

  const topThreeCities = cityViews.slice(0, 3)

  return {
    mostViewedCities: topThreeCities.map((c) => c.name),
    cityViewsDetails: cityViews,
    addCityView,
  }
}
