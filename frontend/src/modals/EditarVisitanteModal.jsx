import { useState, useEffect } from 'react'

function EditarVisitanteModal({ visitante, onClose, onSalvar }) {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [rg, setRg] = useState('')
  // const [documento, setDocumento] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [telefone, setTelefone] = useState('')
  
  useEffect(() => {
    if (visitante) {
      setNome(visitante.nome)
      setCpf (visitante.cpf) 
      setRg (visitante.rg)
      // setDocumento(visitante.documento)
      setEmpresa(visitante.empresa)
      setTelefone(visitante.telefone || '')
    }
  }, [visitante])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nome.trim() || !cpf.trim() || !rg.trim() || !empresa.trim()) {
      alert('Preencha todos os campos!')
      return
    }

    onSalvar({
      id: visitante.id,
      nome,
      cpf,
      rg,
      // documento,
      empresa,
      telefone
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-6"
      >
        <h2 className="text-xl font-bold text-blue-700 text-center">Editar Visitante</h2>

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
            <label className="block text-sm text-gray-700 mb-1">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              className="mt-1 block w-full border rounded-md p-2"
              required
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarVisitanteModal
