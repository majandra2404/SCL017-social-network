export const notas = ()=>{

  const container = document.createElement('section');
  container.className = 'user-post-container';

  const db = firebase.firestore();
  db.collection("notes").get().then((querySnapshot) => {
    container.innerHTML= '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
         container.innerHTML += `<div class="post-container">
          <div class="user-info">
          <img src="../Assets/imagenes/Avatar.svg" alt="avatar" class="img-avatar">
          <p class="user-name">${data.user}</p>
        </div>
        <div class="post-texto-container">
          <div class="post-texto">
            <p>${data.textNewNote}</p>
          </div>  
          <div>
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">
            🗑 Delete
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            🖉 Edit
          </button>
        </div>
        </div>
        <div class="nav-vertical">
        <a href="" class="likes" id="likes" ><img  src="../Assets/imagenes/likes.svg" alt="likes"></a>
        <a href="" class="comments" id="comments"><img  src="../Assets/imagenes/comments.svg" alt="comments"></a>
        
        </div>
      </div> 
        `;

    });

  });


;
    

  

  return container;
  

} 