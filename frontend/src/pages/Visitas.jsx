// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import CadastroVisitaModal from '../modals/CadastroVisitaModal'

// function Visitas() {
//   const [visitas, setVisitas] = useState([])
//   const [busca, setBusca] = useState('')
//   const [mostrarModal, setMostrarModal] = useState(false)

//   useEffect(() => {
//     buscarVisitas()
//   }, [])

//   const buscarVisitas = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/visitas/')
//       setVisitas(response.data)
//     } catch (error) {
//       console.error('Erro ao buscar visitas:', error)
//     }
//   }

//   const adicionarVisita = async (novaVisita) => {
//     try {
//       await axios.post('http://localhost:8000/api/visitas/', novaVisita)
//       buscarVisitas()
//     } catch (error) {
//       console.error('Erro ao adicionar visita:', error)
//     }
//   }

// // const visitasFiltradas = visitas.filter((v) => {
// // // corrigir erro que tava dando de não carregar o visitas
// //   const motivo = v.motivo || ''  
// //   return motivo.toLowerCase().includes(busca.toLowerCase())
// // })


// const visitasFiltradas = visitas.filter((v) => {
//   const empresa = v.empresa || ''
//   return empresa.toLowerCase().includes(busca.toLowerCase())
// })



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
//       <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//           <h2 className="text-3xl font-bold text-blue-700">Visitas</h2>
//           <button
//             onClick={() => setMostrarModal(true)}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
//           >
//             + Registrar nova visita
//           </button>
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Buscar visita por empresa..."
//             value={busca}
//             onChange={(e) => setBusca(e.target.value)}
//             className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse">
//             <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
//               <tr>
//                 <th className="px-4 py-3">Visitante</th>
//                 <th className="px-4 py-3">Data</th>
//                 <th className="px-4 py-3">Entrada</th>
//                 <th className="px-4 py-3">Saída</th>
//                 <th className="px-4 py-3">Empresa</th>          
//                 <th className="px-4 py-3">Ordem De Serviço</th>          
//               </tr>
//             </thead>
//             <tbody className="text-gray-700 text-sm">
//               {visitasFiltradas.map((v, index) => (
//                 <tr key={index} className="border-t hover:bg-blue-50 transition">
//                   <td className="px-4 py-3">{v.visitante}</td>
//                   <td className="px-4 py-3">{v.data}</td>
//                   <td className="px-4 py-3">{v.hora_entrada}</td>
//                   <td className="px-4 py-3">{v.hora_saida || '—'}</td>
//                   <td className="px-4 py-3">{v.empresa}</td>
//                   <td className="px-4 py-3">{v.os}</td>
//                 </tr>
//               ))}
//               {visitasFiltradas.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
//                     Nenhuma visita encontrada.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {mostrarModal && (
//         <CadastroVisitaModal
//           onClose={() => setMostrarModal(false)}
//           onSalvar={adicionarVisita}
//         />
//       )}
//     </div>
//   )
// }

// export default Visitas

///atualizado mais recente
import { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Swal from 'sweetalert2'

import CadastroVisitaModal from '../modals/CadastroVisitaModal'
import EditarVisitaModal from '../modals/EditarVisitaModal'

function Visitas() {
  const [visitas, setVisitas] = useState([])
  const [busca, setBusca] = useState('')

  const [mostrarCadastro, setMostrarCadastro] = useState(false)
  const [mostrarEdicao, setMostrarEdicao] = useState(false)
  const [visitaSelecionada, setVisitaSelecionada] = useState(null)

  useEffect(() => {
    buscarVisitas()
  }, [])

  const buscarVisitas = async () => {
    const res = await axios.get('/visitas/')
    setVisitas(res.data)
  }

  const adicionarVisita = async (dados) => {
    await axios.post('/visitas/', dados)
    buscarVisitas()
    return true
  }

  const atualizarVisita = async (dados) => {
    await axios.put(`/visitas/${dados.id}/`, dados)
    buscarVisitas()
  }

  const deletarVisita = async (id) => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600",
        cancelButton: "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2"
      },
      buttonsStyling: false
    })

    if (confirmacao.isConfirmed) {
      await axios.delete(`/visitas/${id}/`)
      Swal.fire('Deletado!', 'Visita removida.', 'success')
      buscarVisitas()
    }
  }

  const visitasFiltradas = visitas.filter(v =>
    v.id.toString().includes(busca)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-blue-700">Visitas</h2>
          <button onClick={() => setMostrarCadastro(true)} className="bg-blue-600 text-white px-6 py-2 rounded-md">
            + Nova Visita
          </button>
        </div>

        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar..."
          className="w-full md:w-1/2 px-4 py-2 border rounded"
        />

        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th>ID</th>
              <th>Visitante</th>
              <th>Empresa</th>
              <th>Data</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>OS</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {visitasFiltradas.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.visitante_nome}</td>
                <td>{v.empresa_nome}</td>
                <td>{v.data}</td>
                <td>{v.hora_entrada}</td>
                <td>{v.hora_saida}</td>
                <td>{v.numero_os}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setVisitaSelecionada(v)
                      setMostrarEdicao(true)
                    }}
                    className="bg-yellow-400 px-2 py-1 rounded text-white"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarVisita(v.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {mostrarCadastro && (
        <CadastroVisitaModal
          onClose={() => setMostrarCadastro(false)}
          onSalvar={adicionarVisita}
        />
      )}

      {mostrarEdicao && (
        <EditarVisitaModal
          visita={visitaSelecionada}
          onClose={() => setMostrarEdicao(false)}
          onSalvar={atualizarVisita}
        />
      )}
    </div>
  )
}

export default Visitas