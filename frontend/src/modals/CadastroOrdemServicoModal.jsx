import { useState } from 'react'

function CadastroOrdemServicoModal({ onClose, onSalvar }) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!titulo.trim() || !descricao.trim() || !status.trim()) {
      alert('Preencha todos os campos!')
      return
    }

    const novaOrdem = {
      titulo,
      descricao,
      status,
    }

    onSalvar(novaOrdem)
    onClose()

    setTitulo('')
    setDescricao('')
    setStatus('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-blue-700 text-center">Cadastrar Ordem de Serviço</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Título da Ordem"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Descrição</label>
            <textarea
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descrição da Ordem"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <input
              type="text"
              value={status}
              onChange={e => setStatus(e.target.value)}
              placeholder="Status atual"
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

export default CadastroOrdemServicoModal
