
/**
 * base function kirim http ke api
 * @param {*} url endpoint
 * @param {*} method method http. ex : get, post, put, delete
 * @param {*} body permintaan yang dikirim di body
 * @param {*} headers permintaan yang dikirim di header
 * @returns 
 */
function httpRequest(url, method, body = null, headers = {}) {

    injectLoaderCSS(); // Sisipkan CSS ke dalam halaman

    const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers, // Menyisipkan header tambahan jika ada
    };

    const options = {
        method,
        headers: defaultHeaders,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    showLoader(); // Tampilkan loader

    return fetch(url, options)
        .then(response => {
            hideLoader(); // Sembunyikan loader setelah request selesai
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            return response.json();
        })
        .catch(error => {
            console.error("Request failed:", error);
            throw error;
        });
}

/**
 * mengambil value dari id pada column form
 */
function Properties(values) {
    return document.getElementById(values).value;
}

/**
 * menampilkan tampilan loader
 */
function showLoader() {
    let loader = document.querySelector(".loader");
    if (!loader) {
        loader = document.createElement("span");
        loader.className = "loader";
        document.body.appendChild(loader);
    }
    loader.style.display = "block"; // Tampilkan loader
}

/**
 * menghilangkan tampilan loader
 */
function hideLoader() {
    let loader = document.querySelector(".loader");
    if (loader) {
        loader.style.display = "none"; // Sembunyikan loader
    }
}

/**
 * sisipkan tag class loader kedalam html
 */
function injectLoaderCSS() {
    const style = document.createElement("style");
    style.innerHTML = `
        .loader {
            color: black;
            font-size: 10px;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            position: fixed; /* Tetap di tengah meskipun halaman di-scroll */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-indent: -9999em;
            animation: mulShdSpin 1.3s infinite linear;
            z-index: 9999; /* Pastikan loader tampil di atas elemen lain */
        }

        @keyframes mulShdSpin {
            0%, 100% {
                box-shadow: 0 -3em 0 0.2em, 
                2em -2em 0 0em, 3em 0 0 -1em, 
                2em 2em 0 -1em, 0 3em 0 -1em, 
                -2em 2em 0 -1em, -3em 0 0 -1em, 
                -2em -2em 0 0;
            }
            25% {
                box-shadow: 0 -3em 0 -0.5em, 
                2em -2em 0 0, 3em 0 0 0.2em, 
                2em 2em 0 0, 0 3em 0 -1em, 
                -2em 2em 0 -1em, -3em 0 0 -1em, 
                -2em -2em 0 -1em;
            }
            50% {
                box-shadow: 0 -3em 0 -1em, 
                2em -2em 0 -1em, 3em 0 0 -1em, 
                2em 2em 0 0em, 0 3em 0 0.2em, 
                -2em 2em 0 0, -3em 0 0 -1em, 
                -2em -2em 0 -1em;
            }
            75% {
                box-shadow: 0 -3em 0 -1em, 
                2em -2em 0 -1em, 3em 0 0 -1em, 
                2em 2em 0 -1em, 0 3em 0 -1em, 
                -2em 2em 0 0, -3em 0 0 0.2em, 
                -2em -2em 0 0;
            }
        }
    `;
    document.head.appendChild(style);
}


