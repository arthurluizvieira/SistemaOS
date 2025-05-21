import { useState } from 'react'

function CadastroEmpresaModal({ onClose, onSalvar }) {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [contato, setContato] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSalvar({ Nome: nome, cnpj, Contato: contato })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Cadastrar nova empresa</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:underline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-semibold"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CadastroEmpresaModal
