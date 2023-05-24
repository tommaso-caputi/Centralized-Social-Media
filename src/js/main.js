window.onload = async () => {
    getPosts()
};


//funzioni per mostrare post
const showPost = (postId, accountName, postDescription, postImage, postDate, likes) => {
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
              <img onClick="nuovoLike(${postId})" src="assets/icons/likeEmp.png" alt="like icon" class="iconPost">
            </span>
            <span class="postLikeNumber">${likes}</span>
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
              <img onClick="nuovoLike(${postId})" src="assets/icons/likeEmp.png" alt="like icon" class="iconPost">
            </span>
            <span class="postLikeNumber">${likes}</span>
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
        "comando": "getPostsWithLikes"
    }).then(res => {
        let temp = res.split("|!|");
        for (let i = 0; i < temp.length - 1; i++) {
            let temp2 = temp[i].split("||")
            console.log(temp2)
            showPost(temp2[0], temp2[1], temp2[2], temp2[3], temp2[4], temp2[5])
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
    }).then(res => {
        getData(document.getElementById('registerUsername').value, document.getElementById('registerPassword').value)
        document.getElementById('register-box').style.display = 'none';
    })
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

//funzione per generare post
const generatePost = () => {
    let temp = [JSON.parse(localStorage.getItem('userData')).nickname, document.getElementById('description').value, getCurrentDate()]
    richiestaApi({
        "comando": "nuovoPost",
        "nickname": temp[0],
        "descrizione": temp[1],
        "img": ".",
        "data": temp[2]
    }).then(res => {
        alert(res)
        closeBoxPost()
        location.reload()
    })
}

//funzione per aggiungere like
const nuovoLike = (postId) => {
    richiestaApi({
        "comando": "nuovoLike",
        "id_post": postId,
        "nickname": document.getElementById('loginUsername').value
    }).then(res => {
        alert(res)
        location.reload()
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




//utils functions

const getCurrentDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
}