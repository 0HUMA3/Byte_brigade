function toggleMenu() {
    var accountInfo = document.getElementById('account-info');
    if (accountInfo.style.display === 'none' || accountInfo.style.display === '') {
        accountInfo.style.display = 'flex';
    } else {
        accountInfo.style.display = 'none';
    }
}
window.addEventListener('resize', function () {
    var accountInfo = document.getElementById('account-info');
    if (window.innerWidth > 600) {
        accountInfo.style.display = 'flex';
    } else {
        accountInfo.style.display = 'none';
    }
});

// Initial check on page load
window.addEventListener('load', function () {
    var accountInfo = document.getElementById('account-info');
    if (window.innerWidth > 600) {
        accountInfo.style.display = 'flex';
    } else {
        accountInfo.style.display = 'none';
    }
});