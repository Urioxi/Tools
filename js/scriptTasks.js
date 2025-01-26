// Handle link clicks and load content dynamically
document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent the default behavior

    const targetURL = this.getAttribute('href');

    // Add fade-out effect to the current content
    document.getElementById('content').classList.add('fade-out');

    // Wait for the fade-out to complete before loading new content
    setTimeout(function() {
        // Fetch the new content
        fetch(targetURL)
            .then(response => response.text())
            .then(data => {
                // Replace content with the new page's content
                document.getElementById('content').innerHTML = data;
                document.getElementById('content').classList.remove('fade-out');
                document.getElementById('content').classList.add('fade-in');
            });
    }, 500);  // Match the duration of the fade-out transition
});