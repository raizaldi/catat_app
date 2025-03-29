document.addEventListener("DOMContentLoaded", function () {

     // Ambil elemen yang memiliki atribut "api"
    const element = document.querySelector("div[api]");
    if (element) 
    {
        const authHeader = { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjIwMDAvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDoyMDAwLyIsImlhdCI6MTc0Mjg5NzIxNiwiZXhwIjoxNzQyOTAwODE2LCJkYXRhIjp7ImlkIjoiMSIsImVtYWlsIjoiYWNobWFkLnJhaXphbGRpQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9fQ.V91JfwPrTg6-B9jbWR5pdvLG-3SDGXr0QRM7dBaPtZI" };
        
        const API_URL = element.getAttribute("api"); // Ambil nilai dari atribut API
        httpRequest(API_URL, "GET", null, authHeader)
        .then((data) => console.log("GET Response:", data))
        .catch((error) => console.error("GET Error:", error));
    
    }
});