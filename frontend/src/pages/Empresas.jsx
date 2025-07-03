import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import CadastroEmpresaModal from '../modals/CadastroEmpresaModal'
import Swal from 'sweetalert2'

function Empresas() {
  const [empresas, setEmpresas] = useState([])
  const [busca, setBusca] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    buscarEmpresas()
  }, [])

  const buscarEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/empresas/')
      setEmpresas(response.data)
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
    }
  }

  const adicionarEmpresa = async (novaEmpresa) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/empresas', novaEmpresa)
      Swal.fire('Sucesso', 'Empresa registrada com sucesso!', 'sucess')
      buscarEmpresas()
      return true
    } catch (error) {
      if (error.response?.data) {
        const mensagensErro = Object.values(error.response.data).flat().join('\n')
        Swal.fire('Erro', mensagensErro || 'Erro ao cadastrar empresa.', 'error')
      } else {
        Swal.fire('Erro', mensagensErro || 'Erro de conexão com o servidor. Tente novamente mais tarde.', 'error')
      }
      return false
    }
  }

  const atualizarEmpresa = async (empresaAtualizada) => {
    try {
      await axios.put(`http://localhost:8000/api/empresas/${empresaAtualizada.id}/`, empresaAtualizada)
      buscarEmpresas()
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error)
    }
  }

  const deletarEmpresa = async (id) => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
    })

    if (confirmacao.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/empresas/${id}/`)
        Swal.fire('Deletado!', 'Empresa removida com sucesso.', 'success')
        buscarEmpresas()
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível deletar a empresa.', 'error')
      }
    }
  }

  
  const empresasFiltradas = empresas.filter((e) =>
    (e.Nome || '').toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Empresas</h2>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + Cadastrar nova empresa
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar empresa por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">CNPJ</th>
                <th className="px-4 py-3">Contato</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {empresasFiltradas.map((e) => (
                <tr key={e.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{e.Nome}</td>
                  <td className="px-4 py-3">{e.cnpj}</td>
                  <td className="px-4 py-3">{e.Contato}</td>
                </tr>
              ))}
              {empresasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-6 text-gray-500">
                    Nenhuma empresa encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <CadastroEmpresaModal
          onClose={() => setMostrarModal(false)}
          onSalvar={adicionarEmpresa}
        />
      )}
    </div>
  )
}

export default Empresas
