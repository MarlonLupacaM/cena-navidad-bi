import React from 'react';
import { X, Trophy, TrendingUp, Users, Award } from 'lucide-react';

export default function VotingStats({ venues, totalVotes, onClose }) {
  const sortedVenues = [...venues].sort((a, b) => b.votes - a.votes);
  const leader = sortedVenues[0];

  const medals = ['🥇', '🥈', '🥉', '4º', '5º'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#001c47]/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="text-white p-6 relative border-b-2 border-[#01ACAD]"
          style={{
            backgroundColor: '#002559',
            backgroundImage: "radial-gradient(circle at 85% 10%, rgba(1, 172, 173, 0.3) 0%, transparent 60%), url('/Img/fondo.svg')",
            backgroundSize: 'cover'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#01ACAD] mb-1">
            <TrendingUp className="w-4 h-4 text-[#01ACAD]" /> Resultados en Tiempo Real
          </div>
          <h2 className="text-2xl font-black text-white">Ranking Oficial de Sedes</h2>
          <p className="text-xs text-slate-200 mt-1">
            Total acumulado: <strong className="text-[#01ACAD] font-black">{totalVotes} votos</strong> de colaboradores Caja Arequipa
          </p>
        </div>

        {/* Podium Highlight */}
        {leader && (
          <div className="bg-[#002559]/5 p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#01ACAD] text-[#002559] flex flex-col items-center justify-center shadow-lg shrink-0">
              <span className="text-2xl leading-none">👑</span>
              <span className="text-[10px] font-black tracking-wider uppercase">LÍDER</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs uppercase font-black text-[#002559] tracking-wider">
                Sede Favorita Actual
              </span>
              <h3 className="text-lg font-black text-slate-900">{leader.name}</h3>
              <p className="text-xs text-slate-600 font-medium">
                {leader.zone} • {leader.votes} votos ({totalVotes > 0 ? Math.round((leader.votes / totalVotes) * 100) : 0}%)
              </p>
            </div>
          </div>
        )}

        {/* Breakdown list */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {sortedVenues.map((v, index) => {
            const pct = totalVotes > 0 ? Math.round((v.votes / totalVotes) * 100) : 0;
            return (
              <div
                key={v.id}
                className="bg-[#F4F7FB] hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold w-7 text-center shrink-0">
                      {medals[index]}
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-[#002559]">{v.name}</h4>
                      <span className="text-[11px] text-slate-500 font-bold">{v.zone} • Capacidad: {v.capacity}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-[#002559]">{v.votes}</span>
                    <span className="text-xs text-[#01ACAD] font-black block">{pct}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      index === 0
                        ? 'bg-gradient-to-r from-[#01ACAD] to-[#33BDBC]'
                        : index === 1
                        ? 'bg-gradient-to-r from-[#002559] to-[#0A3B82]'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F7FB] border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>* Actualizado en vivo con cada colaborador</span>
          <button
            onClick={onClose}
            className="bg-[#002559] hover:bg-[#001c47] text-white font-black py-2 px-5 rounded-xl transition"
          >
            Volver a la votación
          </button>
        </div>
      </div>
    </div>
  );
}
