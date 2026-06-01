import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Swal from 'sweetalert2'

function CadastroOrdemServicoModal({ onClose, onSalvar, osEditando }) {
  const [numeroOS, setNumeroOS] = useState('')
  const [nomeOS, setNomeOS] = useState('')
  const [descricao, setDescricao] = useState('')
  const [empresaResp, setEmpresaResp] = useState('')
  const [profissional, setProfissional] = useState('')
  const [dataServico, setDataServico] = useState('')
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSaida, setHoraSaida] = useState('')

  // Novos states para guardar as listas do banco
  const [visitantes, setVisitantes] = useState([])
  const [empresas, setEmpresas] = useState([])

  useEffect(() => {
    // Busca visitantes e empresas para preencher os selects
    const carregarDados = async () => {
      try {
        const resVisitantes = await axios.get('http://localhost:8000/api/visitantes/')
        setVisitantes(resVisitantes.data)
        const resEmpresas = await axios.get('http://localhost:8000/api/empresas/')
        setEmpresas(resEmpresas.data)
      } catch (error) {
        console.error("Erro ao carregar dados pro modal", error)
      }
    }
    carregarDados()

    if (osEditando) {
      setNumeroOS(osEditando.Numero_OS)
      setNomeOS(osEditando.Nome_OS)
      setDescricao(osEditando.Descricao_OS)
      setEmpresaResp(osEditando.Empresa_responsável)
      setProfissional(osEditando.Profissional_responsavel)
      setDataServico(osEditando.data_servico)
      setHoraEntrada(osEditando.hora_entrada)
      setHoraSaida(osEditando.hora_saida)
    }
  }, [osEditando])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!numeroOS || !nomeOS || !descricao) {
      Swal.fire('Atenção', 'Preencha os campos obrigatórios!', 'warning')
      return
    }

    const dadosOS = {
      ...(osEditando && { id: osEditando.id }),
      Numero_OS: numeroOS,
      Nome_OS: nomeOS,
      Descricao_OS: descricao,
      Empresa_responsável: empresaResp,
      Profissional_responsavel: profissional,
      data_servico: dataServico,
      hora_entrada: horaEntrada,
      hora_saida: horaSaida
    }

    await onSalvar(dadosOS)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-blue-700 text-center">
          {osEditando ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Número da OS *</label>
            <input type="text" value={numeroOS} onChange={e => setNumeroOS(e.target.value)} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" required disabled={!!osEditando} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nome do Serviço *</label>
            <input type="text" value={nomeOS} onChange={e => setNomeOS(e.target.value)} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Motivo / Descrição *</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" rows="3" required></textarea>
          </div>
          
          {/* EMPRESA */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Empresa Responsável</label>
            <select value={empresaResp} onChange={e => setEmpresaResp(e.target.value)} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione uma Empresa...</option>
              {empresas.map(emp => (
                // Salvamos o NOME pois o seu banco (CharField) espera o nome. Mostramos ID + Nome.
                <option key={emp.id} value={emp.Nome}>{emp.id} - {emp.Nome}</option>
              ))}
            </select>
          </div>

          {/* VISITANTE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Profissional Responsável</label>
            <select value={profissional} onChange={e => setProfissional(e.target.value)} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione um Profissional...</option>
              {visitantes.map(vis => (
                <option key={vis.id} value={vis.nome}>{vis.id} - {vis.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Data do Serviço</label>
            <input type="date" value={dataServico} onChange={e => setDataServico(e.target.value)} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">Entrada</label>
              <input type="time" value={horaEntrada} onChange={e => setHoraEntrada(e.target.value)} className="w-full border p-2 rounded" required/>
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">Saída</label>
              <input type="time" value={horaSaida} onChange={e => setHoraSaida(e.target.value)} className="w-full border p-2 rounded" required/>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold">Salvar OS</button>
        </div>
      </form>
    </div>
  )
}
export default CadastroOrdemServicoModal