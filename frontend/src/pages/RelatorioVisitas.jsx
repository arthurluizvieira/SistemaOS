import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance'; // Usando a sua instância matadora!

export default function RelatorioVisitas() {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    buscarVisitas();
  }, []);

  const buscarVisitas = async () => {
    try {
      const res = await axios.get('/visitas/');
      setVisitas(res.data);
    } catch (error) {
      console.error('Erro ao buscar visitas', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-700">Relatório Geral de Visitas</h2>
          <button 
            onClick={() => window.print()}
            className="print:hidden bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Imprimir / Salvar PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-blue-800 text-left text-sm uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Visitante</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Entrada</th>
                <th className="px-4 py-3">Saída</th>
                <th className="px-4 py-3">OS</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {visitas.map((v) => (
                <tr key={v.id} className="border-t hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{v.data ? v.data.split('-').reverse().join('/') : '-'}</td>
                  <td className="px-4 py-3">{v.visitante_nome}</td>
                  <td className="px-4 py-3">{v.empresa_nome}</td>
                  <td className="px-4 py-3">{v.hora_entrada}</td>
                  <td className="px-4 py-3">{v.hora_saida || '-'}</td>
                  <td className="px-4 py-3">{v.numero_os || '-'}</td>
                </tr>
              ))}
              {visitas.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-6 text-gray-500">
                    Nenhuma visita encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* rodapé interno - adicionei print:hidden pra não sair na impressão do PDF */}
      <footer className="pb-2 mt-20 text-center text-orange-600 text-sm print:hidden">
        <p>© TI - Qmovi Indústria Moveleira LTDA - Gestão de OS - 2026</p>
      </footer>
    </div>
  );
}