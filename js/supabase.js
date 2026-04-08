/**
 * Bank Risk Management - Supabase Integration
 * Database: PostgreSQL via Supabase
 */

// ============================================
// CONFIG - GANTI DENGAN DATA KAMU!
// ============================================
const SUPABASE_URL = 'https://aibbyhfjmvqqtszrenyk.supabase.co';  // GANTI!
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYmJ5aGZqbXZxcXRzenJlbnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzAyOTIsImV4cCI6MjA5MTEwNjI5Mn0.-LMpuwfLXNTEwJuiKEzjCNEw_BAFzXEg9j5SdKBc1NU';    // GANTI! (anon public)

// ============================================
// HELPER FUNCTIONS
// ============================================
async function supabaseFetch(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    
    if (!response.ok) {
        const error = await response.text();
        console.error('Supabase Error:', error);
        throw new Error(error);
    }
    
    return response.json();
}

// ============================================
// AUTH FUNCTIONS
// ============================================
async function loginDB(username, password) {
    try {
        const users = await supabaseFetch(`/users?username=eq.${username}&password=eq.${password}`);
        
        if (users && users.length > 0) {
            const user = users[0];
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Username atau password salah' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Terjadi kesalahan koneksi' };
    }
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function isLoggedIn() {
    return sessionStorage.getItem('currentUser') !== null;
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
}

// ============================================
// RISK EVENT FUNCTIONS
// ============================================
async function createRiskEventDB(data) {
    const user = getCurrentUser();
    const payload = {
        ...data,
        user_id: user.id,
        user_nama: user.nama
    };
    
    return await supabaseFetch('/risk_events', {
        method: 'POST',
        headers: {
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
    });
}

async function getRiskEventsDB() {
    return await supabaseFetch('/risk_events?order=created_at.desc');
}

async function getRiskEventByIdDB(id) {
    const events = await supabaseFetch(`/risk_events?id=eq.${id}`);
    return events[0];
}

async function updateRiskEventDB(id, data) {
    return await supabaseFetch(`/risk_events?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
    });
}

async function deleteRiskEventDB(id) {
    return await supabaseFetch(`/risk_events?id=eq.${id}`, {
        method: 'DELETE'
    });
}

// ============================================
// LOSS EVENT FUNCTIONS
// ============================================
async function createLossEventDB(data) {
    const user = getCurrentUser();
    const payload = {
        ...data,
        user_id: user.id,
        user_nama: user.nama
    };
    
    return await supabaseFetch('/loss_events', {
        method: 'POST',
        headers: {
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
    });
}

async function getLossEventsDB() {
    return await supabaseFetch('/loss_events?order=created_at.desc');
}

async function getLossEventByIdDB(id) {
    const events = await supabaseFetch(`/loss_events?id=eq.${id}`);
    return events[0];
}

async function updateLossEventDB(id, data) {
    return await supabaseFetch(`/loss_events?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
    });
}

async function deleteLossEventDB(id) {
    return await supabaseFetch(`/loss_events?id=eq.${id}`, {
        method: 'DELETE'
    });
}

// ============================================
// STATS FUNCTIONS
// ============================================
async function getDashboardStatsDB() {
    const [risks, losses] = await Promise.all([
        getRiskEventsDB(),
        getLossEventsDB()
    ]);
    
    const totalNominal = losses.reduce((sum, loss) => sum + (parseFloat(loss.nominal_kerugian) || 0), 0);
    const totalRecovery = losses.reduce((sum, loss) => sum + (parseFloat(loss.recovery) || 0), 0);
    const totalNetLoss = losses.reduce((sum, loss) => sum + (parseFloat(loss.net_loss) || 0), 0);
    
    return {
        totalRisk: risks.length,
        totalLoss: losses.length,
        totalNominal,
        totalRecovery,
        totalNetLoss,
        approvedRisk: risks.filter(r => r.status === 'approved').length,
        draftRisk: risks.filter(r => r.status === 'draft').length,
        ekstremRisk: risks.filter(r => r.level_risiko === 'ekstrem').length
    };
}
