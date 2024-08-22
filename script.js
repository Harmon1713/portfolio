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
            if (el.tagName.toLowerCase() === 'input') {
                el.setAttribute('placeholder', translations[lang][translateKey]);
            } else {
                el.innerText = translations[lang][translateKey];
            }
        }
    });

    // Translate skills in the dropdown
    translateSkillsDropdown(lang);

    // Re-apply language changes to modals that are currently open
    const openModals = document.querySelectorAll('.modal');
    openModals.forEach(modal => {
        if (modal.style.display === 'block') {
            applyLanguageToModal(modal, lang);
        }
    });

    // Update the text for "Uses" and "Missing" in the current results
    const projectsContainer = document.getElementById('projects');
    if (projectsContainer) {
        const currentProjects = projectsContainer.querySelectorAll('.project');

        currentProjects.forEach(project => {
            const usesElement = project.querySelector('p.uses');
            if (usesElement && usesElement.getAttribute('data-matched')) {
                const matchedSkillsText = usesElement.getAttribute('data-matched');
                const missingSkillsText = usesElement.getAttribute('data-missing');
                usesElement.innerHTML = `${translations[lang].uses} ${matchedSkillsText}`;
                if (missingSkillsText) {
                    usesElement.innerHTML += ` <span style="color: red;">${translations[lang].missing} ${missingSkillsText}</span>`;
                }
            }
        });
    }

    // Apply language changes to modals
    applyLanguageToAllModals(lang);

    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = ''; // Clear the error message when changing languages
    }

    setActiveLanguageButton(lang); // Set the active button
    localStorage.setItem('preferredLanguage', lang); // Store the selected language in local storage

    // Hide the language dropdown after selecting a language
    const languageDropdown = document.querySelector('.language-dropdown');
    if (languageDropdown && languageDropdown.classList.contains('show')) {
        languageDropdown.classList.remove('show');
    }
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

// Function to apply language changes to all modals
function applyLanguageToAllModals(lang) {
    const modalProjects = document.querySelectorAll('.modal-project');
    modalProjects.forEach(project => {
        const translateKeys = project.querySelectorAll('[data-translate]');
        translateKeys.forEach(el => {
            const translateKey = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][translateKey]) {
                el.innerText = translations[lang][translateKey];
            }
        });
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
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");

    hamburger.addEventListener("click", function (event) {
        navUl.classList.toggle("show");
        event.stopPropagation(); // Prevent the click from propagating to the document
    });

    document.addEventListener("click", function (event) {
        if (!navUl.contains(event.target) && !hamburger.contains(event.target)) {
            navUl.classList.remove("show");
        }
    });
    
    // Language toggle hamburger button
    const languageHamburger = document.querySelector(".language-hamburger");
    const languageToggle = document.querySelector('#language-toggle');

    // Only create the dropdown if it doesn't exist
    if (!document.querySelector('.language-dropdown')) {
        console.log("Creating language dropdown...");

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
                    
                // Hide the dropdown after a selection
                languageDropdown.classList.remove('show');
            });
            languageDropdown.appendChild(button);
        });
        
        // Append the dropdown to the body to avoid duplicating it under the language toggle
        document.body.appendChild(languageDropdown);
    }

    const languageDropdown = document.querySelector('.language-dropdown');
    languageHamburger.addEventListener("click", function (event) {
        languageDropdown.classList.toggle("show");
        event.stopPropagation(); // Prevent the click from propagating to the document
    });

    document.addEventListener("click", function (event) {
        if (!languageDropdown.contains(event.target) && !languageHamburger.contains(event.target)) {
            languageDropdown.classList.remove('show');
        }
    });

    // Highlight current page's nav item
    highlightCurrentPage();
});

// Highlight current page's nav item
function highlightCurrentPage() {
    const currentUrl = window.location.pathname.split('/').pop(); // Get the current page name
    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentUrl) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage(); // Highlight current page's nav item
    const storedLanguage = localStorage.getItem('preferredLanguage') || 'en'; // Set the initial active language button and change to default language (English)
    changeLanguage(storedLanguage); // Set the language based on stored preference or default to English
    translateSkillsDropdown(storedLanguage); // Translate skills in the dropdown on page load
});

// When the search bar is clicked or input is focused
document.getElementById('searchInput').addEventListener('focus', () => {
    showFullAutocompleteList();
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    translateSkillsDropdown(currentLanguage);
});

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
// Function to handle the truncation logic
function handleTruncation(textContainer, fullText, numImages) {
    let baseTruncateLength;

    // Base truncation length depending on the number of images at 500px
    if (numImages === 1) {
        baseTruncateLength = 250;
    } else if (numImages === 2) {
        baseTruncateLength = 400;
    } else {
        baseTruncateLength = 300; // Default case if neither 1 nor 2 images
    }

    // Calculate additional characters allowed based on screen width
    const additionalChars = Math.floor((window.innerWidth - 500) / 200) * 200 + 50;

    // Final truncate length after considering screen width
    const truncateLength = baseTruncateLength + additionalChars;

    // Truncate the text if it exceeds the calculated truncate length
    const truncatedText = fullText.length > truncateLength ? fullText.substring(0, truncateLength) : fullText;

    // Set the truncated text to the container
    textContainer.innerHTML = truncatedText;

    // If the full text was truncated, add a "..." link for expanding
    if (fullText.length > truncateLength) {
        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = '#';
        seeMoreLink.style.color = 'blue';
        seeMoreLink.textContent = '...';

        // Add an event listener to expand the text when "..." is clicked
        seeMoreLink.addEventListener('click', function (event) {
            event.preventDefault();
            textContainer.innerText = fullText;
        });

        // Append the "..." link to the text container
        textContainer.appendChild(seeMoreLink);
    }
}

// Function to apply truncation to all text containers within a specific modal
function applyTruncation(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    const modalContent = modal.querySelector('.modal-content');
    const textContainers = modalContent.querySelectorAll('.half-column p');

    // Iterate over each text container and apply truncation logic
    textContainers.forEach((textContainer) => {
        const fullText = textContainer.getAttribute('data-fulltext'); // Retrieve the original full text from the attribute
        const images = textContainer.parentElement.nextElementSibling.querySelectorAll('img');
        const numImages = images.length;

        // Call the handleTruncation function with the appropriate parameters
        handleTruncation(textContainer, fullText, numImages);
    });
}

// Function to show the modal popup and lock the main screen scroll
function showPopup(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);

    // Save the full text in a data attribute if not already saved
    const textContainers = modal.querySelectorAll('.half-column p');
    textContainers.forEach((textContainer) => {
        if (!textContainer.getAttribute('data-fulltext')) {
            textContainer.setAttribute('data-fulltext', textContainer.innerText);
        }
    });

    applyTruncation(modalId); // Apply truncation when the modal is opened

    modal.style.display = 'block'; // Display the modal

    // Lock the main screen scroll by adding a class to the body
    document.body.classList.add('modal-open');

    // Add an event listener to close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            closePopup(modalId);
        }
    });
}

// Function to close the modal popup and unlock the main screen scroll
function closePopup(modalId) {
    const modal = document.getElementById(`${modalId}-modal`);
    if (modal) {
        modal.style.display = 'none'; // Hide the modal
    }

    // Unlock the main screen scroll by removing the class from the body
    document.body.classList.remove('modal-open');
}

// Event listener for window resize to dynamically adjust truncation
window.addEventListener('resize', function() {
    const modals = document.querySelectorAll('.modal');

    // Iterate over each modal and reapply truncation based on the new window size
    modals.forEach(modal => {
        if (modal.style.display === 'block') { // Only apply if the modal is currently open
            const modalId = modal.id.replace('-modal', '');
            applyTruncation(modalId);
        }
    });
});

// Search bar
const skills = ["HTML", "Bootstrap", "CSS", "JavaScript", "jQuery", "popper.js", "Python", "pygame", "datetime", "tkinter", "SQLite", "SQL", "matplotlib", "D3.js", "GeoJSON", "json", "SVG", "R", "dplyr", "ggplot2", "ggiraph", "patchwork", "htmlwidgets", "Markdown", "LaTex", "Pandoc", "Material Testing System", "MTS", "Inventor", "CAD", "Drafting", "MatScan", "Tekscan", "Research", "Technical Writing", "Data Visualization", "Application Development", "Front-End Development", "Tableau", "Data Wrangling", "Data Analysis", "Pandas", "NumPy", "SciPy", "Statsmodels", "dplyr", "tidyr", "readxl", "lubridate", "stringr", "data.table", "broom", "readr", "Statistical Modeling", "Ecdat", "RColorBrewer", "Linear Regression", "lm()", "gvlma", "predictmeans", "Seaborn", "pylab", "car", "caret", "magrittr", "lmtest", "popbio", "e1071", "API Integration", "plotly", "Retool", "Plotly JSON", "requests"];

// Store the original list of projects
const allProjects = Array.from(document.getElementsByClassName('project'));

// Helper function to normalize skill names by removing periods, dashes, spaces, and parentheses
function normalizeSkillName(skill) {
    return skill.replace(/[.\-\s()]/g, '');
}

// Function to show the full autocomplete list when the search bar is clicked or a skill is selected
function showFullAutocompleteList() {
    const input = document.getElementById('searchInput');
    const autocompleteList = document.getElementById('autocompleteList');
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Translate and sort the skills array alphabetically based on the translated names
    const translatedSkills = skills.map(skill => {
        const skillKey = `skill_${normalizeSkillName(skill.trim())}`;
        const translatedSkill = translations[currentLanguage] && translations[currentLanguage][skillKey]
            ? translations[currentLanguage][skillKey]
            : skill; // Fallback to original skill name if translation is not found
        return {
            original: skill,
            translated: translatedSkill
        };
    }).sort((a, b) => a.translated.localeCompare(b.translated));

    // Clear the current list
    autocompleteList.innerHTML = '';

    // Get the currently selected skills
    let selectedSkills = input.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');

    // Display the translated and sorted skills in the autocomplete list
    translatedSkills.forEach(skillObj => {
        const item = document.createElement('div');
        item.classList.add('autocomplete-item');
        item.innerText = skillObj.translated;

        // Highlight the selected skill with a green background
        if (selectedSkills.includes(skillObj.translated)) {
            item.style.backgroundColor = '#4CAF50';
            item.style.color = 'white';
        }

        item.onclick = (e) => {
            e.stopPropagation(); // Prevent the click event from closing the dropdown

            // Check if the skill is already selected
            if (selectedSkills.includes(skillObj.translated)) {
                // Unselect the skill
                selectedSkills = selectedSkills.filter(skill => skill !== skillObj.translated);
                input.value = selectedSkills.join(', ');
                item.style.backgroundColor = ''; // Remove the green background
                item.style.color = ''; // Reset text color
            } else {
                // Add the selected skill in the translated language
                input.value += (input.value.trim() ? ', ' : '') + skillObj.translated;
                selectedSkills.push(skillObj.translated);
            }

            // Rebuild the list to reflect the selected/unselected skills
            showFullAutocompleteList();

            input.focus(); // Keep the focus on the input field
        };

        autocompleteList.appendChild(item);
    });

    // Set the position and width of the autocomplete list
    const searchBarRect = document.querySelector('.search-bar').getBoundingClientRect();
    const searchInputRect = input.getBoundingClientRect();
    const leftPosition = searchInputRect.left - searchBarRect.left;

    autocompleteList.style.left = `${leftPosition}px`;
    autocompleteList.style.width = `${searchInputRect.width}px`;
    autocompleteList.style.display = 'block'; // Ensure the list is visible

    // Prevent the list from closing when clicking on it
    autocompleteList.addEventListener('mousedown', function(event) {
        event.preventDefault();
    });

    // Close the autocomplete list only when clicking outside the input and list
    document.addEventListener('click', function(event) {
        if (!autocompleteList.contains(event.target) && event.target !== input) {
            autocompleteList.innerHTML = '';
            autocompleteList.style.display = 'none';
        }
    });
}

// Function to filter and show the autocomplete list as the user types
function showAutocomplete() {
    const input = document.getElementById('searchInput');
    const autocompleteList = document.getElementById('autocompleteList');
    const inputValue = input.value.toLowerCase();
    const lastCommaIndex = inputValue.lastIndexOf(',');
    const lastSpaceIndex = inputValue.lastIndexOf(' ');
    const lastSeparatorIndex = Math.max(lastCommaIndex, lastSpaceIndex);
    const currentInput = inputValue.substring(lastSeparatorIndex + 1).trim();

    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // Filter the skills list based on the current input and translate them
    const filteredSkills = skills
        .filter(skill => skill.toLowerCase().startsWith(currentInput))
        .map(skill => {
            const skillKey = `skill_${normalizeSkillName(skill.trim())}`;
            const translatedSkill = translations[currentLanguage] && translations[currentLanguage][skillKey]
                ? translations[currentLanguage][skillKey]
                : skill; // Fallback to original skill name if translation is not found
            return {
                original: skill,
                translated: translatedSkill
            };
        })
        .sort((a, b) => a.translated.localeCompare(b.translated));

    // Clear the current list
    autocompleteList.innerHTML = '';

    // Get the currently selected skills
    let selectedSkills = input.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');

    // Display the filtered and translated skills in the autocomplete list
    filteredSkills.forEach(skillObj => {
        const item = document.createElement('div');
        item.classList.add('autocomplete-item');
        item.innerText = skillObj.translated;

        // Highlight the selected skill with a green background
        if (selectedSkills.includes(skillObj.translated)) {
            item.style.backgroundColor = '#4CAF50';
            item.style.color = 'white';
        }

        item.onclick = (e) => {
            e.stopPropagation(); // Prevent the click event from closing the dropdown

            // Check if the skill is already selected
            if (selectedSkills.includes(skillObj.translated)) {
                // Unselect the skill
                selectedSkills = selectedSkills.filter(skill => skill !== skillObj.translated);
                input.value = selectedSkills.join(', ');
                item.style.backgroundColor = ''; // Remove the green background
                item.style.color = ''; // Reset text color
            } else {
                // Add the selected skill in the translated language
                input.value += (input.value.trim() ? ', ' : '') + skillObj.translated;
                selectedSkills.push(skillObj.translated);
            }

            // Rebuild the list to reflect the selected/unselected skills
            showFullAutocompleteList();

            input.focus(); // Keep the focus on the input field
        };

        autocompleteList.appendChild(item);
    });

    // Ensure the dropdown stays visible while filtering
    if (filteredSkills.length > 0) {
        autocompleteList.style.display = 'block';
    } else {
        autocompleteList.style.display = 'none';
    }
}

// Attach the function to show the full autocomplete list when the search bar is clicked
document.getElementById('searchInput').addEventListener('focus', showFullAutocompleteList);

// Attach the function to filter the list as the user types
document.getElementById('searchInput').addEventListener('input', showAutocomplete);

// Function to translate the skills in the dropdown list
function translateSkillsDropdown(lang) {
    const autocompleteItems = document.querySelectorAll('.autocomplete-item');
    const translatedItems = [];

    autocompleteItems.forEach(item => {
        const skillKey = `skill_${normalizeSkillName(item.innerText.trim())}`;
        console.log(`Translating ${item.innerText.trim()} with key ${skillKey}`);
        const translatedSkill = translations[lang] && translations[lang][skillKey]
            ? translations[lang][skillKey]
            : item.innerText; // Fallback to original text if translation is not found
        translatedItems.push({
            element: item,
            translatedText: translatedSkill
        });
        console.log(`Translated to ${translatedSkill}`);
    });

    // Sort the items based on the translated text
    translatedItems.sort((a, b) => a.translatedText.localeCompare(b.translatedText));

    // Apply the sorted and translated text back to the autocomplete list
    translatedItems.forEach(({ element, translatedText }) => {
        element.innerText = translatedText;

        // Force re-render to ensure sorting is applied
        const parent = element.parentNode;
        const nextSibling = element.nextSibling;
        parent.removeChild(element);
        parent.insertBefore(element, nextSibling);
    });
}

// Function to dynamically calculate the truncation length based on window size and number of images for search results
function calculateTruncateLengthForSearch(numImages) {
    let baseTruncateLength;

    // Base truncation length depending on the number of images at 500px
    if (numImages === 1) {
        baseTruncateLength = 250; // Adjusted to match the modal truncation logic
    } else if (numImages === 2) {
        baseTruncateLength = 400; // Adjusted to match the modal truncation logic
    } else {
        baseTruncateLength = 300; // Default case if neither 1 nor 2 images
    }

    // Calculate additional characters allowed based on screen width
    const additionalChars = Math.floor((window.innerWidth - 500) / 100) * 100 + 50;

    // Final truncate length after considering screen width
    return baseTruncateLength + additionalChars;
}

// Function to handle truncation based on the calculated length for search results
function handleTruncationForSearch(textContainer, fullText, numImages) {
    const truncateLength = calculateTruncateLengthForSearch(numImages);

    // Truncate the text if it exceeds the calculated truncate length
    const truncatedText = fullText.length > truncateLength ? fullText.substring(0, truncateLength) : fullText;

    // Set the truncated text to the container
    textContainer.innerHTML = truncatedText;

    // If the full text was truncated, add a "..." link for expanding
    if (fullText.length > truncateLength) {
        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = '#';
        seeMoreLink.style.color = 'blue';
        seeMoreLink.textContent = '...';

        // Append the "..." link directly after the truncated text
        textContainer.appendChild(seeMoreLink);

        // Add an event listener to expand the text when "..." is clicked
        seeMoreLink.addEventListener('click', function (event) {
            event.preventDefault();
            textContainer.innerHTML = fullText;
        });
    } else {
        textContainer.innerText = fullText; // Show full text if it fits within the limit
    }
}

// Function to apply truncation to all search results
function applyTruncationToSearchResults() {
    const projectContainers = document.querySelectorAll('#projects .project');

    // Iterate over each project container and apply truncation logic
    projectContainers.forEach((projectContainer) => {
        const textContainer = projectContainer.querySelector('.half-column p');
        if (textContainer) {
            const fullText = textContainer.getAttribute('data-fulltext') || textContainer.innerText;
            textContainer.setAttribute('data-fulltext', fullText); // Save full text if not already saved
            const images = projectContainer.querySelectorAll('.half-column img');
            const numImages = images.length;

            // Call the handleTruncation function with the appropriate parameters
            handleTruncationForSearch(textContainer, fullText, numImages);
        }
    });
}

// Modify this function to apply truncation after displaying search results
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

        // Apply truncation to all search results
        applyTruncationToSearchResults();

        // Clear any error message
        errorMessage.textContent = '';
        return;
    }

    if (input === '') {
        errorMessage.textContent = translations[currentLanguage].searchErrorMessage;
        projectsContainer.innerHTML = ''; // Clear previously shown projects
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
        const usesElement = project.querySelector('p.uses');

        if (result.missingSkills.length > 0) {
            const missingSkillsText = result.missingSkills.join(', ');
            usesElement.innerHTML = `${translations[currentLanguage].uses} ${matchedSkillsText}. <span style="color: red;">${translations[currentLanguage].missing} ${missingSkillsText}</span>`;
            usesElement.setAttribute('data-matched', matchedSkillsText);
            usesElement.setAttribute('data-missing', missingSkillsText);
        } else {
            usesElement.innerHTML = `${translations[currentLanguage].uses} ${matchedSkillsText}`;
            usesElement.setAttribute('data-matched', matchedSkillsText);
            usesElement.removeAttribute('data-missing');
        }
        projectsContainer.appendChild(project); // Append project in sorted order
    });

    // Apply truncation to search results after sorting and appending them
    applyTruncationToSearchResults();

    if (results.length === 0) {
        errorMessage.textContent = translations[currentLanguage].noProjectsFoundMessage;
    } else {
        errorMessage.textContent = '';
    }    
}

// Event listener to handle truncation on window resize
window.addEventListener('resize', applyTruncationToSearchResults);

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const autocompleteList = document.getElementById('autocompleteList');
        autocompleteList.innerHTML = '';
        searchProjects();
    }
}

// Attach the keypress handler to the search input
document.getElementById('searchInput').addEventListener('keypress', handleKeyPress);
