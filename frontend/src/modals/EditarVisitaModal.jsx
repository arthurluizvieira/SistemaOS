import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Swal from 'sweetalert2'

function EditarVisitaModal({ visita, onClose, onSalvar }) {
  const [visitante, setVisitante] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [data, setData] = useState('')
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSaida, setHoraSaida] = useState('')
  const [numeroOS, setNumeroOS] = useState('')

  const [visitantes, setVisitantes] = useState([])
  const [empresas, setEmpresas] = useState([])

  useEffect(() => {
    if (visita) {
      setVisitante(visita.id_visitante)
      setEmpresa(visita.id_empresa)
      setData(visita.data)
      setHoraEntrada(visita.hora_entrada)
      setHoraSaida(visita.hora_saida || '')
      setNumeroOS(visita.numero_os || '')
    }
    buscarVisitantes()
    buscarEmpresas()
  }, [visita])

  const buscarVisitantes = async () => {
    const res = await axios.get('/visitantes/')
    setVisitantes(res.data)
  }

  const buscarEmpresas = async () => {
    const res = await axios.get('/empresas/')
    setEmpresas(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!visitante || !empresa || !data || !horaEntrada) {
      Swal.fire('Atenção', 'Preencha todos os campos obrigatórios!', 'warning')
      return
    }

    const visitaAtualizada = {
      id: visita.id,
      id_visitante: visitante,
      id_empresa: empresa,
      data,
      hora_entrada: horaEntrada,
      hora_saida: horaSaida || null,
      numero_os: numeroOS
    }

    await onSalvar(visitaAtualizada)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-700 text-center">Editar Visita</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Visitante</label>
            <select
              value={visitante}
              onChange={e => setVisitante(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            >
              <option value="">Selecione um visitante</option>
              {visitantes.map(v => (
                <option key={v.id} value={v.id}>{v.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Empresa</label>
            <select
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            >
              <option value="">Selecione uma empresa</option>
              {empresas.map(e => (
                <option key={e.id} value={e.id}>{e.nome || e.Nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">Hora Entrada</label>
              <input
                type="time"
                value={horaEntrada}
                onChange={e => setHoraEntrada(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-700 mb-1">Hora Saída</label>
              <input
                type="time"
                value={horaSaida}
                onChange={e => setHoraSaida(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Número OS</label>
            <input
              type="text"
              value={numeroOS}
              onChange={e => setNumeroOS(e.target.value)}
              placeholder="Ordem de serviço"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-yellow-500 text-sm font-semibold">
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarVisitaModal