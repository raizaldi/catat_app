document.addEventListener("DOMContentLoaded", function () {

    const authHeader = {};
    const API_URL = "/api/login";

  
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        let payload = {
            email: Properties("email"),
            password: Properties("password")
        }

        httpRequest(API_URL, "POST", payload, authHeader)
            .then((data) => {
                /*
                Swal.fire({
                    title: "Login success",
                    icon: "success",
                    draggable: true
                  });
                  */
                sessionStorage.setItem("jwt_cookies", data.token);
            }).catch((error) => {
                alert("Login gagal: " + data.message);
            });
    });



});