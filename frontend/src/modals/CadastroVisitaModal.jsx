// import { useState, useEffect } from 'react'
// import axios from 'axios'

// function CadastroVisitaModal({ onClose, onSalvar }) {
//   const [visitanteId, setVisitanteId] = useState('')
//   const [data, setData] = useState('')
//   const [horaEntrada, setHoraEntrada] = useState('')
//   const [horaSaida, setHoraSaida] = useState('')
//   const [empresa, setEmpresa] = useState('')
//   const [visitantes, setVisitantes] = useState([])

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/visitantes/')
//       .then(res => setVisitantes(res.data))
//       .catch(err => console.error('Erro ao carregar visitantes', err))
//   }, [])

//   const handleSubmit = () => {
//     if (!visitanteId || !data || !horaEntrada || !empresa) {
//       alert('Preencha os campos obrigatórios!')
//       return
//     }

//     const novaVisita = {
//       visitante: visitanteId,
//       data,
//       hora_entrada: horaEntrada,
//       hora_saida: horaSaida || null,
//       empresa
//     }

//     onSalvar(novaVisita)
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6">
//         <h2 className="text-xl font-bold text-blue-700 text-center">Registrar Visita</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Visitante</label>
//             <select
//               value={visitanteId}
//               onChange={(e) => setVisitanteId(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Selecione</option>
//               {visitantes.map((v) => (
//                 <option key={v.id} value={v.id}>
//                   {v.nome}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Data</label>
//             <input
//               type="date"
//               value={data}
//               onChange={(e) => setData(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Hora Entrada</label>
//             <input
//               type="time"
//               value={horaEntrada}
//               onChange={(e) => setHoraEntrada(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Hora Saída (opcional)</label>
//             <input
//               type="time"
//               value={horaSaida}
//               onChange={(e) => setHoraSaida(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Empresa</label>
//             <input
//               type="text"
//               value={empresa}
//               onChange={(e) => setEmpresa(e.target.value)}
//               placeholder="Nome da empresa"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-2 pt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
//           >
//             Cancelar
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold"
//           >
//             Salvar
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CadastroVisitaModal


// mais recente atualizado
import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Swal from 'sweetalert2'

function CadastroVisitaModal({ onClose, onSalvar }) {
  const [visitante, setVisitante] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [data, setData] = useState('')
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSaida, setHoraSaida] = useState('')
  const [numeroOS, setNumeroOS] = useState('')

  const [visitantes, setVisitantes] = useState([])
  const [empresas, setEmpresas] = useState([])

  useEffect(() => {
    buscarVisitantes()
    buscarEmpresas()
  }, [])

  const buscarVisitantes = async () => {
    try {
      const response = await axios.get('/visitantes/')
      setVisitantes(response.data)
    } catch (error) {
      console.error('Erro ao buscar visitantes:', error)
    }
  }

  const buscarEmpresas = async () => {
    try {
      const response = await axios.get('/empresas/')
      setEmpresas(response.data)
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!visitante || !empresa || !data || !horaEntrada) {
      Swal.fire('Atenção', 'Preencha todos os campos obrigatórios!', 'warning')
      return
    }

    const novaVisita = {
      id_visitante: visitante,
      id_empresa: empresa,
      data: data,
      hora_entrada: horaEntrada,
      hora_saida: horaSaida || null,
      numero_os: numeroOS
    }

    try {
      const sucesso = await onSalvar(novaVisita)
      if (sucesso) {
        Swal.fire({
          title: "Sucesso!",
          text: "Visita registrada com sucesso.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          },
          buttonsStyling: false,
        })
        onClose()
      }
    } catch (error) {
      console.error('Erro ao salvar visita:', error.response?.data)
      Swal.fire('Erro', 'Erro ao salvar visita.', 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-blue-700 text-center">Cadastrar Visita</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Visitante</label>
            <select
              value={visitante}
              onChange={e => setVisitante(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            >
              <option value="">Selecione um visitante</option>
              {visitantes.map(v => (
                <option key={v.id} value={v.id}>
                  {v.nome}
                </option>
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
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CadastroVisitaModal