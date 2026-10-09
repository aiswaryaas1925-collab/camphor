// script.js - Shared application logic and Demo Data

// Demo Data (Global so page specific scripts can access it)
const APP_DATA = {
    notifications: [
        { id: 1, type: 'result', title: 'S3 Results Published', desc: 'B.Tech S3 (R,S) Exam Dec 2025 results are now available.', date: '2026-10-08', unread: true, link: 'results.html' },
        { id: 2, type: 'exam', title: 'S5 Exam Timetable', desc: 'Timetable for upcoming S5 regular examinations published.', date: '2026-10-05', unread: true, link: 'examinations.html' },
        { id: 3, type: 'general', title: 'Demo Portal Live', desc: 'Welcome to the KTU Student Portal Prototype.', date: '2026-10-01', unread: false, link: 'index.html' }
    ],
    semesters: {
        'S1': { status: 'pass', sgpa: '8.45', supplyCount: 0, label: 'Published' },
        'S2': { status: 'pass', sgpa: '7.90', supplyCount: 0, label: 'Published' },
        'S3': { status: 'supply', sgpa: 'N/A', supplyCount: 1, label: '1 Supply' },
        'S4': { status: 'pass', sgpa: '8.10', supplyCount: 0, label: 'Published' },
        'S5': { status: 'pending', sgpa: 'N/A', supplyCount: 0, label: 'Pending' },
        'S6': { status: 'supply', sgpa: 'N/A', supplyCount: 2, label: '2 Supplies' },
        'S7': { status: 'pending', sgpa: 'N/A', supplyCount: 0, label: 'Pending' },
        'S8': { status: 'pending', sgpa: 'N/A', supplyCount: 0, label: 'Pending' }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initNotifications();
    initSearch();
    updateCardIndicators();
});

function initNotifications() {
    const notifBtn = document.getElementById('notif-btn');
    const badge = document.getElementById('notif-badge');
    
    // Create dropdown dynamically
    const dropdown = document.createElement('div');
    dropdown.className = 'notif-dropdown';
    dropdown.id = 'notif-dropdown';
    document.querySelector('.header-right').appendChild(dropdown);

    // Render logic
    function renderNotifs() {
        const unreadCount = APP_DATA.notifications.filter(n => n.unread).length;
        badge.style.display = unreadCount > 0 ? 'block' : 'none';
        badge.innerText = unreadCount;

        dropdown.innerHTML = `
            <div class="notif-header">
                <span>Notifications (Demo)</span>
                <button onclick="markAllRead()">Mark all read</button>
            </div>
            ${APP_DATA.notifications.map(n => `
                <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="window.location.href='${n.link}'">
                    <h4>${n.title}</h4>
                    <p>${n.desc}</p>
                    <small>${n.date}</small>
                </div>
            `).join('')}
        `;
    }

    // Toggle dropdown
    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== notifBtn) {
            dropdown.classList.remove('show');
        }
    });

    // Expose markAllRead to global scope for the button inline onclick
    window.markAllRead = function() {
        APP_DATA.notifications.forEach(n => n.unread = false);
        renderNotifs();
        updateCardIndicators();
    };

    renderNotifs();
}

function updateCardIndicators() {
    // Update dots on homepage cards if we are on index.html
    const resultCardIndicator = document.getElementById('indicator-results');
    const examCardIndicator = document.getElementById('indicator-exams');
    
    if (resultCardIndicator) {
        const hasUnreadResults = APP_DATA.notifications.some(n => n.type === 'result' && n.unread);
        resultCardIndicator.style.display = hasUnreadResults ? 'block' : 'none';
    }
    
    if (examCardIndicator) {
        const hasUnreadExams = APP_DATA.notifications.some(n => n.type === 'exam' && n.unread);
        examCardIndicator.style.display = hasUnreadExams ? 'block' : 'none';
    }
}

function initSearch() {
    const searchInput = document.getElementById('global-search');
    if(!searchInput) return;

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase();
            if (!query) return;

            const path = window.location.pathname;
            
            // Basic page-aware search demo routing
            if (path.includes('results.html') || query.includes('result') || query.includes('sgpa')) {
                if(!path.includes('results.html')) window.location.href = 'results.html';
                else alert(`Search Result: Filtering results for "${query}" (Demo Feature)`);
            } 
            else if (path.includes('examinations.html') || query.includes('exam') || query.includes('time')) {
                if(!path.includes('examinations.html')) window.location.href = 'examinations.html';
                else alert(`Search Result: Filtering examinations for "${query}" (Demo Feature)`);
            }
            else {
                alert(`Search: No matching modules found for "${query}" on this page.`);
            }
        }
    });
}