import { useState } from 'react'

function CadastroVisitanteModal({ onClose, onSalvar }) {
  const [nome, setNome] = useState('')
  const [documento, setDocumento] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [telefone, setTelefone] = useState('') // para adicionar telefone que fiz lá no backend no models

  const handleSubmit = (e) => {
    e.preventDefault() // Evita reload da página

    if (!nome.trim() || !documento.trim() || !empresa.trim()) {
      alert('Preencha todos os campos!')
      return
    }

    const novoVisitante = {
      nome,
      documento,
      empresa,
      telefone  // para adicionar telefone que fiz la no backend no models
    }

    onSalvar(novoVisitante)
    onClose()

    // Limpar os campos
    setNome('')
    setDocumento('')
    setEmpresa('')
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

          <div>
            <label className="block text-sm text-gray-700 mb-1">Documento</label>
            <input
              type="text"
              value={documento}
              onChange={e => setDocumento(e.target.value)}
              placeholder="RG ou CPF"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
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
              placeholder="Telefone para Contato"
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
