import { AppBar, Toolbar, Typography, Container } from '@mui/material'

export function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="h1">
            Weather App
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
