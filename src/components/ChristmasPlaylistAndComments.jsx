import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, ShieldAlert, Info } from 'lucide-react';
import { getLiveComments, insertComment } from '../lib/supabase';

const POSTIT_COLORS = [
  {
    id: 'yellow',
    bg: 'bg-amber-100',
    border: 'border-amber-300',
    text: 'text-amber-950',
    tape: 'bg-amber-200/80',
    shadow: 'shadow-amber-200/50'
  },
  {
    id: 'pink',
    bg: 'bg-rose-100',
    border: 'border-rose-300',
    text: 'text-rose-950',
    tape: 'bg-rose-200/80',
    shadow: 'shadow-rose-200/50'
  },
  {
    id: 'cyan',
    bg: 'bg-cyan-100',
    border: 'border-cyan-300',
    text: 'text-cyan-950',
    tape: 'bg-cyan-200/80',
    shadow: 'shadow-cyan-200/50'
  },
  {
    id: 'green',
    bg: 'bg-emerald-100',
    border: 'border-emerald-300',
    text: 'text-emerald-950',
    tape: 'bg-emerald-200/80',
    shadow: 'shadow-emerald-200/50'
  },
  {
    id: 'purple',
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-950',
    tape: 'bg-purple-200/80',
    shadow: 'shadow-purple-200/50'
  }
];

const ROTATIONS = [
  '-rotate-2',
  'rotate-1',
  '-rotate-1',
  'rotate-2',
  'rotate-0',
  '-rotate-3',
  'rotate-3'
];

const INITIAL_NOTES = [
  {
    id: 1,
    type: 'deseo',
    text: '¡Que esta cena navideña sea una noche inolvidable para celebrar todos los logros y el esfuerzo de este año en equipo!',
    colorIdx: 0,
    rotation: '-rotate-2',
    time: 'Hace un momento'
  },
  {
    id: 2,
    type: 'deseo',
    text: 'Deseo que pasemos un momento lindo compartiendo juntos, bailando y despidiendo este gran año con la mejor energía.',
    colorIdx: 1,
    rotation: 'rotate-2',
    time: 'Hace un momento'
  },
  {
    id: 3,
    type: 'deseo',
    text: '¡Muchos éxitos para el próximo año! A disfrutar nuestra cena navideña al máximo con toda la buena vibra.',
    colorIdx: 2,
    rotation: '-rotate-1',
    time: 'Hace un momento'
  }
];

export default function ChristmasPlaylistAndComments() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('caja_muro_postits_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const missingInitials = INITIAL_NOTES.filter(
            (init) => !parsed.some((p) => p.text === init.text || p.id === init.id)
          );
          return [...parsed, ...missingInitials];
        }
      }
      return INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  const [type, setType] = useState('deseo');
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(notes.length / ITEMS_PER_PAGE) || 1;
  const visibleNotes = notes.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  useEffect(() => {
    try {
      localStorage.setItem('caja_muro_postits_v4', JSON.stringify(notes));
    } catch {
      // quota fallback
    }
  }, [notes]);

  // Sincronización en vivo con Supabase para el muro de post-its
  useEffect(() => {
    let isMounted = true;

    const syncComments = async () => {
      const liveData = await getLiveComments();
      if (!isMounted || !Array.isArray(liveData)) return;

      const formatted = liveData.map((item, idx) => ({
        id: item.id,
        type: item.type || 'deseo',
        text: item.text,
        colorIdx: typeof item.color_idx === 'number' ? item.color_idx : idx % POSTIT_COLORS.length,
        rotation: item.rotation || 'rotate-0',
        time: item.created_at
          ? new Date(item.created_at).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
          : 'Hace un momento'
      }));

      // Las notas nuevas de la BD van primero y las 3 notas iniciales siempre se preservan
      const merged = [
        ...formatted.filter((f) => !INITIAL_NOTES.some((init) => init.id === f.id || init.text === f.text)),
        ...INITIAL_NOTES
      ];

      setNotes(merged);
      try {
        localStorage.setItem('caja_muro_postits_v4', JSON.stringify(merged));
      } catch {}
    };

    syncComments();
    const interval = setInterval(syncComments, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const randomRot = ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
    const noteText = text.trim();
    const noteColor = selectedColor;
    const noteType = type;

    const tempId = `temp-${Date.now()}`;
    const newNote = {
      id: tempId,
      type: noteType,
      text: noteText,
      colorIdx: noteColor,
      rotation: randomRot,
      time: 'Hace un momento'
    };

    // Actualización inmediata en UI
    setNotes((prev) => [newNote, ...prev]);
    setCurrentPage(0);
    setText('');
    setSelectedColor((prev) => (prev + 1) % POSTIT_COLORS.length);
    setIsModalOpen(false);

    // Guardado en Supabase con IP y dispositivo
    const res = await insertComment({
      type: noteType,
      text: noteText,
      colorIdx: noteColor,
      rotation: randomRot
    });

    if (res?.success && res.data?.id) {
      setNotes((prev) =>
        prev.map((n) => (n.id === tempId ? { ...n, id: res.data.id } : n))
      );
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-slate-100">
        <div>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#01ACAD] block mb-1">
            Comunidad de Caja Arequipa
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-[#002559]">
            Muro de Deseos y Opiniones
          </h3>
        </div>

        {/* Top Controls: Navegación de páginas con flechitas y botón Agregar */}
        <div className="flex items-center gap-3 self-start md:self-center">
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 bg-[#F4F7FB] border border-slate-200 px-2 py-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={handlePrevPage}
                className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition shadow-2xs active:scale-95 cursor-pointer"
                title="Página anterior"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>

              <span className="text-[11px] font-black text-[#002559] px-2 select-none">
                {currentPage + 1} / {totalPages}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition shadow-2xs active:scale-95 cursor-pointer"
                title="Página siguiente"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#002559] hover:bg-[#001c47] text-white font-bold text-xs py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#01ACAD]" />
            <span>Agregar comentario</span>
          </button>
        </div>
      </div>

      {/* Tablero de Corcho con Post-its: Exactamente 8 por página (2 filas de 4) */}
      <div
        className="relative rounded-3xl p-5 sm:p-7 min-h-[440px] border-4 border-[#8B5A2B]/40 shadow-inner overflow-hidden"
        style={{
          backgroundColor: '#DEB887',
          backgroundImage: `
            radial-gradient(#C69255 15%, transparent 16%),
            radial-gradient(#B8860B 15%, transparent 16%),
            linear-gradient(45deg, rgba(160, 106, 40, 0.15) 25%, transparent 25%, transparent 75%, rgba(160, 106, 40, 0.15) 75%),
            linear-gradient(45deg, rgba(160, 106, 40, 0.15) 25%, transparent 25%, transparent 75%, rgba(160, 106, 40, 0.15) 75%)
          `,
          backgroundSize: '24px 24px, 24px 24px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 12px 12px, 0 0, 20px 20px'
        }}
      >
        {/* Post-its Grid: Cuadrícula fija de hasta 8 elementos sin scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleNotes.map((note) => {
            const color = POSTIT_COLORS[note.colorIdx % POSTIT_COLORS.length];
            const isDeseo = note.type === 'deseo';

            return (
              <div
                key={note.id}
                className={`relative ${color.bg} ${color.text} ${color.border} border p-4 pt-5 pb-8 rounded-xs shadow-lg ${color.shadow} transform ${note.rotation} hover:rotate-0 hover:scale-105 transition-all duration-200 flex flex-col justify-between min-h-[185px] sm:min-h-[200px] select-none`}
                style={{
                  boxShadow: '0 8px 18px rgba(0,0,0,0.16), 0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                {/* Chincheta roja clásica */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-red-600 shadow-md border border-white flex items-center justify-center z-10">
                  <div className="w-1 h-1 rounded-full bg-white opacity-80" />
                </div>

                {/* Tape sutil en esquina */}
                <div
                  className={`absolute top-0 right-3 w-7 h-3 ${color.tape} opacity-70 -rotate-6`}
                />

                {/* Encabezado del Post-it */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-2.5 border-b border-black/10 pb-1">
                    <span className="opacity-90">
                      {isDeseo ? 'Deseo' : 'Opinión'}
                    </span>
                    <span className="opacity-60 text-[9px] font-medium">{note.time}</span>
                  </div>

                  <p className="text-xs sm:text-[13px] font-medium leading-relaxed font-sans text-slate-800">
                    "{note.text}"
                  </p>
                </div>

                {/* Espacio inferior libre característico de un Post-it con sutil sombra de despegue */}
                <div className="mt-4 pt-4 relative flex items-center justify-end">
                  {/* Sutil pestaña/sombra simulando que la esquina inferior está ligeramente levantada */}
                  <div className="w-4 h-4 bg-black/5 rounded-tl-sm opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {notes.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-center text-[#5C3A1E]">
            <p className="font-bold text-sm">No hay notas en el tablero aún.</p>
            <p className="text-xs opacity-80 mt-1">Usa el botón "Agregar comentario" para dejar una.</p>
          </div>
        )}
      </div>

      {/* Fin del tablero */}

      {/* Modal para Agregar Comentario con Anuncio de Normas */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#01ACAD] block">
                  Comunidad Caja Arequipa
                </span>
                <h4 className="text-base font-black text-[#002559]">
                  Publicar en el Muro
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Anuncio de Normas y Moderación */}
            <div className="mb-4 bg-amber-50 border border-amber-200/90 rounded-2xl p-3 text-amber-950 text-[11px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-black text-amber-900 mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Normas de convivencia del muro</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-amber-900/90 font-medium">
                <li>Solo comentarios de <strong>deseos navideños y opiniones</strong> sobre las sedes.</li>
                <li><strong>Prohibido lenguaje ofensivo</strong>, quejas o comentarios inapropiados.</li>
                <li><strong>Evita colocar nombres</strong> o alusiones personales a compañeros.</li>
              </ul>
              <div className="mt-2 pt-1.5 border-t border-amber-200/60 flex items-center gap-1 text-[10px] text-amber-800 font-semibold">
                <Info className="w-3 h-3 shrink-0" />
                <span>Por seguridad y auditoría se registra la IP y el dispositivo de cada publicación.</span>
              </div>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3.5 text-xs">
              {/* Selector de Tipo */}
              <div>
                <label className="block font-bold text-[#002559] mb-1.5">
                  Tipo de publicación:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType('deseo')}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center cursor-pointer ${
                      type === 'deseo'
                        ? 'bg-rose-100 border-rose-400 text-rose-950 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Deseo
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('opinion')}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center cursor-pointer ${
                      type === 'opinion'
                        ? 'bg-cyan-100 border-cyan-400 text-cyan-950 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    Opinión
                  </button>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block font-bold text-[#002559] mb-1">
                  Mensaje:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    type === 'deseo'
                      ? 'Escribe tu deseo o saludo para el equipo...'
                      : 'Escribe tu opinión constructiva sobre los locales...'
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#01ACAD] resize-none text-slate-900"
                />
              </div>

              {/* Color del Post-it */}
              <div>
                <label className="block font-bold text-[#002559] mb-1.5">
                  Color del post-it:
                </label>
                <div className="flex items-center gap-2">
                  {POSTIT_COLORS.map((col, idx) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColor(idx)}
                      className={`w-7 h-7 rounded-xl ${col.bg} ${col.border} border-2 transition transform hover:scale-110 cursor-pointer ${
                        selectedColor === idx ? 'ring-2 ring-[#002559] scale-110 shadow-xs' : 'opacity-80'
                      }`}
                      title={col.id}
                    />
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold py-2 px-3 rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#002559] hover:bg-[#001c47] text-white font-bold py-2 px-3 rounded-xl transition shadow-sm active:scale-95 cursor-pointer"
                >
                  Publicar Post-it
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

