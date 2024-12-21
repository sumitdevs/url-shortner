

function copyToClipboard() {
    const urlInput = document.getElementById('urlToCopy');
    urlInput.select();
    urlInput.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(urlInput.value)
        .then(() => alert('URL copied to clipboard!'))
        .catch(err => console.error('Failed to copy URL:', err));
}


function displayProfile() {
    const profile =  document.getElementById('profile');
    profile.classList.toggle('hidden');
}