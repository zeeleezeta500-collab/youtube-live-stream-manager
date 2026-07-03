// Comprehensive list of major timezones
const TIMEZONES = [
    { zone: 'America/New_York', name: 'New York', country: '🇺🇸 USA (EST)', offset: -5 },
    { zone: 'America/Los_Angeles', name: 'Los Angeles', country: '🇺🇸 USA (PST)', offset: -8 },
    { zone: 'America/Chicago', name: 'Chicago', country: '🇺🇸 USA (CST)', offset: -6 },
    { zone: 'America/Denver', name: 'Denver', country: '🇺🇸 USA (MST)', offset: -7 },
    { zone: 'America/Anchorage', name: 'Anchorage', country: '🇺🇸 USA (AKST)', offset: -9 },
    { zone: 'Pacific/Honolulu', name: 'Honolulu', country: '🇺🇸 USA (HST)', offset: -10 },
    
    { zone: 'America/Toronto', name: 'Toronto', country: '🇨🇦 Canada (EST)', offset: -5 },
    { zone: 'America/Vancouver', name: 'Vancouver', country: '🇨🇦 Canada (PST)', offset: -8 },
    
    { zone: 'America/Mexico_City', name: 'Mexico City', country: '🇲🇽 Mexico', offset: -6 },
    { zone: 'America/Sao_Paulo', name: 'São Paulo', country: '🇧🇷 Brazil', offset: -3 },
    { zone: 'America/Buenos_Aires', name: 'Buenos Aires', country: '🇦🇷 Argentina', offset: -3 },
    
    { zone: 'Europe/London', name: 'London', country: '🇬🇧 UK', offset: 0 },
    { zone: 'Europe/Paris', name: 'Paris', country: '🇫🇷 France', offset: 1 },
    { zone: 'Europe/Berlin', name: 'Berlin', country: '🇩🇪 Germany', offset: 1 },
    { zone: 'Europe/Madrid', name: 'Madrid', country: '🇪🇸 Spain', offset: 1 },
    { zone: 'Europe/Rome', name: 'Rome', country: '🇮🇹 Italy', offset: 1 },
    { zone: 'Europe/Amsterdam', name: 'Amsterdam', country: '🇳🇱 Netherlands', offset: 1 },
    { zone: 'Europe/Stockholm', name: 'Stockholm', country: '🇸🇪 Sweden', offset: 1 },
    { zone: 'Europe/Zurich', name: 'Zurich', country: '🇨🇭 Switzerland', offset: 1 },
    { zone: 'Europe/Vienna', name: 'Vienna', country: '🇦🇹 Austria', offset: 1 },
    { zone: 'Europe/Prague', name: 'Prague', country: '🇨🇿 Czech Republic', offset: 1 },
    { zone: 'Europe/Warsaw', name: 'Warsaw', country: '🇵🇱 Poland', offset: 1 },
    { zone: 'Europe/Athens', name: 'Athens', country: '🇬🇷 Greece', offset: 2 },
    { zone: 'Europe/Istanbul', name: 'Istanbul', country: '🇹🇷 Turkey', offset: 3 },
    { zone: 'Europe/Moscow', name: 'Moscow', country: '🇷🇺 Russia', offset: 3 },
    
    { zone: 'Asia/Dubai', name: 'Dubai', country: '🇦🇪 UAE', offset: 4 },
    { zone: 'Asia/Karachi', name: 'Karachi', country: '🇵🇰 Pakistan', offset: 5 },
    { zone: 'Asia/Kolkata', name: 'India', country: '🇮🇳 India (IST)', offset: 5.5 },
    { zone: 'Asia/Bangkok', name: 'Bangkok', country: '🇹🇭 Thailand', offset: 7 },
    { zone: 'Asia/Singapore', name: 'Singapore', country: '🇸🇬 Singapore', offset: 8 },
    { zone: 'Asia/Hong_Kong', name: 'Hong Kong', country: '🇭🇰 Hong Kong', offset: 8 },
    { zone: 'Asia/Shanghai', name: 'Shanghai', country: '🇨🇳 China', offset: 8 },
    { zone: 'Asia/Tokyo', name: 'Tokyo', country: '🇯🇵 Japan', offset: 9 },
    { zone: 'Asia/Seoul', name: 'Seoul', country: '🇰🇷 South Korea', offset: 9 },
    { zone: 'Australia/Sydney', name: 'Sydney', country: '🇦🇺 Australia (AEDT)', offset: 11 },
    { zone: 'Australia/Melbourne', name: 'Melbourne', country: '🇦🇺 Australia (AEDT)', offset: 11 },
    { zone: 'Australia/Brisbane', name: 'Brisbane', country: '🇦🇺 Australia (AEST)', offset: 10 },
    { zone: 'Pacific/Auckland', name: 'Auckland', country: '🇳🇿 New Zealand', offset: 13 },
    { zone: 'Pacific/Fiji', name: 'Fiji', country: '🇫🇯 Fiji', offset: 12 },
];

// DOM Elements
const clockGrid = document.getElementById('clockGrid');
const searchInput = document.getElementById('searchInput');
const themeSelect = document.getElementById('themeSelect');

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Create initial clocks
createClocks();

// Update clocks every second
setInterval(updateClocks, 1000);

// Event listeners
searchInput.addEventListener('input', filterClocks);
themeSelect.addEventListener('change', (e) => {
    setTheme(e.target.value);
    localStorage.setItem('theme', e.target.value);
});

function createClocks() {
    clockGrid.innerHTML = '';
    TIMEZONES.forEach((tz, index) => {
        const card = createClockCard(tz);
        card.style.animationDelay = `${index * 0.05}s`;
        clockGrid.appendChild(card);
    });
}

function createClockCard(timezone) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.dataset.timezone = timezone.zone.toLowerCase();
    card.dataset.name = timezone.name.toLowerCase();
    
    const time = new Date().toLocaleString('en-US', { 
        timeZone: timezone.zone,
        hour12: false 
    });
    
    const [date, timeStr] = time.split(', ');
    const [hours, minutes, seconds] = timeStr.split(':');
    
    const now = new Date();
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: timezone.zone }));
    const offset = (tzTime - utcTime) / (1000 * 60 * 60);
    
    const dayOfWeek = new Date(time).toLocaleString('en-US', { weekday: 'short' });
    const isNight = hours >= 22 || hours < 6;
    
    card.innerHTML = `
        <div class="timezone-name">🕐 ${timezone.name}</div>
        <div class="country-name">${timezone.country}</div>
        <div class="digital-time">
            <span>${hours}</span><span class="colon">:</span><span>${minutes}</span><span class="colon">:</span><span>${seconds}</span>
        </div>
        <div class="date-display">${dayOfWeek}, ${date}</div>
        <div class="time-info">
            <div class="info-item">
                <span class="info-label">UTC Offset</span>
                <span class="info-value">${formatOffset(offset)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value">${isNight ? '🌙 Night' : '☀️ Day'}</span>
            </div>
        </div>
    `;
    
    return card;
}

function updateClocks() {
    document.querySelectorAll('.clock-card').forEach(card => {
        const timezone = TIMEZONES.find(tz => tz.zone.toLowerCase() === card.dataset.timezone);
        if (!timezone) return;
        
        const time = new Date().toLocaleString('en-US', { 
            timeZone: timezone.zone,
            hour12: false 
        });
        
        const [date, timeStr] = time.split(', ');
        const [hours, minutes, seconds] = timeStr.split(':');
        
        const dayOfWeek = new Date(time).toLocaleString('en-US', { weekday: 'short' });
        const isNight = hours >= 22 || hours < 6;
        
        // Update only if not hidden
        if (!card.classList.contains('hidden')) {
            card.querySelector('.digital-time').innerHTML = `
                <span>${hours}</span><span class="colon">:</span><span>${minutes}</span><span class="colon">:</span><span>${seconds}</span>
            `;
            card.querySelector('.date-display').textContent = `${dayOfWeek}, ${date}`;
            card.querySelector('.info-item:nth-child(2) .info-value').textContent = isNight ? '🌙 Night' : '☀️ Day';
        }
    });
}

function filterClocks() {
    const searchTerm = searchInput.value.toLowerCase();
    
    document.querySelectorAll('.clock-card').forEach(card => {
        const timezone = card.dataset.timezone;
        const name = card.dataset.name;
        
        if (timezone.includes(searchTerm) || name.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function setTheme(theme) {
    document.body.classList.remove('dark-mode', 'light-mode', 'neon-mode');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else if (theme === 'neon') {
        document.body.classList.add('neon-mode');
    }
    
    themeSelect.value = theme;
}

function formatOffset(offset) {
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset);
    const minutes = Math.round((absOffset - hours) * 60);
    
    return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
