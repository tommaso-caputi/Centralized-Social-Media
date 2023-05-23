window.onload = async () => {

    document.getElementById("login-box");

};


const richiestaApi = (json) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://tommasocaputi.altervista.org/CSM/webhook.php", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(json),
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}