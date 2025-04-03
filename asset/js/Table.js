document.addEventListener("DOMContentLoaded", function () {

     // Ambil elemen yang memiliki atribut "api"
    const element = document.querySelector("div[api]");
    if (element) 
    {

        let token = sessionStorage.getItem("jwt_cookies");
        const authHeader = { Authorization: `Bearer ${token}` };
        
        const API_URL = element.getAttribute("api"); // Ambil nilai dari atribut API
        httpRequest(API_URL, "GET", null, authHeader)
        .then((data) => console.log("GET Response:", data))
        .catch((error) => console.error("GET Error:", error));
    
    }
});