// THEME TOGGLE
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeToggle = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
});

// CUSTOM CLICK RIPPLE ANIMATION
document.addEventListener('click', (e) => {
    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    
    // Set position to click location
    ripple.style.left = (e.clientX - 10) + 'px';
    ripple.style.top = (e.clientY - 10) + 'px';
    
    // Add to body
    document.body.appendChild(ripple);
    
    // Remove after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// HAMBURGER MENU
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// GLOBAL SEARCH
function globalSearch() {
    const searchTerm = document.getElementById('globalSearch').value.toLowerCase();
    if (searchTerm.length > 2) {
        alert(`Searching for: "${searchTerm}"\n\nSearching in:\n- Study Notes\n- Formulas\n- Definitions\n- Examples`);
    }
}

// MULTIPLICATION TABLES - Generate 1-100
function generateMultiplicationTables(start = 1, end = 100) {
    const tableGrid = document.getElementById('tableGrid');
    if (!tableGrid) return;
    
    tableGrid.innerHTML = '';
    
    for (let i = start; i <= end; i++) {
        const tableCard = document.createElement('div');
        tableCard.className = 'table-card';
        let tableContent = '';
        
        for (let j = 1; j <= 10; j++) {
            tableContent += `<div>${i} × ${j} = ${i * j}</div>`;
        }
        
        tableCard.innerHTML = `
            <div class="table-number">${i}</div>
            <div class="table-content">${tableContent}</div>
        `;
        tableGrid.appendChild(tableCard);
    }
}

// Show specific table
function showTable() {
    const tableNum = parseInt(document.getElementById('tableSearch').value);
    if (tableNum < 1 || tableNum > 1000) {
        alert('Please enter a number between 1 and 1000');
        return;
    }

    const tableGrid = document.getElementById('tableGrid');
    if (!tableGrid) return;
    
    tableGrid.innerHTML = '';
    
    let tableContent = '';
    for (let j = 1; j <= 10; j++) {
        tableContent += `<div>${tableNum} × ${j} = ${tableNum * j}</div>`;
    }
    
    tableGrid.innerHTML = `
        <div class="table-card" style="grid-column: 1 / -1; max-width: 400px; margin: 0 auto;">
            <div class="table-number">${tableNum}</div>
            <div class="table-content">${tableContent}</div>
        </div>
    `;
}

// CALCULATORS
function switchCalculator(type) {
    document.querySelectorAll('[id$="-calc"]').forEach(calc => {
        calc.style.display = 'none';
    });
    const calcElement = document.getElementById(type + '-calc');
    if (calcElement) {
        calcElement.style.display = 'block';
        setTimeout(() => {
            calcElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
}

function calculatePercentage() {
    const part = parseFloat(document.getElementById('percent-part').value) || 0;
    const whole = parseFloat(document.getElementById('percent-whole').value) || 1;
    const result = (part / whole) * 100;
    document.getElementById('percent-result').textContent = `Result: ${result.toFixed(2)}%`;
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birth-date').value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    document.getElementById('age-result').textContent = `Result: ${age} years old`;
}

function simplifyFraction() {
    const num = parseInt(document.getElementById('numerator').value) || 0;
    const denom = parseInt(document.getElementById('denominator').value) || 1;
    
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    const divisor = gcd(Math.abs(num), Math.abs(denom));
    const simplifiedNum = num / divisor;
    const simplifiedDenom = denom / divisor;
    
    document.getElementById('fraction-result').textContent = `Result: ${simplifiedNum}/${simplifiedDenom}`;
}

function convertUnits() {
    const meters = parseFloat(document.getElementById('meter-input').value) || 0;
    const feet = (meters * 3.28084).toFixed(2);
    const km = (meters / 1000).toFixed(3);
    const cm = (meters * 100).toFixed(0);
    
    document.getElementById('unit-result').innerHTML = `Result: ${meters}m = ${cm}cm = ${feet}ft = ${km}km`;
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 1;
    
    const heightInM = height / 100;
    const bmi = (weight / (heightInM * heightInM)).toFixed(1);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal Weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    document.getElementById('bmi-result').textContent = `Result: ${bmi} (${category})`;
}

function calculateCompound() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;
    
    const amount = principal * Math.pow(1 + rate / 100, time);
    const ci = (amount - principal).toFixed(2);
    
    document.getElementById('compound-result').textContent = `Result: ₹${ci}`;
}

function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('si-principal').value) || 0;
    const rate = parseFloat(document.getElementById('si-rate').value) || 0;
    const time = parseFloat(document.getElementById('si-time').value) || 0;
    
    const si = (principal * rate * time) / 100;
    
    document.getElementById('si-result').textContent = `Result: ₹${si.toFixed(2)}`;
}

function calculateDiscount() {
    const original = parseFloat(document.getElementById('original-price').value) || 0;
    const discount = parseFloat(document.getElementById('discount-percent').value) || 0;
    
    const discountAmount = (original * discount) / 100;
    const finalPrice = original - discountAmount;
    
    document.getElementById('discount-result').textContent = `Discount: ₹${discountAmount.toFixed(2)} | Final Price: ₹${finalPrice.toFixed(2)}`;
}

// Dictionary Search
function searchDictionary() {
    const term = document.getElementById('dict-search').value.toLowerCase();
    const results = document.getElementById('dict-results');
    
    if (term.length < 2) {
        results.innerHTML = '<p>Type at least 2 characters to search</p>';
        return;
    }

    const dictionary = getDictionary();
    const filtered = dictionary.filter(item => 
        item.word.toLowerCase().includes(term) || 
        item.meaning.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
        results.innerHTML = '<p>No results found</p>';
        return;
    }

    results.innerHTML = filtered.map(item => `
        <div class="card">
            <h4>${item.word}</h4>
            <p><strong>Meaning:</strong> ${item.meaning}</p>
            <p><strong>Example:</strong> ${item.example}</p>
        </div>
    `).join('');
}

function getDictionary() {
    return [
        {
            word: 'Serendipity',
            meaning: 'The occurrence of events by chance in a happy or beneficial way',
            example: 'Finding that old photograph was pure serendipity.'
        },
        {
            word: 'Eloquent',
            meaning: 'Fluent or persuasive in speaking or writing',
            example: 'The speaker gave an eloquent speech.'
        },
        {
            word: 'Ephemeral',
            meaning: 'Lasting for a very short time',
            example: 'The beauty of cherry blossoms is ephemeral.'
        },
        {
            word: 'Ambiguous',
            meaning: 'Open to more than one interpretation; unclear',
            example: 'The instructions were ambiguous.'
        },
        {
            word: 'Benevolent',
            meaning: 'Kind and generous',
            example: 'She is a benevolent person who helps the poor.'
        },
        {
            word: 'Ubiquitous',
            meaning: 'Present, appearing, or found everywhere',
            example: 'Mobile phones are ubiquitous in modern society.'
        },
        {
            word: 'Meticulous',
            meaning: 'Showing great attention to detail; very careful and precise',
            example: 'She is meticulous about her work.'
        },
        {
            word: 'Pragmatic',
            meaning: 'Dealing with things in a realistic and practical way',
            example: 'We need a pragmatic approach to this problem.'
        }
    ];
}
