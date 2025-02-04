const API_BASE_URL = window.location.origin.includes("localhost")
    ? "http://localhost:5000"
    : "https://trialform-db.vercel.app/";

document.querySelector(".Register").addEventListener("submit", async (event) =>{
    event.preventDefault() ;

    //Capture the Data

    const formData = {
        Name : document.getElementById("name").value ,
        Username: document.getElementById("username").value ,
        Password : document.getElementById("password").value ,
        Email : document.getElementById("email").value ,
        Gender : document.querySelector('input[name="gender"]:checked').value ,
        dob : document.getElementById("dob").value ,
        Phone : document.getElementById("phone").value ,
        Address : document.getElementById("address").value ,
        termsAccepted : document.getElementById("t&c").checked ,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/register`,{
            method: "POST" ,
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(formData)
        })

        const data = await response.json();
        alert (data.message || "Registration Successfull !!")
    } catch(error) {
        alert("Error registering the user.")
        console.error(error)
    }
    
})



