// What I would use with Google Cloud API, but I do not want to get charged
/*const apiKey = 'KSjkCiNRa8u0ZWIlT47XnTQUeOwSTQErO-jTp-4'; // Left personalized

async function translateText(text, targetLanguage) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: 'html', // Specify that the text is HTML
        }),
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

async function translatePage(targetLanguage) {
    const bodyContent = document.body.innerHTML; // Get the entire body content
    const translatedContent = await translateText(bodyContent, targetLanguage);
    document.body.innerHTML = translatedContent; // Replace the body content with the translated content
}

document.getElementById('english-btnx').addEventListener('click', () => translatePage('en'));
document.getElementById('spanish-btnx').addEventListener('click', () => translatePage('es'));
document.getElementById('portuguese-btnx').addEventListener('click', () => translatePage('pt')); */

// Function to change the language
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const translateKey = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][translateKey]) {
            el.innerText = translations[lang][translateKey];
        }
    });
    setActiveLanguageButton(lang); // Set the active button
    localStorage.setItem('preferredLanguage', lang); // Store the selected language in local storage
}

// Function to set the active language button
function setActiveLanguageButton(lang) {
    const buttons = document.querySelectorAll('#language-toggle button, .language-dropdown button');
    buttons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Scrolling
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll-top-btn").style.display = "block";
        document.getElementById("language-toggle").classList.add("horizontal");
    } else {
        document.getElementById("scroll-top-btn").style.display = "none";
        document.getElementById("language-toggle").classList.remove("horizontal");
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Nav bar hamburger button
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");

    hamburger.addEventListener("click", function(event) {
        navUl.classList.toggle("show");
        event.stopPropagation(); // Prevent the click from propagating to the document
    });

    document.addEventListener("click", function(event) {
        if (!navUl.contains(event.target) && !hamburger.contains(event.target)) {
            navUl.classList.remove("show");
        }
    });

    // Language toggle hamburger button
    const languageHamburger = document.querySelector(".language-hamburger");
    const languageDropdown = document.createElement('div');
    languageDropdown.classList.add('language-dropdown');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'pt', name: 'Portuguese' }
    ];

    languages.forEach(language => {
        const button = document.createElement('button');
        button.textContent = language.name;
        button.setAttribute('data-lang', language.code);
        button.addEventListener('click', () => {
            changeLanguage(language.code);
            setActiveLanguageButton(language.code);
        });
        languageDropdown.appendChild(button);
    });

    document.body.appendChild(languageDropdown);

    languageHamburger.addEventListener("click", function(event) {
        languageDropdown.classList.toggle("show");
        event.stopPropagation(); // Prevent the click from propagating to the document
    });

    document.addEventListener("click", function(event) {
        if (!languageDropdown.contains(event.target) && !languageHamburger.contains(event.target)) {
            languageDropdown.classList.remove("show");
        }
    });

    // Highlight current page's nav item
    highlightCurrentPage();
    // Set the initial active language button and change to default language (English)
    // Check for stored language in local storage
    const storedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(storedLanguage); // Set the language based on stored preference or default to English
});

// Highlight current page's nav item
function highlightCurrentPage() {
    const currentUrl = window.location.href;
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && currentUrl.includes(link.getAttribute('href'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', highlightCurrentPage);

// Travel map - make draggable inside the iframe
document.addEventListener('DOMContentLoaded', function() {
    const map = document.querySelector('img'); // Replace with your specific selector for the map content
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    map.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - map.offsetLeft;
        startY = e.pageY - map.offsetTop;
        scrollLeft = map.scrollLeft;
        scrollTop = map.scrollTop;
        map.style.cursor = 'grabbing';
    });

    map.addEventListener('mouseleave', () => {
        isDragging = false;
        map.style.cursor = 'grab';
    });

    map.addEventListener('mouseup', () => {
        isDragging = false;
        map.style.cursor = 'grab';
    });

    map.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - map.offsetLeft;
        const y = e.pageY - map.offsetTop;
        const walkX = (x - startX) * 3; // Adjust the multiplier to change the scroll speed
        const walkY = (y - startY) * 3; // Adjust the multiplier to change the scroll speed
        map.scrollLeft = scrollLeft - walkX;
        map.scrollTop = scrollTop - walkY;
    });

    map.style.cursor = 'grab';
});

// Modal
function showPopup(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    modal.style.display = 'block';
    // Add event listener to close the modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closePopup(modalId);
        }
    });
}

function closePopup(modalId) {
    document.getElementById(`${modalId}-modal`).style.display = 'none';
}

// Search bar
const skills = ["HTML", "Boostrap", "CSS", "JavaScript", "jQuery", "popper", "Python", "pygame", "datetime", "tkinter", "SQLite", "SQL", "matplotlib", "D3.js", "GeoJSON", "json", "SVG", "R", "dplyr", "ggplot2", "ggiraph", "patchwork", "htmlwidgets", "Markdown", "LaTex", "Pandoc", "Material Testing System", "MTS", "Inventor", "CAD", "Drafting", "MatScan", "Tekscan", "Research", "Technical Writing", "Data Visualization", "Application Development", "Front-End Development"];

// Store the original list of projects
const allProjects = Array.from(document.getElementsByClassName('project'));

function showAutocomplete() {
    const input = document.getElementById('searchInput');
    const autocompleteList = document.getElementById('autocompleteList');
    autocompleteList.innerHTML = '';

    const inputValue = input.value.toLowerCase();
    const lastCommaIndex = inputValue.lastIndexOf(',');
    const lastSpaceIndex = inputValue.lastIndexOf(' ');
    const lastSeparatorIndex = Math.max(lastCommaIndex, lastSpaceIndex);
    const currentInput = inputValue.substring(lastSeparatorIndex + 1).trim();

    if (currentInput === '') {
        return;
    }

    const filteredSkills = skills.filter(skill => skill.toLowerCase().startsWith(currentInput));
    filteredSkills.forEach(skill => {
        const item = document.createElement('div');
        item.classList.add('autocomplete-item');
        item.innerText = skill;
        item.onclick = () => {
            const currentInputValue = input.value;
            const newInputValue = currentInputValue.substring(0, lastSeparatorIndex + 1) + ' ' + skill + ', ';
            input.value = newInputValue.trim();
            autocompleteList.innerHTML = '';
            input.focus();
        };
        autocompleteList.appendChild(item);
    });

    // Set the position and width of the autocomplete list
    const searchBarRect = document.querySelector('.search-bar').getBoundingClientRect();
    const searchInputRect = input.getBoundingClientRect();
    
    // Calculate the left position based on the search bar's left offset and the input's left offset
    const leftPosition = searchInputRect.left - searchBarRect.left;

    autocompleteList.style.left = `${leftPosition}px`;
    autocompleteList.style.width = `${searchInputRect.width}px`;

    // Event listener to close the autocomplete list when clicking outside
    document.addEventListener('click', function(event) {
        if (!autocompleteList.contains(event.target) && event.target !== input) {
            autocompleteList.innerHTML = '';
        }
    });
}

function searchProjects() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const errorMessage = document.getElementById('errorMessage');
    const projectsContainer = document.getElementById('projects');

    // Determine the current language
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Define keywords for showing all projects
    const allKeywords = {
        en: 'all',
        es: 'todo',
        pt: 'todos'
    };

    // Check if the input matches the keyword "all" for the current language
    if (input === allKeywords[currentLanguage]) {
        // Clear current projects
        projectsContainer.innerHTML = '';

        // Show all projects without the "Uses" text
        allProjects.forEach(project => {
            project.style.display = 'block';
            const usesElement = project.querySelector('p.uses');
            if (usesElement) {
                usesElement.style.display = 'none'; // Hide the "Uses" element
            }
            projectsContainer.appendChild(project);
        });

        // Clear any error message
        errorMessage.textContent = '';
        return;
    }

    if (input === '') {
        errorMessage.textContent = 'Please enter a skill, then search :)';
        return;
    }

    const searchSkills = input.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    const results = [];

    // Clear current projects
    projectsContainer.innerHTML = ''; 

    allProjects.forEach(project => {
        const projectSkills = project.getAttribute('data-skills').toLowerCase().split(', ');
        const matchedSkills = searchSkills.filter(skill => projectSkills.includes(skill));
        const missingSkills = searchSkills.filter(skill => !projectSkills.includes(skill));
        if (matchedSkills.length > 0) {
            results.push({ element: project, matchedSkills, missingSkills });
        }
    });

    // Sort results by number of matched skills (descending)
    results.sort((a, b) => b.matchedSkills.length - a.matchedSkills.length);

    // Debugging: log sorted results
    console.log('Sorted Results:', results.map(r => ({
        project: r.element.querySelector('h2').innerText,
        matchedSkills: r.matchedSkills,
        missingSkills: r.missingSkills
    })));

    results.forEach(result => {
        const project = result.element;
        project.style.display = 'block';
        const matchedSkillsText = result.matchedSkills.join(', ');
        if (result.missingSkills.length > 0) {
            const missingSkillsText = result.missingSkills.join(', ');
            project.querySelector('p').innerHTML = `Uses ${matchedSkillsText}. <span style="color: red;">Missing ${missingSkillsText}</span>`;
        } else {
            project.querySelector('p').innerHTML = `Uses ${matchedSkillsText}`;
        }
        projectsContainer.appendChild(project); // Append project in sorted order
    });

    if (results.length === 0) {
        errorMessage.textContent = 'No projects found with the specified skills.';
    } else {
        errorMessage.textContent = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const autocompleteList = document.getElementById('autocompleteList');
        autocompleteList.innerHTML = '';
        searchProjects();
    }
}
