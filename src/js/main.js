window.onload = async () => {
    getPosts()
};


//funzioni per mostrare post
const showPost = (accountName, postDescription, postImage, postDate) => {
    const likeCount = 0; //da ottenere
    const postDiv = document.createElement('div');
    if (postImage == '.') {
        postDiv.innerHTML = `
        <div class="post">
          <div class="postHeader">
            <span class="postAccountImg">
              <img src="assets/icons/user.png" alt="account icon" class="iconPost">
            </span>
            <span class="postAccountName">${accountName}</span>
          </div>
          <div class="postDescription">${postDescription}</div>
          <div class="postInteractions">
            <span class="postLike">
              <img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost">
            </span>
            <span class="postLikeNumber">${likeCount}</span>
            <span class="postShare">
              <img src="assets/icons/share.png" alt="like icon" class="iconPost">
            </span>
          </div>
          <div class="postInfo">
            <span>${postDate}</span>
          </div>
        </div>
        `;
    } else {
        //da modificare per l' immagine
        postDiv.innerHTML = `
        <div class="post">
          <div class="postHeader">
            <span class="postAccountImg">
              <img src="assets/icons/user.png" alt="account icon" class="iconPost">
            </span>
            <span class="postAccountName">${accountName}</span>
          </div>
          <div class="postImages">
                <img src="assets/images/sample.jpg" alt="Immagine post" class="img">
            </div>
          <div class="postInteractions">
            <span class="postLike">
              <img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost">
            </span>
            <span class="postLikeNumber">${likeCount}</span>
            <span class="postShare">
              <img src="assets/icons/share.png" alt="like icon" class="iconPost">
            </span>
          </div>
          <div class="postDescription">${postDescription}</div>
          <div class="postInfo">
            <span>${postDate}</span>
          </div>
        </div>
        `;
    }
    document.getElementById('container').appendChild(postDiv);
}

//funzione per ottenere tutti i post
const getPosts = () => {
    richiestaApi({
        "comando": "getPosts"
    }).then(res => {
        let temp = res.split("|!|");
        for (let i = 0; i < temp.length - 1; i++) {
            let temp2 = temp[i].split("||")
            showPost(temp2[1], temp2[2], temp2[3], temp2[4])
        }
    })
}


//funzione per fetchare tutti i dati di un' utente
const getData = (nickname, password) => {
    richiestaApi({
        "comando": "getData",
        "nickname": nickname,
        "password": password
    }).then(res => {
        let temp = res.split("||");
        localStorage.setItem('userData', JSON.stringify({
            nickname: nickname,
            password: password,
            nome: temp[0],
            cognome: temp[1],
            bio: temp[2],
            img: temp[3]
        }))
        //set account data in accountbox
        document.getElementById('account-name').innerHTML = nickname;
        document.getElementById('nickname').placeholder = nickname;
        document.getElementById('name').placeholder = temp[0];
        document.getElementById('surname').placeholder = temp[1];
        document.getElementById('bio').placeholder = temp[2];
    })
}

//funzione per la registrazione
const register = () => {
    richiestaApi({
        "comando": "nuovoUtente",
        "nickname": document.getElementById('registerUsername').value,
        "password": document.getElementById('registerPassword').value,
        "nome": "nome",
        "cognome": "cognome",
        "bio": "bio",
        "img": "."
    })
    alert('Registrazione effetuata con successo')
    nickname = document.getElementById('registerUsername').value;
    document.getElementById('register-box').style.display = 'none';
}


//funzione per il login
const login = () => {
    richiestaApi({
        "comando": "checkUtente",
        "nickname": document.getElementById('loginUsername').value,
        "password": document.getElementById('loginPassword').value
    }).then(res => {
        if (res == 1) {
            getData(document.getElementById('loginUsername').value, document.getElementById('loginPassword').value);
            alert('Login effetuato con successo');
            document.getElementById('login-box').style.display = 'none';
        } else {
            alert('Username o password errati');
        }
    });
}


//funzione per richieste http all'api del database 
const richiestaApi = (json) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch("http://tommasocaputi.altervista.org/CSM/webhook.php", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(json),
        redirect: 'follow'
    }).then(response => { return response.text() })
}