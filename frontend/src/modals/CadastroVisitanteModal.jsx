import { useState } from 'react'

function CadastroVisitanteModal({ onClose, onSalvar }) {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('') // para acionar CPF que adicionamos no backend MODELS
  const [rg, setRg] = useState('') // para adicionar RG que fiz la no back com CPF
  // const [documento, setDocumento] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [telefone, setTelefone] = useState('') // para adicionar telefone que fiz lá no backend no models

  
  // const handleSubmit = (e) => {
  //   e.preventDefault() // Evita reload da página

  //   if (!nome.trim() ||  !empresa.trim()) {
  //     alert('Preencha todos os campos!')
  //     return
  //   }

  //   const novoVisitante = {
  //     nome,
  //     cpf,
  //     rg,
  //     empresa,
  //     telefone,  // para adicionar telefone que fiz la no backend no models
  //   }

  //   onSalvar(novoVisitante)
  //   onClose()

  //   // Limpar os campos dps de salvar
  //   setNome('')
  //   setCpf('')
  //   setRg('')
  //   setEmpresa('')
  //   setTelefone('')
  // }
  
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!nome.trim() || !empresa.trim()) {
    alert('Preencha todos os campos!')
    return
  }

  if (!cpf.trim() && !rg.trim()) {
    alert('Preencha pelo menos CPF ou RG!')
    return
  }

  const novoVisitante = {
    nome,
    cpf,
    rg,
    empresa,
    telefone,
  }

  try {
    const sucesso = await onSalvar(novoVisitante)
    if (sucesso) {
      onClose() // só fecha se der certo

      // limpa os campos
      setNome('')
      setCpf('')
      setRg('')
      setEmpresa('')
      setTelefone('')
    }
  } catch (error) {
    console.error('Erro ao salvar:', error)
    alert('Erro ao salvar visitante.')
  }
}


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-blue-700 text-center">Cadastrar Visitante</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Nome completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            />
          </div>

          {/* <div>
            <label className="block text-sm text-gray-700 mb-1">Documento</label>
            <input
              type="text"
              value={documento}
              onChange={e => setDocumento(e.target.value)}
              placeholder="RG ou CPF"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            />
          </div> */}

          <div>
            <label className="block text-sm text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              className="mt-1 block w-full border rounded-md p-2"
              
            />
          </div>

           <div>
            <label className="block text-sm text-gray-700 mb-1">RG</label>
            <input
              type="text"
              value={rg}
              onChange={e => setRg(e.target.value)}
              placeholder="00.000.000-0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              
            />
          </div>


          <div>
            <label className="block text-sm text-gray-700 mb-1">Empresa</label>
            <input
              type="text"
              value={empresa}
              onChange={e => setEmpresa(e.target.value)}
              placeholder="Empresa vinculada"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            />
          </div>
        </div>

          {/* // para adicionar telefone  */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              placeholder="(xx) x xxxx-xxxx "
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            />
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

export default CadastroVisitanteModal
