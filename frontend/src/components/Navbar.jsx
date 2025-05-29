import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const linkStyle = {
  color: '#ef7d00',
  textDecoration: 'none',
  fontWeight: '500'
}

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/home" className="text-3xl font-extrabold text-blue-700 tracking-tight">
          Qordem
        </Link>

        <div className="flex items-center gap-6">
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/home/visitantes" style={linkStyle}>Visitantes</Link>
            <Link to="/home/visitas" style={linkStyle}>Visitas</Link>
            <Link to="/home/empresas" style={linkStyle}>Empresas</Link>
            <Link to="/home/ordens-servico" style={linkStyle}>Ordens</Link>
          </nav>

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-500 hover:underline"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
