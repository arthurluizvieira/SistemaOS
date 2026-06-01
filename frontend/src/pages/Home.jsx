import { useNavigate } from 'react-router-dom'
import { UserCircle } from 'lucide-react'

function Home() {
  const navigate = useNavigate()

  const cards = [
    {
      title: 'Visitantes',
      description: 'Gerencie os cadastros de visitantes.',
      color: 'from-blue-600 to-blue-500',
      path: '/home/visitantes',
    },
    {
      title: 'Visitas',
      description: 'Registros e históricos de visitas.',
      color: 'from-orange-500 to-orange-400',
      path: '/home/visitas',
    },
    {
      title: 'Empresas',
      description: 'Empresas vinculadas ao sistema.',
      color: 'from-purple-600 to-purple-500',
      path: '/home/empresas',
    },
    {
      title: 'Ordens de Serviço',
      description: 'Gerencie as ordens e atividades.',
      color: 'from-green-600 to-green-500',
      path: '/home/ordem_de_servico',
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
    {/* <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800"> */}
      

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-800 tracking-tight">
          <center>Sistema de Controle e Gestão de OS e Visitas - <br></br>Qordem</center>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.path)}
              className={`cursor-pointer bg-gradient-to-br ${card.color} text-white rounded-2xl shadow-xl p-6 hover:scale-[1.04] hover:shadow-2xl transform transition duration-300 ease-in-out`}
            >
              <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm opacity-90">{card.description}</p>
            </div>
          ))}
        </div>
      </main>
         {/* Rodapé Interno */}
         <footer className="py-1 mt-20 text-center text-orange-600 text-sm">
           <p>© Qmovi Indústria Moveleira LTDA - Gestão de TI - 2026</p>
           <p className="mt-1 italic text-blue-600 font-extralight" >github.com/arthurluizvieira</p>
         </footer>      
    </div>
  )
}

//         {/* Grid de Cards */}
//         <div className="py-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"> 
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               onClick={() => navigate(card.path)}
//               className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-2"
//             >
//               <div className={`${card.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
//                 {card.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>   
//               <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              
//               <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
//                 Acessar módulo →
//               </div>
//             </div>
//           ))}
//         </div>


export default Home


// import { useNavigate } from 'react-router-dom'
// import { Users, ClipboardList, Building2, Wrench, LayoutDashboard } from 'lucide-react'

// function Home() {
//   const navigate = useNavigate()

//   const cards = [
//     {
//       title: 'Visitantes',
//       description: 'Cadastro e controle de acesso de visitantes.',
//       color: 'bg-blue-600',
//       icon: <Users size={32} />,
//       path: '/home/visitantes',
//     },
//     {
//       title: 'Visitas',
//       description: 'Histórico detalhado de movimentações.',
//       color: 'bg-orange-500',
//       icon: <ClipboardList size={32} />,
//       path: '/home/visitas',
//     },
//     {
//       title: 'Empresas',
//       description: 'Gestão de parceiros e terceirizadas.',
//       color: 'bg-purple-600',
//       icon: <Building2 size={32} />,
//       path: '/home/empresas',
//     },
//     {
//       title: 'Ordens de Serviço',
//       description: 'Manutenções e serviços técnicos.',
//       color: 'bg-emerald-600',
//       icon: <Wrench size={32} />,
//       path: '/home/ordem_de_servico',
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//        <main className="max-w-7xl mx-auto px-4 py-1.6"> 
//         {/* header mais arrumadin */}
//         <header className="mb-12 border-b border-gray-200 pb-8 flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-black text-gray-900 tracking-tight">Qordem</h1>
//             <p className="text-gray-500 mt-2 text-lg">Sistema Interno de Gestão e Controle de Ordens de Serviço</p>
//           </div>
//           <div className="flex items-center gap-2 mt-4 md:mt-0 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
//             <LayoutDashboard className="text-blue-600" />
//             <span className="font-semibold text-gray-700">Dashboard Principal</span>
//             {/* <button onClick={() => navigate('/home/dashboard')} className="font-semibold text-gray-700">Dashboard Principal</button> */}
//           </div>
//         </header>

//         {/* Grid de Cards */}
//         <div className="py-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               onClick={() => navigate(card.path)}
//               className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-2"
//             >
//               <div className={`${card.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
//                 {card.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              
//               <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
//                 Acessar módulo →
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Rodapé Interno */}
//         <footer className="pb-2 mt-20 text-center text-orange-600 text-sm">
//           <p>© Qmovi Indústria Moveleira LTDA - Gestão de TI - 2026</p>
//           <p className="mt-1 italic text-blue-600 font-extralight" >github.com/arthurluizvieira</p>
//         </footer>
//       </main>
//     </div>
//   )
// }

// export default Home