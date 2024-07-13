// Translate-later goes here

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
});

// Highlight current page's nav item
function highlightCurrentPage() {
    const currentUrl = window.location.href;
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && currentUrl.includes(link.getAttribute('href'))) {
            item.classList.add('active');
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
const skills = ["HTML", "CSS", "JavaScript", "Python", "Django", "React", "Node.js", "Express"];

// Store the original list of projects
const allProjects = Array.from(document.getElementsByClassName('project'));

function showAutocomplete() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const autocompleteList = document.getElementById('autocompleteList');
    autocompleteList.innerHTML = '';

    const lastCommaIndex = input.lastIndexOf(',');
    const lastSpaceIndex = input.lastIndexOf(' ');
    const lastSeparatorIndex = Math.max(lastCommaIndex, lastSpaceIndex);

    const currentInput = input.substring(lastSeparatorIndex + 1).trim();

    if (currentInput === '') {
        return;
    }

    const filteredSkills = skills.filter(skill => skill.toLowerCase().startsWith(currentInput));
    filteredSkills.forEach(skill => {
        const item = document.createElement('div');
        item.classList.add('autocomplete-item');
        item.innerText = skill;
        item.onclick = () => {
            const searchInput = document.getElementById('searchInput');
            const currentInputValue = searchInput.value;
            const newInputValue = currentInputValue.substring(0, lastSeparatorIndex + 1) + ' ' + skill + ', ';
            searchInput.value = newInputValue.trim();
            autocompleteList.innerHTML = '';
            searchInput.focus();
        };
        autocompleteList.appendChild(item);
    });
    // Event listener to close the autocomplete list when clicking outside
    document.addEventListener('click', function(event) {
        if (!autocompleteList.contains(event.target) && event.target !== document.getElementById('searchInput')) {
            autocompleteList.innerHTML = '';
        }
    });
}

function searchProjects() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const errorMessage = document.getElementById('errorMessage');
    const projectsContainer = document.getElementById('projects');

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


document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the "Search" button, if exists
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', searchProjects);
    }
    // Contact page web app
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submitted");

        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        console.log("Form data:", data);

        fetch('https://script.google.com/macros/s/AKfycbyCcRR05IlqppcdaagcDsROd5xNfGqgPqPiPDnyjZ84vfV2GPFonmbs4HyN-lQR_TMEiw/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            console.log("Response data:", data);
            if (data.status === "success") {
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('thankYouMessage').style.display = 'block';
            } else {
                alert('Oops! Something went wrong. Please try again later.'); // Error pop up
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Oops! Something went wrong. Please try again later.'); // Error pop up
        });
    });

    // Toggle thank you message & reset form
    document.getElementById('resetButton').addEventListener('click', function() {
        console.log("Reset button clicked");
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('thankYouMessage').style.display = 'none';
        document.getElementById('contactForm').reset();
    });
});
