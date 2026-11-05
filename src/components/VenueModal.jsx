import React, { useEffect } from 'react';
import { X, Utensils, Sparkles, GlassWater } from 'lucide-react';

export default function VenueModal({ venue, onClose, onVote, isVotedByMe }) {
  if (!venue) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-sm">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con el fondo SVG de la pantalla principal y degradado turquesa claro */}
        <div
          className="pt-7 pb-5 px-6 sm:py-7 sm:px-8 flex items-center justify-between gap-3 relative rounded-t-3xl border-b-2 border-[#01ACAD] overflow-hidden"
          style={{
            backgroundColor: '#F4F7FB',
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(220, 248, 248, 0.9) 60%, rgba(1, 172, 173, 0.35) 100%), url('/Img/fondo.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top right'
          }}
        >
          <h2 className="text-base sm:text-2xl font-black text-[#002559] leading-snug text-left">
            {venue.name}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-[#002559] border border-slate-200/80 flex items-center justify-center transition shadow-2xs shrink-0 active:scale-95"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body - Simplified & Organized */}
        <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">

          {/* Gastronomic Proposal Section - Limpio sin contenedores anidados excesivos */}
          {venue.menuOptions && venue.menuOptions.length > 0 ? (
            <div className="space-y-3">
              {venue.menuOptions.map((opt, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs"
                >
                  {/* Header: Option title + price (sin saltos de línea antiestéticos en móviles) */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="text-xs sm:text-base font-black text-[#002559] uppercase tracking-wide whitespace-nowrap">
                        {opt.title}
                      </span>
                      {opt.tag && (
                        <span className="bg-[#01ACAD]/15 text-[#002559] text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-black text-[#002559] bg-[#E8F9F9] px-2.5 py-1 rounded-xl border border-[#01ACAD]/30 whitespace-nowrap shrink-0 ml-auto sm:ml-0">
                      {opt.price}
                    </span>
                  </div>

                  {/* Columns of dishes */}
                  <div className={`grid gap-3.5 sm:gap-4 text-xs ${opt.dishes.length === 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                    {opt.dishes.map((d, dIdx) => (
                      <div key={dIdx}>
                        <span className="text-[11px] uppercase font-black tracking-wider text-[#01ACAD] block mb-1">
                          {d.label}
                        </span>
                        <ul className="space-y-1 text-slate-700 font-medium text-xs">
                          {d.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-1.5">
                              <span className="text-slate-400 text-xs shrink-0 mt-0.5">•</span>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Extra / Torta navideña note */}
                  {opt.extra && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-xs font-bold text-[#002559]">
                      <Sparkles className="w-3.5 h-3.5 text-[#01ACAD] shrink-0 mt-0.5" />
                      <span className="leading-snug">{opt.extra}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3 text-xs">
              <div>
                <strong className="text-[#01ACAD] block text-[11px] uppercase tracking-wide mb-0.5">
                  Entrada & Aperitivo
                </strong>
                <p className="text-slate-700 font-medium">{venue.menu.appetizer}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <strong className="text-[#01ACAD] block text-[11px] uppercase tracking-wide mb-0.5">
                  Plato Principal
                </strong>
                <p className="text-slate-700 font-medium">{venue.menu.main}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <strong className="text-[#01ACAD] block text-[11px] uppercase tracking-wide mb-0.5">
                  Postre
                </strong>
                <p className="text-slate-700 font-medium">{venue.menu.dessert}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <strong className="text-[#01ACAD] block text-[11px] uppercase tracking-wide mb-0.5 flex items-center gap-1">
                  <GlassWater className="w-3.5 h-3.5 text-[#01ACAD]" /> Bebidas & Brindis
                </strong>
                <p className="text-slate-700 font-medium">{venue.menu.beverages}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
