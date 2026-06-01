import { useState, useEffect } from 'react'

// 🔧 [JWT] Utilizando instância configurada do axios para garantir envio automático do token JWT
import axios from '../utils/axiosInstance'
import Swal from 'sweetalert2'

import CadastroVisitanteModal from '../modals/CadastroVisitanteModal'
import EditarVisitanteModal from '../modals/EditarVisitanteModal'

function calcularDataRenovacao(dataEntrada) {
  const entrada = new Date(dataEntrada);
  entrada.setDate(entrada.getDate() + 30);
  return entrada.toLocaleDateString('pt-BR'); // formato dd/mm/aaaa
}

function calcularStatus(dataEntrada) {
  const entrada = new Date(dataEntrada)
  const hoje = new Date()
  const diffDias = Math.floor((hoje - entrada) / (1000 * 60 * 60 * 24))

  if (diffDias <= 20) return 'Verificado'
  if (diffDias <= 25) return 'Atenção'
  if (diffDias <= 30) return 'Renovar'
  return 'Pendente'
}

function Visitantes() {
  const [busca, setBusca] = useState('')
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false)
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false)
  const [visitantes, setVisitantes] = useState([])
  const [empresas, setEmpresas] = useState([]) // Estado para guardar as empresas cadastradas
  const [visitanteSelecionado, setVisitanteSelecionado] = useState(null)

  useEffect(() => {
    // Carrega Lista ao iniciar o componente
    buscarVisitantes()
    buscarEmpresas() // Carrega as empresas para poder traduzir os IDs antigos
  }, [])

  // 🔧 [JWT] Atualizado para usar caminhos relativos compatíveis com a API protegida
  const buscarVisitantes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/visitantes/')
      setVisitantes(response.data)
    } catch (error) {
      console.error('Erro ao buscar visitantes:', error)
    }
  }

  // Busca as empresas para formatar a tabela corretamente
  const buscarEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/empresas/')
      setEmpresas(response.data)
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
    }
  }
  
  const adicionarVisitante = async (dados) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/visitantes/', dados)
      Swal.fire('Sucesso', 'Visitante salvo com sucesso!', 'success')
      buscarVisitantes()
      return true
    } catch (error) {
      if (error.response?.data) {
        const mensagensErro = Object.values(error.response.data).flat().join('\n')
        Swal.fire('Erro', mensagensErro || 'Erro ao salvar visitante.', 'error')
      } else {
        Swal.fire('Erro', 'Erro de conexão com o servidor.', 'error')
      }
      return false
    }
  } // <-- ❌ AQUI ESTAVA O ERRO: esta chave fechava a função Visitantes, o que causava o 'return' fora da função

  const atualizarVisitante = async (visitanteAtualizado) => {
    try {
      await axios.put(`http://localhost:8000/api/visitantes/${visitanteAtualizado.id}/`, visitanteAtualizado)
      buscarVisitantes()
    } catch (error) {
      console.error('Erro ao atualizar visitante:', error)
    }
  }

  const deletarVisitante = async (id) => {
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
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      },
      buttonsStyling: false
    })

    if (confirmacao.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/visitantes/${id}/`)

        setVisitantes(prev => prev.filter(v => v.id !== id))

        Swal.fire({
          title: "Deletado!",
          text: "Visitante removido com sucesso.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          },
          buttonsStyling: false,
        })
      } catch (error) {
        Swal.fire('Erro', 'Não foi possível deletar o visitante.', 'error')
      }
    }
  }

  // Função que corrige os dados da tabela, traduzindo o ID antigo para "ID - Nome"
  const formatarEmpresa = (valorEmpresa) => {
    if (!valorEmpresa) return '-'
    
    // Se a string já tiver " - " (formato novo), retorna ela mesma
    if (String(valorEmpresa).includes(' - ')) {
      return valorEmpresa
    }

    // Se for só o ID (formato antigo), busca a empresa e monta o nome bonitão
    const emp = empresas.find(e => e.id === Number(valorEmpresa))
    if (emp) {
      return `${emp.id} - ${emp.Nome || emp.nome}`
    }

    return valorEmpresa
  }

  const visitantesFiltrados = visitantes.filter(v =>
    v.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (v.cpf && v.cpf.includes(busca)) ||
    (v.rg && v.rg.includes(busca))
  )
  // aqui nois chama o "Liderança" dessa Tela -> todo estilo e layout que tiver nessas "Ordens" -> vai aplicar para tudo
  return (
    // O Liderança que aplica TODO essa estilização de gradiente suave + espaçamento p um visual + leve moderno e rapido
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      
      {/* conteúdo principal - TODO CONTEUDO PRINCIPAL -->> MAIN */}
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-4 space-y-4">
        
        {/* "só a cabeça" */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Visitantes</h2>
          <button
            onClick={() => setMostrarModalCadastro(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + Cadastrar novo visitante
          </button>
        </div>
        {/* final da cabeça" */}


        {/* campo de busca aq, o Input */}
        <div>
          <input
            type="text"
            placeholder="Buscar visitante por nome ou documento..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        {/* final do INput (campo de busca) */}

        {/* tabela dos visitantes cadastrados */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">CPF</th>
                <th className="px-4 py-3">RG</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">Renovação</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>

            {/* corpo da tabela */}
            <tbody className="text-gray-700 text-sm">
              {visitantesFiltrados.map(v => (
                <tr key={v.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{v.id}</td>
                  <td className="px-4 py-3">{v.nome}</td>
                  <td className="px-4 py-3">{v.cpf || '-'}</td>
                  <td className="px-4 py-3">{v.rg || '-'}</td>
                  {/* Aplicação da correção de layout da empresa */}
                  <td className="px-4 py-3 font-medium">{formatarEmpresa(v.empresa)}</td>
                  <td className="px-4 py-3">{v.telefone}</td>
                  <td className="px-4 py-3">{calcularDataRenovacao(v.entrada)}</td>
                  <td className="px-4 py-3">{calcularStatus(v.entrada)}</td>
                  
                  {/* Ações - os dois botões do campo "Ações" (Editar/Deletar) */}
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setVisitanteSelecionado(v)
                        setMostrarModalEdicao(true)
                      }}
                      className="px-3 py-1 bg-yellow-400 rounded-md text-white hover:bg-yellow-500 transition text-xs font-semibold"
                      title="Editar visitante"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarVisitante(v.id)}
                      className="px-3 py-1 bg-red-500 rounded-md text-white hover:bg-red-600 transition text-xs font-semibold"
                      title="Deletar visitante"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
              {visitantesFiltrados.length === 0 && (
                <tr>
                  {/*estava colspan = 4 */}
                  <td colSpan="9" className="text-center px-4 py-6 text-gray-500">
                    Nenhum visitante encontrado.
                  </td>
                </tr>
              )}
              
            </tbody>
          </table>
        </div>
        {/* fecha div da lista dos visitantes cadastrados  */}
      </div>
      {/* fecha div da tabela com O Conteudo principal */}      


      {/* modal de cadastro */}
      {mostrarModalCadastro && (
        <CadastroVisitanteModal
          onClose={() => setMostrarModalCadastro(false)}
          onSalvar={adicionarVisitante}
        />
      )}
      {/* final modal de cadastro */}

      {/* modal de edicao */}
      {mostrarModalEdicao && visitanteSelecionado && (
        <EditarVisitanteModal
          visitante={visitanteSelecionado}
          onClose={() => {
            setMostrarModalEdicao(false)
            setVisitanteSelecionado(null)
          }}
          onSalvar={atualizarVisitante}
        />
      )}
      {/* final modal de edicao */}

      {/* rodapé interno */}
      <footer className="pb-2 mt-20 text-center text-orange-600 text-sm">
        <p>© TI - Qmovi Indústria Moveleira LTDA - Gestão de OS - 2026</p>
          {/* <p className="mt-1 italic text-blue-600 font-extralight" >github.com/arthurluizvieira</p> */}
      </footer>              
      {/* final rodape */}     

    </div>
    // AQUI FECHA O "LIDERANÇA" -->> todo tailwind e estilização da Tela Visitantes.
  )
}

export default Visitantes