import React, { useEffect } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function DuplicateVoteModal({
  isOpen,
  onClose,
  data
}) {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-sm sm:max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-200 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
          title="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Minimalist Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-500 mb-4 shadow-2xs">
          <ShieldAlert className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#002559] tracking-tight">
          Voto ya Registrado
        </h3>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
          Ya se encuentra un voto emitido con los datos ingresados en el sistema de la cena navideña.
        </p>

        {/* Details Card if data is available */}
        {data && (data.employeeCode || data.email) && (
          <div className="w-full bg-[#F4F7FB] border border-slate-200/80 rounded-2xl p-3.5 my-4 text-xs text-left space-y-1.5">
            {data.employeeCode && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Código:</span>
                <span className="font-mono font-black text-[#002559] bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  {data.employeeCode}
                </span>
              </div>
            )}
            {data.email && (
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-500 font-semibold shrink-0">Correo:</span>
                <span className="font-bold text-[#002559] truncate max-w-[200px]" title={data.email}>
                  {data.email}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Footnote */}
        <p className="text-[11px] text-slate-400 font-medium">
          Cada colaborador puede emitir un único voto para garantizar la transparencia del proceso.
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full mt-5 bg-[#002559] hover:bg-[#001c47] text-white font-black py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
