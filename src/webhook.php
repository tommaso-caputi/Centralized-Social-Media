<?php 
    require __DIR__ . '/db.php';
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Headers: *");
    
    $data = json_decode(file_get_contents('php://input'), true);
    switch ($data['comando']) {
      case "nuovoUtente":
        nuovoUtente($data['nickname'],$data['password'],$data['nome'],$data['cognome'],$data['bio'],$data['img']);
        break; 
      case "nuovoPost":
      	nuovoPost($data['nickname'],$data['descrizione'],$data['img'],$data['data']);
        break;
      case "nuovoLike":
      	nuovoLike($data['id_post'],$data['nickname']);
        break;
      case "getData":
      	getData($data['nickname'],$data['password']);
      	break;
      case "checkUtente":
      	echo checkFullUtente($data['nickname'],$data['password']);
      	break;
      case "getPosts":
      	echo getPosts();
      	break;
      case "getPostsWithLikes":
      	echo getPostsWithLikes();
      	break;
      default:
        break;
	}

?>