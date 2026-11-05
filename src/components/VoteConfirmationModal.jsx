import React, { useState, useEffect } from 'react';
import { Mail, CreditCard, AlertCircle, Calendar, ChevronDown, Check } from 'lucide-react';

const SUGGESTED_DATES = [
  'Viernes 27 de noviembre',
  'Jueves 3 de diciembre',
  'Viernes 4 de diciembre',
  'Lunes 7 de diciembre',
  'Jueves 10 de diciembre',
  'Jueves 17 de diciembre',
  'Viernes 18 de diciembre'
];

export default function VoteConfirmationModal({
  venue,
  onClose,
  onSubmitVote,
  existingVote
}) {
  if (!venue) return null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const [email, setEmail] = useState(existingVote?.email || '');
  const [employeeCode, setEmployeeCode] = useState(existingVote?.employeeCode || '');
  const [selectedOption, setSelectedOption] = useState(() => {
    if (existingVote?.preferredDate) {
      return SUGGESTED_DATES.includes(existingVote.preferredDate)
        ? existingVote.preferredDate
        : 'OTRO';
    }
    return SUGGESTED_DATES[0];
  });
  const [customDate, setCustomDate] = useState(() => {
    if (existingVote?.preferredDate && !SUGGESTED_DATES.includes(existingVote.preferredDate)) {
      return existingVote.preferredDate.replace('Fecha elegida: ', '');
    }
    return '';
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Por favor ingresa tu correo institucional');
      return;
    }
    if (!employeeCode.trim()) {
      setError('Por favor ingresa tu código de trabajador');
      return;
    }
    if (selectedOption === 'OTRO' && !customDate) {
      setError('Por favor selecciona una fecha en el calendario');
      return;
    }

    const finalDate = selectedOption === 'OTRO'
      ? `Fecha elegida: ${customDate}`
      : selectedOption;

    onSubmitVote({
      venueId: venue.id,
      venueName: venue.name,
      email: email.trim(),
      employeeCode: employeeCode.trim(),
      preferredDate: finalDate,
      collaboratorName: email.trim().split('@')[0],
      votedAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con el fondo SVG de la pantalla principal y degradado turquesa claro */}
        <div
          className="p-6 relative rounded-t-3xl border-b-2 border-[#01ACAD] overflow-hidden"
          style={{
            backgroundColor: '#F4F7FB',
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(220, 248, 248, 0.9) 60%, rgba(1, 172, 173, 0.35) 100%), url('/Img/fondo.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top right'
          }}
        >
          <h2 className="text-lg sm:text-xl font-black text-[#002559] leading-tight">
            Confirmar Voto
          </h2>
          <p className="text-xs text-slate-700 font-medium mt-0.5">
            Ingresa tus datos para registrar tu elección.
          </p>
        </div>

        {/* Selected Venue Summary pill */}
        <div className="p-5 pb-2">
          <div className="bg-[#F4F7FB] border border-slate-200 rounded-2xl p-3 flex items-center gap-3.5">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-16 h-16 rounded-xl object-contain shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 truncate">{venue.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{venue.style}</p>
            </div>
          </div>
        </div>

        {/* Form sin scroll interno */}
        <form onSubmit={handleSubmit} className="p-5 pt-2 space-y-4 text-xs">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Correo y Código de Trabajador en grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#01ACAD]" />
                Correo Institucional *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="ejemplo@cajaarequipa.pe"
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#01ACAD] focus:border-[#01ACAD] transition bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#01ACAD]" />
                Código de Trabajador *
              </label>
              <input
                type="text"
                required
                value={employeeCode}
                onChange={(e) => {
                  setEmployeeCode(e.target.value);
                  setError('');
                }}
                placeholder="Ej: 84920"
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#01ACAD] focus:border-[#01ACAD] transition bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Selección de Fecha con Div Interactivo */}
          <div className="space-y-2 relative">
            <label className="block font-black text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#01ACAD]" />
              Fecha *
            </label>

            {/* Div que actúa como selector visual moderno */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full border border-slate-300 hover:border-[#01ACAD] rounded-2xl px-3.5 py-2.5 bg-white text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-between cursor-pointer transition shadow-2xs select-none"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="truncate">
                  {selectedOption === 'OTRO'
                    ? (customDate ? `Otro día: ${customDate}` : 'Otro día (elegir en calendario)...')
                    : selectedOption}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                  isDropdownOpen ? 'rotate-180 text-[#01ACAD]' : ''
                }`}
              />
            </div>

            {/* Overlay para cerrar el desplegable al hacer clic fuera */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}

            {/* Menu desplegable en div con opciones estilizadas y scroll celeste */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-1 max-h-40 overflow-y-auto custom-scrollbar-cyan animate-in fade-in zoom-in-95 duration-150">
                {SUGGESTED_DATES.map((fecha, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedOption(fecha);
                      setIsDropdownOpen(false);
                      setError('');
                    }}
                    className={`px-3.5 py-1.5 text-xs font-bold cursor-pointer transition flex items-center justify-between ${
                      selectedOption === fecha
                        ? 'bg-[#01ACAD]/15 text-[#002559]'
                        : 'text-slate-700 hover:bg-[#E8F9F9] hover:text-[#002559]'
                    }`}
                  >
                    <span>{fecha}</span>
                    {selectedOption === fecha && (
                      <Check className="w-3.5 h-3.5 text-[#01ACAD]" />
                    )}
                  </div>
                ))}

                <div
                  onClick={() => {
                    setSelectedOption('OTRO');
                    setIsDropdownOpen(false);
                    setError('');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold border-t border-slate-100 cursor-pointer transition flex items-center justify-between ${
                    selectedOption === 'OTRO'
                      ? 'bg-[#01ACAD]/15 text-[#002559]'
                      : 'text-slate-700 hover:bg-[#E8F9F9] hover:text-[#002559]'
                  }`}
                >
                  <span>Otro día (elegir en calendario)...</span>
                  {selectedOption === 'OTRO' && (
                    <Check className="w-3.5 h-3.5 text-[#01ACAD]" />
                  )}
                </div>
              </div>
            )}

            {/* Calendario libre: Solo aparece si seleccionó "Otro día" */}
            {selectedOption === 'OTRO' && (
              <div className="pt-1.5 animate-in fade-in duration-200">
                <span className="block text-[11px] font-bold text-slate-700 mb-1">
                  Selecciona la fecha en el calendario:
                </span>
                <input
                  type="date"
                  required
                  value={customDate}
                  onChange={(e) => {
                    setCustomDate(e.target.value);
                    setError('');
                  }}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#01ACAD] focus:border-[#01ACAD] transition bg-white text-slate-900 font-medium cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="pt-2 flex gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#002559] hover:bg-[#001c47] text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
