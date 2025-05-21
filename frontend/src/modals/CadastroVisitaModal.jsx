import { useState, useEffect } from 'react'
import axios from 'axios'

function CadastroVisitaModal({ onClose, onSalvar }) {
  const [visitanteId, setVisitanteId] = useState('')
  const [data, setData] = useState('')
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSaida, setHoraSaida] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [visitantes, setVisitantes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/visitantes/')
      .then(res => setVisitantes(res.data))
      .catch(err => console.error('Erro ao carregar visitantes', err))
  }, [])

  const handleSubmit = () => {
    if (!visitanteId || !data || !horaEntrada || !empresa) {
      alert('Preencha os campos obrigatórios!')
      return
    }

    const novaVisita = {
      visitante: visitanteId,
      data,
      hora_entrada: horaEntrada,
      hora_saida: horaSaida || null,
      empresa
    }

    onSalvar(novaVisita)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-700 text-center">Registrar Visita</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Visitante</label>
            <select
              value={visitanteId}
              onChange={(e) => setVisitanteId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {visitantes.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Hora Entrada</label>
            <input
              type="time"
              value={horaEntrada}
              onChange={(e) => setHoraEntrada(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Hora Saída (opcional)</label>
            <input
              type="time"
              value={horaSaida}
              onChange={(e) => setHoraSaida(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Empresa</label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nome da empresa"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CadastroVisitaModal
