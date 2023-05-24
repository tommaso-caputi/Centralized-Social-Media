<?php
function nuovoUtente($nickname, $password, $nome, $cognome, $bio, $img){
	if (checkUtente($nickname)==0){
      $conn = new mysqli("localhost", "root", "","my_tommasocaputi");
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $query = "INSERT INTO UtentiCSM (nickname, passwd, nome, cognome, bio, img) VALUES ('$nickname', '$password', '$nome', '$cognome', '$bio', '$img')";
      if ($conn->query($query) === TRUE) {
        echo "Utente registrato con successo";
      }
      $conn->close();
    }else{
		echo "Nickname giá in uso";
    }
}
function checkUtente($nickname){
	$res = 0;
	$conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "SELECT COUNT(*) AS count FROM UtentiCSM WHERE nickname = '$nickname'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $res = $row["count"];
      }
    } else {
      echo "0 results";
    }
    $conn->close();
    return $res;
}
function checkFullUtente($nickname, $password){
	$res = 0;
	$conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "SELECT COUNT(*) AS count FROM UtentiCSM WHERE nickname = '$nickname' and passwd = '$password'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $res = $row["count"];
      }
    } else {
      echo "0 results";
    }
    $conn->close();
    return $res;
}

function nuovoPost($nickname, $descr, $img, $data){
    $conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "INSERT INTO PostsCSM (nickname, descrizione, img, data) VALUES ('$nickname', '$descr', '$img', '$data')";
    if ($conn->query($query) === TRUE) {
      echo "Post registrato con successo";
    } else {
      echo "Errore: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}

function nuovoLike($id_post, $nickname){
	if (checkLike($id_post, $nickname)==0){
      $conn = new mysqli("localhost", "root", "","my_tommasocaputi");
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      $query = "INSERT INTO LikesCSM (post_id, nickname) VALUES ('$id_post', '$nickname')";
      if ($conn->query($query) === TRUE) {
        echo "Like registrato con successo";
      } else {
        echo "Errore: " . $sql . "<br>" . $conn->error;
      }
      $conn->close();
    }else{
    	echo "Like giá registrato";
    }
}

function checkLike($post_id,$nickname){
	$res = 0;
	$conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "SELECT COUNT(*) AS count FROM LikesCSM WHERE post_id = '$post_id' AND nickname = '$nickname'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        //echo $row["count"];
        $res = $row["count"];
      }
    } else {
      echo "0 results";
    }
    $conn->close();
    return $res;
}

function getData($nickname, $password){
	$conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "SELECT * FROM UtentiCSM WHERE nickname = '$nickname' and passwd = '$password'";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        echo $row['nome']."||".$row['cognome']."||".$row['bio']."||".$row['img'];
      }
    } else {
      echo "0 results";
    }
    $conn->close();
}

function getPosts(){
	$conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "SELECT * FROM PostsCSM ";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        echo $row['id']."||".$row['nickname']."||".$row['descrizione']."||".$row['img']."||".$row['data']."|!|";
      }
    } else {
      echo "0 results";
    }
    $conn->close();
}
function getPostsWithLikes(){
	$conn = new mysqli("localhost", "root", "","my_tommasocaputi");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
	$query = "SELECT id, PostsCSM.nickname, descrizione, img, PostsCSM.data,COUNT(post_id) AS likes
              FROM PostsCSM 
              LEFT JOIN LikesCSM ON PostsCSM.id = LikesCSM.post_id
              GROUP BY id";
    $result = $conn->query($query);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        echo $row['id']."||".$row['nickname']."||".$row['descrizione']."||".$row['img']."||".$row['data']."||".$row['likes']."|!|";
      }
    } else {
      echo "0 results";
    }
    $conn->close();
}

?>