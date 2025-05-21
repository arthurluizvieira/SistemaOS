import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import RecuperarSenha from './pages/RecuperarSenha'
import Home from './pages/Home'
import Visitantes from './pages/Visitantes'
import Visitas from './pages/Visitas'
import Empresas from './pages/Empresas'
import OrdensServico from './pages/OrdensServico'
import Navbar from './components/Navbar'

function App() {
  const location = useLocation()
  const hideNavbar = ["/", "/recuperar-senha"].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/visitantes" element={<Visitantes />} />
        <Route path="/home/visitas" element={<Visitas />} />
        <Route path="/home/empresas" element={<Empresas />} />
        <Route path="/home/ordem_de_servico" element={<OrdensServico />} />
      </Routes>
    </>
  )
}

export default App
