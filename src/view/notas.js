import {feedUpdate , deletePost,getPost} from '../controller/view-controller.js'



export const notas = ()=>{

  const container = document.createElement('section');
  container.className = 'user-post-container';

 
  feedUpdate((querySnapshot) => {
    const user = firebase.auth().currentUser;
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
   
    
        <div class="nav-vertical">
        <a href="" class="likes" id="likes"  ><img  src="../Assets/imagenes/likes.svg" alt="likes"></a>
        <a href="" class="comments" id="comments"><img  src="../Assets/imagenes/comments.svg" alt="comments"></a>
        
        </div>
      
        `;
        if (data.uid ==  firebase.auth().currentUser.uid){
          container.innerHTML += `
          <div class="nav-post">
          <button class="btn-editar" id="btn-editar" data-id="${doc.id}">editar</button>
          <button class="btn-borrar" data-id="${doc.id}" id="btn-borrar">borrar</button>
          </div>
          `;
        };
     
           
            
        const btnsDelete = container.querySelectorAll(".btn-borrar");
          btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async (e) => {
              try {
                await deletePost(e.target.dataset.id);
              } catch (error) {
                console.log(error);
              }
            })


        
    );
        const btnsEdit= container.querySelectorAll(".btn-editar");
         btnsEdit.forEach(btn => {
          
          btn.addEventListener('click',async(e) => {
            const doc=getPost(e.target.dataset.id);
            doc.then(resp=>{
            console.log(resp.data());

            })
            .catch(error=>{
              console.log(error);
            })
           
          })

         })

        //  const editarPost = () => {
          
        //   const post = prompt('Ingresa el nuevo texto', textNewNote)
        //   if (post.trim().length === 0) {
        //       alert ("Rellena el campo solicitado")
        //   };
          
      
        //        return db.collection("notes").doc(id).update()
        //           .then(() => {
        //               console.log("Document successfully updated!");
        //           })
        //           .catch((error) => {
        //               // The document probably doesn't exist.
        //               console.error("Error updating document: ", error);
        //           });
      
        //         }

    });
    

    
    
  });

 
 
  

;
    

  return container;

  

} 
