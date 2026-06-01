import { useState, useEffect } from 'react'

function CadastroEmpresaModal({ onClose, onSalvar, empresaEditando }) {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [contato, setContato] = useState('')
  const [endereco, setEndereco] = useState('')
  const [responsavel, setResponsavel] = useState('')

  // Mapeia todas as variações possíveis vinda do banco para os inputs
  useEffect(() => {
    if (empresaEditando) {
      setNome(empresaEditando.Nome || empresaEditando.nome || '')
      setCnpj(empresaEditando.cnpj || empresaEditando.CNPJ || '')
      setContato(empresaEditando.Contato || empresaEditando.contato || '')
      setEndereco(empresaEditando.Endereco || empresaEditando.endereco || '')
      setResponsavel(empresaEditando.Responsavel || empresaEditando.responsavel || '')
    }
  }, [empresaEditando])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // ENVIADO EM DUPLICIDADE: O Django vai ler a chave que ele conhece no Model e ignorar a outra!
    const dados = {
      ...(empresaEditando && { id: empresaEditando.id }),
      Nome: nome,
      nome: nome,
      cnpj: cnpj,
      Contato: contato,
      contato: contato,
      Endereco: endereco,
      endereco: endereco,
      Responsavel: responsavel,
      responsavel: responsavel
    }
    
    onSalvar(dados)
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-blue-700">
          {empresaEditando ? 'Editar Empresa' : 'Cadastrar nova empresa'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Responsável"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end space-x-4 pt-4">
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