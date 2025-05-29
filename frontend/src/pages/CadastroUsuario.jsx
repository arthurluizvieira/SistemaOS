import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function CadastroUsuario() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const handleCadastro = async (e) => {
    e.preventDefault()

    if (!nome || !email || !senha || !confirmarSenha) {
      Swal.fire('Erro', 'Todos os campos são obrigatórios!', 'error')
      return
    }

    if (senha !== confirmarSenha) {
      Swal.fire('Erro', 'As senhas não coincidem!', 'error')
      return
    }

    try {
      await axios.post('http://localhost:8000/api/usuarios/', {
        nome,
        email,
        password: senha
      })

      Swal.fire('Sucesso', 'Usuário cadastrado com sucesso!', 'success')
      navigate('/login')
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      Swal.fire('Erro', 'Não foi possível cadastrar o usuário.', 'error')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-200">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-700">Cadastro de Usuário</h2>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center text-sm">
          Já tem uma conta?{' '}
          <a href="/" className="text-blue-600 hover:underline">Faça login</a>
        </div>
      </div>
    </div>
  )
}

export default CadastroUsuario
