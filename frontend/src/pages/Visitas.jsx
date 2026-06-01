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
    try {
      const res = await axios.get('/visitas/')
      setVisitas(res.data)
    } catch (error) {
      console.error('Erro ao buscar visitas', error)
    }
  }

  const adicionarVisita = async (dados) => {
    try {
      await axios.post('/visitas/', dados)
      buscarVisitas()
      Swal.fire('Sucesso!', 'Visita cadastrada com sucesso.', 'success')
      return true
    } catch (error) {
      const mensagemDjango = error.respone?.data
      ? Json.stringfy(error.response.data)
      : 'Erro de conexão com o servidor.'
      Swal.fire('Erro do Servidor', mensagemDjango, 'error')
      return false
    }
  }

  const atualizarVisita = async (dados) => {
    try {
      await axios.put(`/visitas/${dados.id}/`, dados)
      buscarVisitas()
      Swal.fire('Sucesso', 'Visita atualizada com sucesso.', 'success')
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível atualizar a visita.', 'error')
    }
  }

  const deletarVisita = async (id) => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      iconColor: 'red',
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-2"
      },
      buttonsStyling: false
    })

    if (confirmacao.isConfirmed) {
      try {
        await axios.delete(`/visitas/${id}/`)
        Swal.fire({
          title: "Deletado!",
          text: "Visita removida com sucesso.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          },
          buttonsStyling: false,
        })
        buscarVisitas()
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível deletar a visita.', 'error')
      }
    }
  }

  const visitasFiltradas = visitas.filter(v =>
    (v.visitante_nome && v.visitante_nome.toLowerCase().includes(busca.toLowerCase())) ||
    (v.empresa_nome && v.empresa_nome.toLowerCase().includes(busca.toLowerCase())) ||
    (v.numero_os && v.numero_os.includes(busca))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Visitas</h2>
          <button 
            onClick={() => setMostrarCadastro(true)} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + Cadastrar nova visita
          </button>
        </div>

        <div>
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por visitante, empresa ou OS..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Visitante</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Entrada</th>
                <th className="px-4 py-3">Saída</th>
                <th className="px-4 py-3">OS</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {visitasFiltradas.map(v => (
                <tr key={v.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{v.id}</td>
                  <td className="px-4 py-3">{v.visitante_nome}</td>
                  <td className="px-4 py-3">{v.empresa_nome}</td>
                  <td className="px-4 py-3">{v.data ? v.data.split('-').reverse().join('/') : '-'}</td>
                  <td className="px-4 py-3">{v.hora_entrada}</td>
                  <td className="px-4 py-3">{v.hora_saida || '-'}</td>
                  <td className="px-4 py-3">{v.numero_os || '-'}</td>

                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setVisitaSelecionada(v)
                        setMostrarEdicao(true)
                      }}
                      className="px-3 py-1 bg-yellow-400 rounded-md text-white hover:bg-yellow-500 transition text-xs font-semibold"
                      title="Editar visita"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deletarVisita(v.id)}
                      className="px-3 py-1 bg-red-500 rounded-md text-white hover:bg-red-600 transition text-xs font-semibold"
                      title="Deletar visita"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
              {visitasFiltradas.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center px-4 py-6 text-gray-500">
                    Nenhuma visita encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {mostrarCadastro && (
        <CadastroVisitaModal
          onClose={() => setMostrarCadastro(false)}
          onSalvar={adicionarVisita}
        />
      )}

      {mostrarEdicao && visitaSelecionada && (
        <EditarVisitaModal
          visita={visitaSelecionada}
          onClose={() => {
            setMostrarEdicao(false)
            setVisitaSelecionada(null)
          }}
          onSalvar={atualizarVisita}
        />
      )}
    
      {/* rodapé interno */}
      <footer className="pb-2 mt-20 text-center text-orange-600 text-sm">
        <p>© TI - Qmovi Indústria Moveleira LTDA - Gestão de OS - 2026</p>
          {/* <p className="mt-1 italic text-blue-600 font-extralight" >github.com/arthurluizvieira</p> */}
      </footer>              
      {/* final rodape */}    
    
    </div>
  )
}

export default Visitas