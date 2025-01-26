// Get the body and dark mode toggle elements
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");
const body = document.body;

// Check the theme on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        darkModeIcon.src = "/images/sun.png"; // Dark mode icon
        darkModeIcon.alt = "Dark Mode";
    } else {
        body.classList.add("light-mode");
        darkModeIcon.src = "/images/moon.png"; // Light mode icon
        darkModeIcon.alt = "Light Mode";
    }
});

// Toggle between dark and light modes
darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.replace("dark-mode", "light-mode");
        darkModeIcon.src = "/images/moon.png"; // Light mode icon
        darkModeIcon.alt = "Light Mode";

        // Save preference in localStorage
        localStorage.setItem("theme", "light");
    } else {
        body.classList.replace("light-mode", "dark-mode");
        darkModeIcon.src = "/images/sun.png"; // Dark mode icon
        darkModeIcon.alt = "Dark Mode";

        // Save preference in localStorage
        localStorage.setItem("theme", "dark");
    }
});