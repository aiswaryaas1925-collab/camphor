
document.addEventListener('DOMContentLoaded', () => {
    renderNotices();
    renderTimetable();
});

// Demo Data specific to exams
const EXAM_DEMO_DATA = {
    timetable: [
        { date: '12 Nov 2026', code: 'CST301', name: 'Formal Languages and Automata Theory', time: '09:30 AM - 12:30 PM' },
        { date: '15 Nov 2026', code: 'CST303', name: 'Computer Networks', time: '09:30 AM - 12:30 PM' },
        { date: '18 Nov 2026', code: 'CST305', name: 'System Software', time: '09:30 AM - 12:30 PM' },
        { date: '21 Nov 2026', code: 'CST307', name: 'Microprocessors and Microcontrollers', time: '09:30 AM - 12:30 PM' }
    ]
};

function renderNotices() {
    const container = document.getElementById('exam-notices-container');
    // Filter global notices for exam type
    const examNotices = APP_DATA.notifications.filter(n => n.type === 'exam');
    
    if (examNotices.length === 0) {
        container.innerHTML = '<p class="card-desc">No new examination notices.</p>';
        return;
    }

    container.innerHTML = examNotices.map(notice => `
        <div style="padding: 1rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 style="color: var(--dark-blue); display: flex; align-items: center; gap: 0.5rem;">
                    ${notice.title} 
                    ${notice.unread ? '<span style="background: var(--supply-red); color: white; font-size: 0.6rem; padding: 2px 6px; border-radius: 10px;">NEW</span>' : ''}
                </h4>
                <p class="card-desc" style="margin-top: 0.3rem;">${notice.desc}</p>
                <small style="color: var(--text-muted); font-size: 0.8rem;">Published: ${notice.date}</small>
            </div>
            <button onclick="alert('Viewing document for: ${notice.title} (Demo)')" style="padding: 0.5rem 1rem; background: var(--light-blue); color: var(--primary-blue); border: none; border-radius: 4px; cursor: pointer;">View</button>
        </div>
    `).join('');
}

function renderTimetable() {
    const tbody = document.getElementById('timetable-body');
    
    tbody.innerHTML = EXAM_DEMO_DATA.timetable.map(row => `
        <tr style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;">
            <td style="padding: 0.75rem;">${row.date}</td>
            <td style="padding: 0.75rem; font-weight: bold;">${row.code}</td>
            <td style="padding: 0.75rem;">${row.name}</td>
            <td style="padding: 0.75rem; color: var(--text-muted);">${row.time}</td>
        </tr>
    `).join('');
}

function downloadHallTicket() {
    alert("Downloading Hall Ticket (Demo). In a real environment, this would generate and download a PDF containing your exam schedule and center details.");
}

function filterExams() {
    const sem = document.getElementById('exam-sem-filter').value;
    alert(`Applying filter for ${sem} (Demo). Timetable and notices would update accordingly.`);
}