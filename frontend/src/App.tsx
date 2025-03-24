import './App.css'
import { Container } from '@mui/material'
import { Header } from './components/Layout/Header'
import { CitySearch } from './components/Weather/CitySearch'
import { MostViewedCities } from './components/Weather/MostViewedCities'
import { CurrentWeather } from './components/Weather/CurrentWeather'
import { ForecastWeather } from './components/Weather/ForecastWeather'
function App() {
  return (
    <>
      <Header />
      <Container>
        <CitySearch />
        <MostViewedCities />
        <CurrentWeather />
        <ForecastWeather />
      </Container>
    </>
  )
}

export default App
