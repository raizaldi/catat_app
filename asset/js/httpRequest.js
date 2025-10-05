
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
        .then(async response => {
            hideLoader(); // Sembunyikan loader setelah request selesai

            if (!response.ok) {
                // Try to parse JSON error body to extract API message
                let errorBody = null;
                try {
                    // clone the response so we can read body safely
                    errorBody = await response.clone().json();
                } catch (e) {
                    // If body is not JSON or empty, fall back to text
                    try {
                        errorBody = await response.clone().text();
                    } catch (e2) {
                        errorBody = null;
                    }
                }

                // Build a structured error to throw
                const err = new Error(
                    (errorBody && errorBody.message) ? errorBody.message : `HTTP ${response.status}`
                );
                err.status = response.status;
                err.body = errorBody;
                throw err;
            }

            return response.json();
        })
        .catch(error => {
            // Ensure loader is hidden on any errors (in case of network errors)
            hideLoader();
            // Re-throw so callers can handle it
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


