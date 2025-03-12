document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle theme
    themeSwitcher.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}); 

