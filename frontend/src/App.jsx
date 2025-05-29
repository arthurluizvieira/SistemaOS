// import { Routes, Route, useLocation } from 'react-router-dom'
// import Login from './pages/Login'
// import CadastroUsuario from './pages/CadastroUsuario'
// import RecuperarSenha from './pages/RecuperarSenha'
// import Home from './pages/Home'
// import Visitantes from './pages/Visitantes'
// import Visitas from './pages/Visitas'
// import Empresas from './pages/Empresas'
// import OrdensServico from './pages/OrdensServico'
// import Navbar from './components/Navbar'

// function App() {
//   const location = useLocation()
//   const hideNavbar = ["/", "/recuperar-senha"].includes(location.pathname)

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/recuperar-senha" element={<RecuperarSenha />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/home/visitantes" element={<Visitantes />} />
//         <Route path="/home/visitas" element={<Visitas />} />
//         <Route path="/home/empresas" element={<Empresas />} />
//         <Route path="/home/ordem_de_servico" element={<OrdensServico />} />
//         <Route path="/cadastro" element={<CadastroUsuario />} />
//       </Routes>
//     </>
//   )
// }

// export default App


// Protegendo as rotas

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import CadastroUsuario from './pages/CadastroUsuario'
import RecuperarSenha from './pages/RecuperarSenha'
import Home from './pages/Home'
import Visitantes from './pages/Visitantes'
import Visitas from './pages/Visitas'
import Empresas from './pages/Empresas'
import OrdensServico from './pages/OrdensServico'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const location = useLocation()
  const hideNavbar = ["/", "/recuperar-senha"].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />

        {/* Rotas protegidas */}
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/home/visitantes" element={
          <PrivateRoute>
            <Visitantes />
          </PrivateRoute>
        } />
        <Route path="/home/visitas" element={
          <PrivateRoute>
            <Visitas />
          </PrivateRoute>
        } />
        <Route path="/home/empresas" element={
          <PrivateRoute>
            <Empresas />
          </PrivateRoute>
        } />
        <Route path="/home/ordem_de_servico" element={
          <PrivateRoute>
            <OrdensServico />
          </PrivateRoute>
        } />
      </Routes>
    </>
  )
}

export default App
