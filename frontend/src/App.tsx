import './App.css'
import { Container } from '@mui/material'
import { Header } from './components/Layout/Header'
import { CitySearch } from './components/Weather/CitySearch'
import { MostViewedCities } from './components/Weather/MostViewedCities'
import { CurrentWeather } from './components/Weather/CurrentWeather'

function App() {
  return (
    <>
      <Header />
      <Container>
        <CitySearch />
        <MostViewedCities />
        <CurrentWeather />
      </Container>
    </>
  )
}

export default App
