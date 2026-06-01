import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Swal from 'sweetalert2'
import CadastroOrdemServicoModal from '../modals/CadastroOrdemServicoModal'

function OrdensServico() {
  const [ordens, setOrdens] = useState([])
  const [busca, setBusca] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false)
  const [osEditando, setOsEditando] = useState(null)

  useEffect(() => { buscarOrdens() }, [])

  const buscarOrdens = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/ordem_de_servico/')
      setOrdens(res.data)
    } catch (error) { console.error(error) }
  }

  const salvarOS = async (dados) => {
    try {
      if (dados.id) {
        await axios.put(`http://localhost:8000/api/ordem_de_servico/${dados.id}/`, dados)
        Swal.fire('Sucesso', 'OS atualizada!', 'success')
      } else {
        await axios.post('http://localhost:8000/api/ordem_de_servico/', dados)
        Swal.fire('Sucesso', 'OS criada!', 'success')
      }
      setMostrarModal(false)
      setOsEditando(null)
      buscarOrdens()
    } catch (error) {
      Swal.fire('Erro', 'Erro ao salvar a Ordem de Serviço.', 'error')
    }
  }

  const deletarOS = async (id) => {
    const conf = await Swal.fire({ title: 'Deletar OS?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Sim, deletar' })
    if (conf.isConfirmed) {
      await axios.delete(`http://localhost:8000/api/ordem_de_servico/${id}/`)
      buscarOrdens()
      Swal.fire('Deletado!', '', 'success')
    }
  }

  const ordensFiltradas = ordens.filter(o => o.Numero_OS.includes(busca) || o.Nome_OS.toLowerCase().includes(busca.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-blue-700">Ordens de Serviço</h2>
          <button onClick={() => { setOsEditando(null); setMostrarModal(true) }} className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">+ Nova OS</button>
        </div>

        <input type="text" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por Número ou Nome..." className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nº OS</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ordensFiltradas.map(os => (
                <tr key={os.id} className="border-t hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold">{os.id}</td>
                  <td className="px-4 py-3 font-bold">#{os.Numero_OS}</td>
                  <td className="px-4 py-3">{os.Nome_OS}</td>
                  <td className="px-4 py-3">{os.Empresa_responsável}</td>
                  <td className="px-4 py-3">{os.data_servico ? os.data_servico.split('-').reverse().join('/') : ''}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => { setOsEditando(os); setMostrarModal(true) }} className="bg-yellow-400 px-3 py-1 rounded text-white text-xs font-bold">Editar</button>
                    <button onClick={() => deletarOS(os.id)} className="bg-red-500 px-3 py-1 rounded text-white text-xs font-bold">Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {mostrarModal && <CadastroOrdemServicoModal onClose={() => setMostrarModal(false)} onSalvar={salvarOS} osEditando={osEditando} />}
    
      {/* rodapé interno */}
      <footer className="pb-2 mt-20 text-center text-orange-600 text-sm">
        <p>© TI - Qmovi Indústria Moveleira LTDA - Gestão de OS - 2026</p>
          {/* <p className="mt-1 italic text-blue-600 font-extralight" >github.com/arthurluizvieira</p> */}
      </footer>              
      {/* final rodape */}    
    
    </div>
  )
}
export default OrdensServico