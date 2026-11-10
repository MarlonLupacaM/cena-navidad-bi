import React, { useState, useEffect } from 'react';
import { Mail, CreditCard, AlertCircle, Calendar, ChevronDown, Check, X, Plus } from 'lucide-react';

const SUGGESTED_DATES = [
  { label: 'Viernes 27 de noviembre', value: '27/11/2026' },
  { label: 'Jueves 3 de diciembre', value: '03/12/2026' },
  { label: 'Lunes 7 de diciembre', value: '07/12/2026' },
  { label: 'Jueves 10 de diciembre', value: '10/12/2026' },
  { label: 'Jueves 17 de diciembre', value: '17/12/2026' },
  { label: 'Viernes 18 de diciembre', value: '18/12/2026' }
];

// Convierte fecha ISO (YYYY-MM-DD) a formato DD/MM/AAAA
function formatToDDMMAAAA(isoDate) {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return isoDate;
}

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

  // Lista de fechas: inicia con 1 fila con la primera sugerida
  const [dateEntries, setDateEntries] = useState(() => {
    if (existingVote?.preferredDate) {
      const dates = existingVote.preferredDate
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean);

      if (dates.length > 0) {
        return dates.map((d, index) => {
          const isSuggested = SUGGESTED_DATES.some((s) => s.value === d);
          return {
            id: index + 1,
            selected: isSuggested ? d : 'OTRO',
            custom: isSuggested ? '' : d.split('/').reverse().join('-')
          };
        });
      }
    }
    return [{ id: 1, selected: '27/11/2026', custom: '' }];
  });

  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [error, setError] = useState('');

  // Modifica un campo de la fila
  const handleEntryChange = (id, field, value) => {
    setError('');
    setDateEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  // Agrega una nueva fecha a la lista
  const handleAddDateRow = () => {
    setError('');
    const alreadySelected = dateEntries.map((e) => e.selected);
    const available = SUGGESTED_DATES.find((s) => !alreadySelected.includes(s.value));
    const nextVal = available ? available.value : 'OTRO';

    setDateEntries((prev) => [
      ...prev,
      { id: Date.now(), selected: nextVal, custom: '' }
    ]);
  };

  // Quita una fecha de la lista
  const handleRemoveDateRow = (id) => {
    setError('');
    if (dateEntries.length <= 1) return;
    setDateEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Texto que se muestra dentro del div personalizado
  const getEntryLabel = (entry) => {
    if (entry.selected === 'OTRO') {
      return entry.custom
        ? `Otro día: ${formatToDDMMAAAA(entry.custom)}`
        : 'Otro día (elegir en calendario)...';
    }
    const found = SUGGESTED_DATES.find((s) => s.value === entry.selected);
    return found ? found.label : 'Seleccionar fecha...';
  };

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

    // Extraer y validar todas las fechas en DD/MM/AAAA
    const finalDates = [];
    for (let i = 0; i < dateEntries.length; i++) {
      const entry = dateEntries[i];
      if (entry.selected === 'OTRO') {
        if (!entry.custom) {
          setError(`Por favor selecciona la fecha en el calendario para la opción ${i + 1}`);
          return;
        }
        const formatted = formatToDDMMAAAA(entry.custom);
        if (!finalDates.includes(formatted)) {
          finalDates.push(formatted);
        }
      } else if (entry.selected) {
        if (!finalDates.includes(entry.selected)) {
          finalDates.push(entry.selected);
        }
      }
    }

    if (finalDates.length === 0) {
      setError('Por favor selecciona al menos una fecha');
      return;
    }

    // Formato estricto para base de datos: solo DD/MM/AAAA separados por coma
    const finalDatesString = finalDates.join(',');

    onSubmitVote({
      venueId: venue.id,
      venueName: venue.name,
      email: email.trim(),
      employeeCode: employeeCode.trim(),
      preferredDate: finalDatesString,
      collaboratorName: email.trim().split('@')[0],
      votedAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con el fondo SVG de la pantalla principal */}
        <div
          className="p-5 sm:p-6 relative border-b border-slate-200 overflow-hidden"
          style={{
            backgroundColor: '#F4F7FB',
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(220, 248, 248, 0.9) 60%, rgba(1, 172, 173, 0.35) 100%), url('/Img/fondo.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top right'
          }}
        >
          <h2 className="text-lg sm:text-xl font-black text-[#002559] leading-tight">
            Confirmar Voto
          </h2>
          <p className="text-xs text-slate-700 font-medium mt-0.5">
            Ingresa tus datos y selecciona tus fechas de preferencia.
          </p>
        </div>

        {/* Selected Venue Summary pill */}
        <div className="p-4 sm:p-5 pb-2">
          <div className="bg-[#F4F7FB] border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-14 h-14 rounded-xl object-contain shrink-0 bg-white"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-black text-[#002559] truncate">{venue.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{venue.style}</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 pt-2 space-y-3.5 text-xs">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-xl flex items-center gap-2 font-bold animate-in fade-in">
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
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01ACAD] focus:border-[#01ACAD] transition bg-white text-slate-900"
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
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01ACAD] focus:border-[#01ACAD] transition bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Lista de Fechas con Divs Personalizados */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block font-black text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#01ACAD]" />
                <span>Fecha(s) de preferencia *</span>
              </label>
              <span className="text-[11px] font-bold text-[#01ACAD] bg-[#E8F9F9] px-2 py-0.5 rounded-md">
                {dateEntries.length} {dateEntries.length === 1 ? 'fecha' : 'fechas'}
              </span>
            </div>

            {/* Filas de fechas dinámicas */}
            <div className="space-y-2.5">
              {dateEntries.map((entry, index) => {
                const isOpen = activeDropdownId === entry.id;

                return (
                  <div key={entry.id} className={`relative space-y-1.5 ${isOpen ? 'z-30' : 'z-10'}`}>
                    <div className="flex items-center gap-2">
                      {/* Solo número 1., 2., etc. */}
                      <span className="text-xs font-black text-[#002559] shrink-0 w-5 text-center">
                        {index + 1}.
                      </span>

                      {/* Div personalizado interactivo */}
                      <div className="flex-1 relative">
                        <div
                          onClick={() => setActiveDropdownId(isOpen ? null : entry.id)}
                          className="w-full border border-slate-300 hover:border-[#01ACAD] rounded-2xl px-3.5 py-2.5 bg-white text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-between cursor-pointer transition shadow-2xs select-none"
                        >
                          <span className="truncate">
                            {getEntryLabel(entry)}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180 text-[#01ACAD]' : ''
                            }`}
                          />
                        </div>

                        {/* Overlay para cerrar al hacer clic afuera */}
                        {isOpen && (
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setActiveDropdownId(null)}
                          />
                        )}

                        {/* Desplegable en div personalizado con scroll celeste */}
                        {isOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 py-1.5 max-h-48 overflow-y-auto custom-scrollbar-cyan animate-in fade-in zoom-in-95 duration-150">
                            {SUGGESTED_DATES.map((item) => (
                              <div
                                key={item.value}
                                onClick={() => {
                                  handleEntryChange(entry.id, 'selected', item.value);
                                  setActiveDropdownId(null);
                                }}
                                className={`px-3.5 py-2 text-xs font-bold cursor-pointer transition flex items-center justify-between ${
                                  entry.selected === item.value
                                    ? 'bg-[#01ACAD]/15 text-[#002559]'
                                    : 'text-slate-700 hover:bg-[#E8F9F9] hover:text-[#002559]'
                                }`}
                              >
                                <span>{item.label}</span>
                                {entry.selected === item.value && (
                                  <Check className="w-3.5 h-3.5 text-[#01ACAD]" />
                                )}
                              </div>
                            ))}

                            <div
                              onClick={() => {
                                handleEntryChange(entry.id, 'selected', 'OTRO');
                                setActiveDropdownId(null);
                              }}
                              className={`px-3.5 py-2 text-xs font-bold border-t border-slate-100 cursor-pointer transition flex items-center justify-between ${
                                entry.selected === 'OTRO'
                                  ? 'bg-[#01ACAD]/15 text-[#002559]'
                                  : 'text-slate-700 hover:bg-[#E8F9F9] hover:text-[#002559]'
                              }`}
                            >
                              <span>Otro día (elegir en calendario)...</span>
                              {entry.selected === 'OTRO' && (
                                <Check className="w-3.5 h-3.5 text-[#01ACAD]" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Botón para eliminar fila (si hay más de 1) */}
                      {dateEntries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDateRow(entry.id)}
                          className="w-8 h-8 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition shrink-0 cursor-pointer"
                          title="Quitar esta opción"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Calendario libre cuando elige OTRO */}
                    {entry.selected === 'OTRO' && (
                      <div className="pl-7 flex items-center gap-2 pt-0.5 animate-in fade-in duration-200">
                        <span className="text-[11px] font-bold text-slate-600 shrink-0">
                          Fecha en calendario:
                        </span>
                        <input
                          type="date"
                          required
                          value={entry.custom}
                          onChange={(e) => handleEntryChange(entry.id, 'custom', e.target.value)}
                          className="text-xs border border-slate-300 hover:border-[#01ACAD] rounded-xl px-2.5 py-1.5 bg-white text-slate-900 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#01ACAD]"
                        />
                        {entry.custom && (
                          <span className="text-[11px] font-mono font-bold text-[#01ACAD] bg-[#E8F9F9] px-2 py-0.5 rounded-md">
                            {formatToDDMMAAAA(entry.custom)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Botón único para agregar otra fecha (sin '+' duplicado) */}
            {dateEntries.length < 5 && (
              <button
                type="button"
                onClick={handleAddDateRow}
                className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-[#01ACAD] hover:bg-[#E8F9F9]/40 text-[#002559] rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#01ACAD]" />
                <span>Agregar otra fecha</span>
              </button>
            )}
          </div>

          {/* Botones de acción */}
          <div className="pt-2 flex gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#002559] hover:bg-[#001c47] text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
