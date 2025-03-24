import './App.css'
import { Container } from '@mui/material'
import { Header } from './components/Layout/Header'
import { CitySearch } from './components/Weather/CitySearch'

function App() {
  return (
    <>
      <Header />
      <Container>
        <CitySearch />
      </Container>
    </>
  )
}

export default App
