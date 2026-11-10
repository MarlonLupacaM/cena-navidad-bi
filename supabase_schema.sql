-- ==============================================================================
-- SCHEMA SUPABASE PARA CENA NAVIDEÑA (ÁREA TI / NUEVA ÁREA)
-- Copiar y pegar en el SQL Editor de tu proyecto Supabase:
-- https://mpfdcolvkqddckvmxluw.supabase.co
-- ==============================================================================

-- 1. TABLA DE VOTOS
CREATE TABLE IF NOT EXISTS public.votes (
    id BIGSERIAL PRIMARY KEY,
    employee_code TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    preferred_date TEXT,
    venue_id TEXT NOT NULL,
    venue_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA DE COMENTARIOS / MURO (Sin limitaciones de moderación)
CREATE TABLE IF NOT EXISTS public.comments (
    id BIGSERIAL PRIMARY KEY,
    type TEXT DEFAULT 'deseo',
    text TEXT NOT NULL,
    color_idx INTEGER DEFAULT 0,
    rotation TEXT DEFAULT 'rotate-0',
    ip_address TEXT,
    device_info TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA DE LIKES PARA POST-ITS
CREATE TABLE IF NOT EXISTS public.comment_likes (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT REFERENCES public.comments(id) ON DELETE CASCADE,
    device_id TEXT NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT comment_likes_unique_device UNIQUE (comment_id, device_id)
);

-- 4. FUNCIÓN RPC: Conteo en vivo de votos agrupados por sede
CREATE OR REPLACE FUNCTION public.get_vote_counts()
RETURNS TABLE (venue_id TEXT, count BIGINT)
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT venue_id, COUNT(*)::BIGINT AS count
    FROM public.votes
    GROUP BY venue_id;
$$;

-- 5. FUNCIÓN RPC: Verificar si un trabajador ya emitió su voto
CREATE OR REPLACE FUNCTION public.check_employee_voted(p_code TEXT)
RETURNS SETOF public.votes
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT *
    FROM public.votes
    WHERE employee_code = TRIM(p_code)
    LIMIT 1;
$$;

-- 6. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_likes ENABLE ROW LEVEL SECURITY;

-- 7. POLÍTICAS DE ACCESO ANÓNIMO (PUBLIC ANON ACCESS)
DROP POLICY IF EXISTS "Permitir inserción de votos" ON public.votes;
CREATE POLICY "Permitir inserción de votos" ON public.votes
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura de votos" ON public.votes;
CREATE POLICY "Permitir lectura de votos" ON public.votes
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Permitir lectura de comentarios" ON public.comments;
CREATE POLICY "Permitir lectura de comentarios" ON public.comments
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Permitir publicación de comentarios" ON public.comments;
CREATE POLICY "Permitir publicación de comentarios" ON public.comments
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura de likes" ON public.comment_likes;
CREATE POLICY "Permitir lectura de likes" ON public.comment_likes
    FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Permitir agregar like" ON public.comment_likes;
CREATE POLICY "Permitir agregar like" ON public.comment_likes
    FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir quitar like" ON public.comment_likes;
CREATE POLICY "Permitir quitar like" ON public.comment_likes
    FOR DELETE TO anon USING (true);
