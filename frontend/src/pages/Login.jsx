import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = () => {
    if (usuario.trim() && senha.trim()) {
      navigate('/home')
    } else {
      alert('Preencha todos os campos corretamente.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-blue-300 to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700">Qordem</h1>
          <p className="text-sm text-gray-500 mt-2">Acesse o sistema</p>
        </div>
    
        <div className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm text-gray-700 mb-1">Usuário</label>
            <input
              id="usuario"
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm text-gray-700 mb-1">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
          >
            Entrar
          </button>
        </div>

        <div className="text-center">
          <a href="/recuperar-senha" className="text-sm text-blue-600 hover:underline">
            Esqueceu sua senha?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
