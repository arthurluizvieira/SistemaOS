import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import CadastroEmpresaModal from '../modals/CadastroEmpresaModal'
import Swal from 'sweetalert2'

function Empresas() {
  const [empresas, setEmpresas] = useState([])
  const [busca, setBusca] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [empresaEditando, setEmpresaEditando] = useState(null)

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
      await axios.post('http://localhost:8000/api/empresas/', novaEmpresa)
      Swal.fire('Sucesso', 'Empresa registrada com sucesso!', 'success') 
      buscarEmpresas()
      setMostrarModal(false)
      return true
    } catch (error) {
      if (error.response?.data) {
        const mensagensErro = Object.values(error.response.data).flat().join('\n')
        Swal.fire('Erro', mensagensErro || 'Erro ao cadastrar empresa.', 'error')
      } else {
        Swal.fire('Erro', 'Erro de conexão com o servidor.', 'error')
      }
      return false
    }
  }

  const atualizarEmpresa = async (empresaAtualizada) => {
    try {
      await axios.put(`http://localhost:8000/api/empresas/${empresaAtualizada.id}/`, empresaAtualizada)
      Swal.fire('Sucesso', 'Empresa atualizada com sucesso!', 'success')
      buscarEmpresas()
      setMostrarModal(false)
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error)
      Swal.fire('Erro', 'Não foi possível atualizar a empresa.', 'error')
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
    (e.Nome || e.nome || '').toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Empresas</h2>
          <button
            onClick={() => { setEmpresaEditando(null); setMostrarModal(true); }}
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
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">CNPJ</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Endereço</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {empresasFiltradas.map((e) => (
                <tr key={e.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3 font-bold">{e.id}</td>
                  {/* Renderiza qualquer variação de maiúscula ou minúscula que vier da API */}
                  <td className="px-4 py-3 font-medium">{e.Nome || e.nome}</td>
                  <td className="px-4 py-3">{e.cnpj}</td>
                  <td className="px-4 py-3">{e.Contato || e.contato}</td>
                  <td className="px-4 py-3">{e.Endereco || e.endereco}</td>
                  <td className="px-4 py-3">{e.Responsavel || e.responsavel}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => { setEmpresaEditando(e); setMostrarModal(true); }}
                      className="bg-yellow-400 px-3 py-1 rounded text-white text-xs font-bold hover:bg-yellow-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarEmpresa(e.id)}
                      className="bg-red-500 px-3 py-1 rounded text-white text-xs font-bold hover:bg-red-600"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
              {empresasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-6 text-gray-500">
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
          onSalvar={empresaEditando ? atualizarEmpresa : adicionarEmpresa}
          empresaEditando={empresaEditando}
        />
      )}

      {/* rodapé interno */}
      <footer className="mt-20 text-center text-orange-600 text-sm">
        <p >© TI - Qmovi Indústria Moveleira LTDA - Gestão de OS - 2026</p>
          {/* <p className="mt-1 italic text-blue-600 font-extralight" >github.com/arthurluizvieira</p> */}
      </footer>              
      {/* final rodape */}      

    </div>
  )
}

export default Empresas