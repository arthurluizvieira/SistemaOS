import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import CadastroVisitanteModal from '../modals/CadastroVisitanteModal'
import EditarVisitanteModal from '../modals/EditarVisitanteModal'

function Visitantes() {
  const [busca, setBusca] = useState('')
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false)
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false)
  const [visitantes, setVisitantes] = useState([])
  const [visitanteSelecionado, setVisitanteSelecionado] = useState(null)

  useEffect(() => {
    buscarVisitantes()
  }, [])

  const buscarVisitantes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/visitantes/')
      setVisitantes(response.data)
    } catch (error) {
      console.error('Erro ao buscar visitantes:', error)
    }
  }

  const adicionarVisitante = async (novoVisitante) => {
    try {
      await axios.post('http://localhost:8000/api/visitantes/', novoVisitante)
      buscarVisitantes()
    } catch (error) {
      console.error('Erro ao adicionar visitante:', error)
    }
  }

  const atualizarVisitante = async (visitanteAtualizado) => {
    try {
      await axios.put(`http://localhost:8000/api/visitantes/${visitanteAtualizado.id}/`, visitanteAtualizado)
      buscarVisitantes()
    } catch (error) {
      console.error('Erro ao atualizar visitante:', error)
    }
  }

  const deletarVisitante = async (id) => {
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
        await axios.delete(`http://localhost:8000/api/visitantes/${id}/`)
        Swal.fire('Deletado!', 'Visitante removido com sucesso.', 'success')
        buscarVisitantes()
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível deletar o visitante.', 'error')
      }
    }
  }

  const visitantesFiltrados = visitantes.filter(v =>
    v.nome.toLowerCase().includes(busca.toLowerCase()) ||
    v.documento.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Visitantes</h2>
          <button
            onClick={() => setMostrarModalCadastro(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + Cadastrar novo visitante
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar visitante por nome ou documento..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {visitantesFiltrados.map(v => (
                <tr key={v.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{v.nome}</td>
                  <td className="px-4 py-3">{v.documento}</td>
                  <td className="px-4 py-3">{v.empresa}</td>
                  <td className="px-4 py-3">{v.telefone}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setVisitanteSelecionado(v)
                        setMostrarModalEdicao(true)
                      }}
                      className="px-3 py-1 bg-yellow-400 rounded-md text-white hover:bg-yellow-500 transition text-xs font-semibold"
                      title="Editar visitante"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarVisitante(v.id)}
                      className="px-3 py-1 bg-red-500 rounded-md text-white hover:bg-red-600 transition text-xs font-semibold"
                      title="Deletar visitante"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
              {visitantesFiltrados.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-6 text-gray-500">
                    Nenhum visitante encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModalCadastro && (
        <CadastroVisitanteModal
          onClose={() => setMostrarModalCadastro(false)}
          onSalvar={adicionarVisitante}
        />
      )}

      {mostrarModalEdicao && visitanteSelecionado && (
        <EditarVisitanteModal
          visitante={visitanteSelecionado}
          onClose={() => {
            setMostrarModalEdicao(false)
            setVisitanteSelecionado(null)
          }}
          onSalvar={atualizarVisitante}
        />
      )}
    </div>
  )
}

export default Visitantes


