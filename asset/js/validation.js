function decodeJWT(token) {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isTokenExpired(token) {
    try {
        const decoded = decodeJWT(token);
        const expirationTime = decoded.exp; // Waktu kadaluarsa (timestamp)
        const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik

        // Cek apakah token sudah expired
        return expirationTime < currentTime;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return true; // Jika decoding gagal, anggap token sudah expired
    }
}

function checkTokenAndRedirect() {
    const token = sessionStorage.getItem("jwt_cookies"); // Token disimpan di sessionStorage

    if (token == null || isTokenExpired(token)) {
        // Token expired, redirect ke halaman login
        window.location.href = '/auth'; // Ganti dengan URL login kamu
    }
}

// Panggil fungsi untuk mengecek token dan redirect jika expired
checkTokenAndRedirect();
