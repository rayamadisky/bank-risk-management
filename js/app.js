/**
 * Bank Risk Management - Static Version
 * Pure JavaScript with LocalStorage
 * No server, no database required
 */

// ============================================
// CONSTANTS & CONFIG
// ============================================

const RISK_CATEGORIES = {
    'operasional': 'Risiko Operasional',
    'kredit': 'Risiko Kredit',
    'pasar': 'Risiko Pasar',
    'likuiditas': 'Risiko Likuiditas',
    'kepatuhan': 'Risiko Kepatuhan',
    'strategik': 'Risiko Strategik',
    'reputasi': 'Risiko Reputasi',
    'hukum': 'Risiko Hukum'
};

const LOSS_CATEGORIES = {
    'internal_fraud': 'Internal Fraud',
    'external_fraud': 'External Fraud',
    'employment_practices': 'Employment Practices & Workplace Safety',
    'clients_products': 'Clients, Products, & Business Practices',
    'damage_to_assets': 'Damage to Physical Assets',
    'business_disruption': 'Business Disruption & System Failures',
    'execution_delivery': 'Execution, Delivery & Process Management'
};

const RISK_LEVELS = {
    'rendah': { label: 'Rendah', class: 'success' },
    'sedang': { label: 'Sedang', class: 'warning' },
    'tinggi': { label: 'Tinggi', class: 'danger' },
    'ekstrem': { label: 'Ekstrem', class: 'danger' }
};

const FORM_STATUS = {
    'draft': { label: 'Draft', class: 'secondary' },
    'submitted': { label: 'Submitted', class: 'info' },
    'under_review': { label: 'Under Review', class: 'warning' },
    'approved': { label: 'Approved', class: 'success' },
    'rejected': { label: 'Rejected', class: 'danger' }
};

const CABANG_LIST = {
    'cabang_pusat': 'Cabang Pusat',
    'cabang_utara': 'Cabang Utara',
    'cabang_selatan': 'Cabang Selatan',
    'cabang_timur': 'Cabang Timur',
    'cabang_barat': 'Cabang Barat',
    'cabang_cibubur': 'Cabang Cibubur',
    'cabang_bekasi': 'Cabang Bekasi',
    'cabang_tangerang': 'Cabang Tangerang'
};

const JABATAN_LIST = {
    'admin': 'Administrator',
    'teller': 'Teller',
    'cs': 'Customer Service',
    'kepala_cabang': 'Kepala Cabang',
    'supervisor': 'Supervisor',
    'manager': 'Manager'
};

// Default users (password: "password" for all)
const DEFAULT_USERS = [
    { id: 1, username: 'admin', password: 'password', nama: 'Administrator', jabatan: 'Administrator', role: 'admin', cabang: 'Cabang Pusat' },
    { id: 2, username: 'teller1', password: 'password', nama: 'Teller Satu', jabatan: 'Teller', role: 'user', cabang: 'Cabang Pusat' },
    { id: 3, username: 'cs1', password: 'password', nama: 'Customer Service', jabatan: 'Customer Service', role: 'user', cabang: 'Cabang Utara' },
    { id: 4, username: 'kc1', password: 'password', nama: 'Kepala Cabang', jabatan: 'Kepala Cabang', role: 'admin', cabang: 'Cabang Pusat' },
    { id: 5, username: 'supervisor1', password: 'password', nama: 'Supervisor', jabatan: 'Supervisor', role: 'user', cabang: 'Cabang Selatan' },
    { id: 6, username: 'manager1', password: 'password', nama: 'Manager', jabatan: 'Manager', role: 'admin', cabang: 'Cabang Pusat' }
];

// ============================================
// LOCALSTORAGE FUNCTIONS
// ============================================

function initStorage() {
    // Initialize users if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    }
    // Initialize risk events if not exists
    if (!localStorage.getItem('riskEvents')) {
        localStorage.setItem('riskEvents', JSON.stringify([]));
    }
    // Initialize loss events if not exists
    if (!localStorage.getItem('lossEvents')) {
        localStorage.setItem('lossEvents', JSON.stringify([]));
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function getRiskEvents() {
    return JSON.parse(localStorage.getItem('riskEvents') || '[]');
}

function getLossEvents() {
    return JSON.parse(localStorage.getItem('lossEvents') || '[]');
}

function saveRiskEvents(events) {
    localStorage.setItem('riskEvents', JSON.stringify(events));
}

function saveLossEvents(events) {
    localStorage.setItem('lossEvents', JSON.stringify(events));
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ============================================
// AUTHENTICATION
// ============================================

function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Username atau password salah' };
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

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// ============================================
// RISK EVENT FUNCTIONS
// ============================================

function createRiskEvent(data) {
    const events = getRiskEvents();
    const newEvent = {
        id: Date.now(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    events.unshift(newEvent);
    saveRiskEvents(events);
    return newEvent;
}

function updateRiskEvent(id, data) {
    const events = getRiskEvents();
    const index = events.findIndex(e => e.id == id);
    if (index !== -1) {
        events[index] = { ...events[index], ...data, updated_at: new Date().toISOString() };
        saveRiskEvents(events);
        return events[index];
    }
    return null;
}

function deleteRiskEvent(id) {
    const events = getRiskEvents();
    const filtered = events.filter(e => e.id != id);
    saveRiskEvents(filtered);
}

function getRiskEventById(id) {
    const events = getRiskEvents();
    return events.find(e => e.id == id);
}

// ============================================
// LOSS EVENT FUNCTIONS
// ============================================

function createLossEvent(data) {
    const events = getLossEvents();
    const newEvent = {
        id: Date.now(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    events.unshift(newEvent);
    saveLossEvents(events);
    return newEvent;
}

function updateLossEvent(id, data) {
    const events = getLossEvents();
    const index = events.findIndex(e => e.id == id);
    if (index !== -1) {
        events[index] = { ...events[index], ...data, updated_at: new Date().toISOString() };
        saveLossEvents(events);
        return events[index];
    }
    return null;
}

function deleteLossEvent(id) {
    const events = getLossEvents();
    const filtered = events.filter(e => e.id != id);
    saveLossEvents(filtered);
}

function getLossEventById(id) {
    const events = getLossEvents();
    return events.find(e => e.id == id);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatRupiah(amount) {
    if (!amount || isNaN(amount)) return 'Rp 0';
    return 'Rp ' + parseInt(amount).toLocaleString('id-ID');
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getKategoriRiskLabel(key) {
    return RISK_CATEGORIES[key] || key;
}

function getKategoriLossLabel(key) {
    return LOSS_CATEGORIES[key] || key;
}

function getRiskLevelLabel(level) {
    return RISK_LEVELS[level]?.label || level;
}

function getRiskLevelClass(level) {
    return RISK_LEVELS[level]?.class || 'secondary';
}

function getStatusLabel(status) {
    return FORM_STATUS[status]?.label || status;
}

function getStatusClass(status) {
    return FORM_STATUS[status]?.class || 'secondary';
}

function getCabangLabel(key) {
    return CABANG_LIST[key] || key;
}

function getJabatanLabel(key) {
    return JABATAN_LIST[key] || key;
}

// ============================================
// EXPORT/IMPORT FUNCTIONS
// ============================================

function exportData() {
    const data = {
        users: getUsers(),
        riskEvents: getRiskEvents(),
        lossEvents: getLossEvents(),
        exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-risk-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert('Data berhasil diexport!', 'success');
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('Ini akan mengganti semua data saat ini. Lanjutkan?')) {
                if (data.users) localStorage.setItem('users', JSON.stringify(data.users));
                if (data.riskEvents) localStorage.setItem('riskEvents', JSON.stringify(data.riskEvents));
                if (data.lossEvents) localStorage.setItem('lossEvents', JSON.stringify(data.lossEvents));
                
                showAlert('Data berhasil diimport! Halaman akan direfresh.', 'success');
                setTimeout(() => location.reload(), 1500);
            }
        } catch (err) {
            showAlert('Gagal mengimport data. Format file tidak valid.', 'danger');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

function clearAllData() {
    if (confirm('Yakin ingin menghapus SEMUA data? Ini tidak bisa dibatalkan!')) {
        localStorage.removeItem('riskEvents');
        localStorage.removeItem('lossEvents');
        localStorage.setItem('riskEvents', JSON.stringify([]));
        localStorage.setItem('lossEvents', JSON.stringify([]));
        showAlert('Semua data telah dihapus!', 'success');
        setTimeout(() => location.reload(), 1500);
    }
}

// ============================================
// UI HELPERS
// ============================================

function showAlert(message, type = 'info') {
    const container = document.getElementById('alertContainer');
    if (!container) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor" style="width: 20px; height: 20px;">
            ${type === 'success' 
                ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
                : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>'
            }
        </svg>
        <div>${message}</div>
    `;
    
    container.innerHTML = '';
    container.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function formatCurrency(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value) {
        value = parseInt(value).toLocaleString('id-ID');
        input.value = value;
    }
}

function parseCurrency(value) {
    return parseFloat(value.replace(/[^\d]/g, '')) || 0;
}

// ============================================
// INITIALIZE
// ============================================

// Initialize storage on load
initStorage();
