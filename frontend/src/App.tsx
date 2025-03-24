import './App.css'
import { Container } from '@mui/material'
import { Header } from './components/Layout/Header'
import { CitySearch } from './components/Weather/CitySearch'
import { MostViewedCities } from './components/Weather/MostViewedCities'

function App() {
  return (
    <>
      <Header />
      <Container>
        <CitySearch />
        <MostViewedCities />
      </Container>
    </>
  )
}

export default App
