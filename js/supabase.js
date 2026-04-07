// ============================================
// SUPABASE CONFIG - GANTI DENGAN DATA KAMU
// ============================================

const SUPABASE_URL = 'https://aibbyhfjmvqqtszrenyk.supabase.co';  // GANTI!
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYmJ5aGZqbXZxcXRzenJlbnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzAyOTIsImV4cCI6MjA5MTEwNjI5Mn0.-LMpuwfLXNTEwJuiKEzjCNEw_BAFzXEg9j5SdKBc1NU';    // GANTI!

// ============================================
// AUTH FUNCTIONS
// ============================================

async function loginDB(username, password) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?username=eq.${username}&password=eq.${password}`, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
    
    const users = await response.json();
    if (users.length > 0) {
        sessionStorage.setItem('currentUser', JSON.stringify(users[0]));
        return { success: true, user: users[0] };
    }
    return { success: false, message: 'Username atau password salah' };
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
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/risk_events`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
    });
    
    return await response.json();
}

async function getRiskEventsDB() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/risk_events?order=created_at.desc`, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
    
    return await response.json();
}

async function deleteRiskEventDB(id) {
    await fetch(`${SUPABASE_URL}/rest/v1/risk_events?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
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
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/loss_events`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
    });
    
    return await response.json();
}

async function getLossEventsDB() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/loss_events?order=created_at.desc`, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
    
    return await response.json();
}

async function deleteLossEventDB(id) {
    await fetch(`${SUPABASE_URL}/rest/v1/loss_events?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        }
    });
}