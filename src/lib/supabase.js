// Cliente ligero y seguro para Supabase usando Fetch API nativa (0 dependencias requeridas)
export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || 'https://kwkgbuhpjtwarxlaxijn.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zhMJ348W6X66IDqnFyBV4w_ufIMcOep';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Obtiene el conteo agregado de votos por cada sede de manera anónima y segura
 */
export async function getLiveVoteCounts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_vote_counts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({})
    });
    if (!res.ok) throw new Error(`Error en RPC vote counts: ${res.statusText}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Supabase no disponible para conteo de votos, usando fallback local:', err.message);
    return null;
  }
}

/**
 * Verifica si un código de trabajador ya emitió su voto
 */
export async function checkEmployeeHasVoted(employeeCode) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/check_employee_voted`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ p_code: employeeCode.trim() })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (err) {
    console.warn('Error verificando voto del colaborador:', err.message);
    return null;
  }
}

/**
 * Emite un voto en la base de datos de Supabase
 */
export async function insertVote({ employeeCode, email, preferredDate, venueId, venueName }) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/votes`, {
      method: 'POST',
      headers: {
        ...headers,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        employee_code: employeeCode.trim(),
        email: email.trim(),
        preferred_date: preferredDate || null,
        venue_id: venueId,
        venue_name: venueName
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      const isDuplicate =
        res.status === 409 ||
        errorText.toLowerCase().includes('duplicate') ||
        errorText.toLowerCase().includes('unique') ||
        errorText.toLowerCase().includes('already exists');

      return {
        success: false,
        duplicate: isDuplicate,
        error: isDuplicate
          ? 'Este código de trabajador o correo ya registró un voto.'
          : errorText || 'Error al registrar el voto en Supabase'
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Error insertando voto en Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Carga los comentarios y deseos del muro desde Supabase
 */
export async function getLiveComments() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?select=*&order=created_at.desc&limit=60`, {
      method: 'GET',
      headers
    });
    if (!res.ok) throw new Error(`Error obteniendo comentarios: ${res.statusText}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('Supabase no disponible para comentarios, usando fallback local:', err.message);
    return null;
  }
}

/**
 * Obtiene la IP pública del usuario de forma segura y ligera
 */
async function getUserIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      return data.ip || 'Desconocida';
    }
  } catch {}
  return 'Desconocida';
}

/**
 * Obtiene una descripción legible del dispositivo/navegador
 */
function getDeviceInfo() {
  try {
    const ua = navigator.userAgent;
    let device = 'Escritorio';
    if (/android/i.test(ua)) device = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) device = 'iOS';
    else if (/mobile/i.test(ua)) device = 'Móvil';

    let browser = 'Navegador';
    if (/edg/i.test(ua)) browser = 'Edge';
    else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
    else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
    else if (/safari/i.test(ua)) browser = 'Safari';

    return `${device} - ${browser}`;
  } catch {
    return 'Desconocido';
  }
}

/**
 * Publica un nuevo post-it en el muro de Supabase guardando IP y dispositivo
 */
export async function insertComment({ type, text, colorIdx, rotation }) {
  try {
    const [ip, deviceInfo] = await Promise.all([
      getUserIP(),
      Promise.resolve(getDeviceInfo())
    ]);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        type: type || 'deseo',
        text: text.trim(),
        color_idx: typeof colorIdx === 'number' ? colorIdx : 0,
        rotation: rotation || 'rotate-0',
        ip_address: ip,
        device_info: deviceInfo
      })
    });

    if (!res.ok) {
      // Si la base de datos aún no tiene las columnas ip_address o device_info, reintenta sin ellas
      const fallbackRes = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: 'POST',
        headers: {
          ...headers,
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          type: type || 'deseo',
          text: text.trim(),
          color_idx: typeof colorIdx === 'number' ? colorIdx : 0,
          rotation: rotation || 'rotate-0'
        })
      });
      if (!fallbackRes.ok) {
        const errorText = await fallbackRes.text();
        return { success: false, error: errorText };
      }
      const createdFallback = await fallbackRes.json();
      return { success: true, data: Array.isArray(createdFallback) ? createdFallback[0] : createdFallback };
    }

    const created = await res.json();
    return { success: true, data: Array.isArray(created) ? created[0] : created };
  } catch (err) {
    console.error('Error publicando comentario en Supabase:', err);
    return { success: false, error: err.message };
  }
}
