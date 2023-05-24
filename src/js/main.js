let nickname = '';

window.onload = async () => {
};

const getData = () => {
    console.log(nickname);
    richiestaApi({
        "comando": "getData",
        "nickname": nickname
    })
}

const register = () => {
    richiestaApi({
        "comando": "nuovoUtente",
        "nickname": document.getElementById('registerUsername').value,
        "password": document.getElementById('registerPassword').value,
        "nome": ".",
        "cognome": ".",
        "bio": ".",
        "img": "."
    })
    nickname = document.getElementById('registerUsername').value;
    document.getElementById('register-box').style.display = 'none';
}

const login = () => {
    /* richiestaApi({
        "comando": "checkUtente",
        "nickname": document.getElementById('loginUsername').value,
        "password": document.getElementById('loginPassword').value
    }); */
    document.getElementById('login-box').style.display = 'none';
}

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