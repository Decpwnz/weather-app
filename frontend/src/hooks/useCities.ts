import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './useAppDispatch'
import { fetchCities } from '../store/slices/weatherSlice'

export const useCities = () => {
  const dispatch = useAppDispatch()
  const cities = useAppSelector((state) => state.weather.cities)
  const loading = useAppSelector((state) => state.weather.loading)

  useEffect(() => {
    dispatch(fetchCities())
  }, [dispatch])

  return { cities, loading }
}
