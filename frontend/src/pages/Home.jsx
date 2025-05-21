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
      path: '/home/ordens-servico',
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
      

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-800 tracking-tight">
          <center>Bem-vindo ao Sistema de Controle</center>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
    </div>
  )
}

export default Home
