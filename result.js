// results.js - Page specific logic

document.addEventListener('DOMContentLoaded', () => {
    renderSemesterButtons();
    renderResultAnnouncements();
});

function renderSemesterButtons() {
    const grid = document.getElementById('semester-grid');
    grid.innerHTML = ''; // clear

    // APP_DATA.semesters comes from script.js
    Object.keys(APP_DATA.semesters).forEach(semKey => {
        const semData = APP_DATA.semesters[semKey];
        const btn = document.createElement('button');
        
        btn.className = `sem-btn ${semData.status}`;
        btn.innerHTML = `${semKey} <span>${semData.label}</span>`;
        
        btn.onclick = () => {
            // Update active state visually
            document.querySelectorAll('.sem-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render details panel
            showSemesterDetails(semKey, semData);
        };
        
        grid.appendChild(btn);
    });
}

function showSemesterDetails(semKey, data) {
    const panel = document.getElementById('result-details');
    const title = document.getElementById('detail-sem-title');
    const badge = document.getElementById('detail-status-badge');
    const content = document.getElementById('detail-content');

    panel.classList.add('active');
    title.innerText = `${semKey} Result Details (Demo)`;
    
    // Reset badge
    badge.style.display = 'block';
    
    if (data.status === 'pass') {
        badge.innerText = 'PUBLISHED';
        badge.style.backgroundColor = 'var(--pass-green-bg)';
        badge.style.color = 'var(--pass-green)';
        
        content.innerHTML = `
            <div style="font-size: 3rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 0.5rem;">${data.sgpa}</div>
            <p style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">SGPA</p>
            <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;">
                <button onclick="alert('Downloading Marklist... (Demo Feature)')" style="padding: 0.75rem 1.5rem; background: var(--primary-blue); color: white; border: none; border-radius: 4px; cursor: pointer;">Download Marklist</button>
            </div>
        `;
    } 
    else if (data.status === 'supply') {
        badge.innerText = 'SUPPLEMENTARY';
        badge.style.backgroundColor = 'var(--supply-red-bg)';
        badge.style.color = 'var(--supply-red)';
        
        content.innerHTML = `
            <div style="font-size: 3rem; font-weight: bold; color: var(--supply-red); margin-bottom: 0.5rem;">${data.supplyCount}</div>
            <p style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Supply Subjects</p>
            <p style="margin-top: 1rem; color: var(--text-main);">You have ${data.supplyCount} backlog subject(s) in this semester. Please check registration dates for supplementary exams.</p>
            <div style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;">
                <button onclick="window.location.href='examinations.html'" style="padding: 0.75rem 1.5rem; background: var(--supply-red); color: white; border: none; border-radius: 4px; cursor: pointer;">Register for Supply</button>
            </div>
        `;
    } 
    else {
        badge.innerText = 'PENDING';
        badge.style.backgroundColor = 'var(--pending-grey-bg)';
        badge.style.color = 'var(--text-muted)';
        
        content.innerHTML = `
            <div style="font-size: 2rem; color: var(--text-muted); margin-bottom: 1rem;">⏳</div>
            <h3 style="color: var(--dark-blue); margin-bottom: 0.5rem;">Results Not Yet Published</h3>
            <p>The results for ${semKey} are currently unavailable or under processing by the university.</p>
        `;
    }
}

function renderResultAnnouncements() {
    const list = document.getElementById('result-announcements-list');
    const resultNotices = APP_DATA.notifications.filter(n => n.type === 'result');

    if (resultNotices.length === 0) {
        list.innerHTML = '<li>No recent result announcements.</li>';
        return;
    }

    list.innerHTML = resultNotices.map(n => `
        <li style="padding: 1rem; border-bottom: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="display: flex; justify-content: space-between;">
                <strong style="color: var(--dark-blue);">${n.title}</strong>
                <span style="font-size: 0.8rem; color: var(--text-muted);">${n.date}</span>
            </div>
            <p style="color: var(--text-muted);">${n.desc}</p>
        </li>
    `).join('');
}