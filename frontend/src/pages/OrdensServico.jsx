import { useState, useEffect } from 'react'
import axios from 'axios'
import CadastroOrdemServicoModal from '../modals/CadastroOrdemServicoModal'

function OrdensServico() {
  const [busca, setBusca] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [ordens, setOrdens] = useState([])

  useEffect(() => {
    buscarOrdens()
  }, [])

  const buscarOrdens = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ordem_de_servico/')
      setOrdens(response.data)
    } catch (error) {
      console.error('Erro ao buscar ordens:', error)
    }
  }

  const adicionarOrdem = async (novaOrdem) => {
    try {
      await axios.post('http://localhost:8000/api/ordem_de_servico/', novaOrdem)
      buscarOrdens()
    } catch (error) {
      console.error('Erro ao adicionar ordem:', error)
    }
  }

  const ordensFiltradas = ordens.filter(o =>
    o.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    o.status.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Ordens de Serviço</h2>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + Cadastrar nova ordem
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar ordem por título ou status..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {ordensFiltradas.map(o => (
                <tr key={o.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{o.titulo}</td>
                  <td className="px-4 py-3">{o.descricao}</td>
                  <td className="px-4 py-3">{o.status}</td>
                </tr>
              ))}
              {ordensFiltradas.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-6 text-gray-500">
                    Nenhuma ordem encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <CadastroOrdemServicoModal
          onClose={() => setMostrarModal(false)}
          onSalvar={adicionarOrdem}
        />
      )}
    </div>
  )
}

export default OrdensServico
