import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'

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
      setVisitante(visita.visitante)
      setEmpresa(visita.empresa)
      setData(visita.data)
      setHoraEntrada(visita.hora_entrada)
      setHoraSaida(visita.hora_saida || '')
      setNumeroOS(visita.numero_OS)
    }

    buscarVisitantes()
    buscarEmpresas()
  }, [visita])

  const buscarVisitantes = async () => {
    const res = await axios.get('/api/visitantes/')
    setVisitantes(res.data)
  }

  const buscarEmpresas = async () => {
    const res = await axios.get('/api/empresas/')
    setEmpresas(res.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const visitaAtualizada = {
      id: visita.id,
      visitante,
      empresa,
      data,
      hora_entrada: horaEntrada,
      hora_saida: horaSaida,
      numero_OS: numeroOS
    }

    await onSalvar(visitaAtualizada)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6">

        <h2 className="text-xl font-bold text-blue-700 text-center">Editar Visita</h2>

        <input list="listaVisitantes" value={visitante} onChange={e => setVisitante(e.target.value)} className="w-full border p-2 rounded"/>
        <datalist id="listaVisitantes">
          {visitantes.map(v => <option key={v.id} value={v.nome} />)}
        </datalist>

        <input list="listaEmpresas" value={empresa} onChange={e => setEmpresa(e.target.value)} className="w-full border p-2 rounded"/>
        <datalist id="listaEmpresas">
          {empresas.map(e => <option key={e.id} value={e.nome} />)}
        </datalist>

        <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full border p-2 rounded"/>
        <input type="time" value={horaEntrada} onChange={e => setHoraEntrada(e.target.value)} className="w-full border p-2 rounded"/>
        <input type="time" value={horaSaida} onChange={e => setHoraSaida(e.target.value)} className="w-full border p-2 rounded"/>
        <input value={numeroOS} onChange={e => setNumeroOS(e.target.value)} className="w-full border p-2 rounded"/>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        </div>

      </form>
    </div>
  )
}

export default EditarVisitaModal