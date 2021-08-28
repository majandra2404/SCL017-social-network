var db = firebase.firestore();


    //guardando post en la coleccion de firebase
export const savePost = (postMessage ) => {
        const user = firebase.auth().currentUser;
        db.collection('post').add({
            name: user.displayName,
            post: postMessage,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            userId: user.uid,
            like:0,
          
        })
  };

    //obtener coleccion de post e ir pintando en postContainer
   export const getPost = () => db.collection('post')
   .orderBy('date', 'desc')
   .onSnapshot((querySnapshot) =>{
        postContainer.innerHTML = '';
        //recorremos la coleccion de post en firebase y se crea la chingada 
        querySnapshot.forEach((doc) => {
            postContainer.innerHTML += `
            <div class="container-post">
                <h3>Por: ${doc.data().name} </h3>
                <div class="container-receta">    
                    <p>${doc.data().post}</p>        
                </div>
                <div class="container-like">
                    <button class='btn-like' id='likePost' value='${doc.id}'> 🤍 </button>
                    <span>${doc.data().like}</span>
                </div>
            </div>  ` ;

            //si el id guardado al crear el post coincide con  el del usuario logueado se muestran botones editar y borrar
            if (doc.data().userId ==  firebase.auth().currentUser.uid){
                postContainer.innerHTML += `
                <div class="btn-container">
                    <button class="btn-editar" id='editarPost' value='${doc.id}' data-post="${(doc.data().post)}">Editar Post</button>
                    <button class="btn-borrar" id='borrarPost' value='${doc.id}'></button>
                </div>
                `;
            };

        });


       //botón que activa funcion borrar post
       const btnBorrar = document.querySelectorAll('#borrarPost');
       btnBorrar.forEach((item) => {
           item.addEventListener('click', () => borrarPost(item.value));
       });

       //boton like
       const btnLike = document.querySelectorAll('#likePost');

       btnLike.forEach((item) => {
        item.addEventListener('click', () => {
            likePost(item.value)         
            })
        });
        
        //botón que activa funcion editar post
       const btnEditar = document.querySelectorAll('#editarPost');
       
       btnEditar.forEach((item) => {
           const currentText = (item.dataset.post)
           item.addEventListener('click', () =>
            editarPost(item.value, currentText) 
           );
       });

 
    });
    
const editarPost = (idPostEdit, currentText) => {
    const post = prompt('Ingresa el nuevo texto', currentText)
    if (post.trim().length === 0) {
        alert ("Rellena el campo solicitado")
    };
    

         return db.collection("post").doc(idPostEdit).update({
             post
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    };


    // Funcion que borra los post
    const borrarPost = (postId) => {
        const confirm = window.confirm('¿Aceptas desaparecer tu bello post del muro?');
        if (confirm === true) {
            db.collection("post").doc(postId).delete().then(() => {
            }).catch((error) => {
            console.error("Error removing document: ", error);
            });
        }
    };

    //Funcion para actualizar likes
    const likePost = (postId) => {
        const postRef = db.collection('post').doc(postId);
        console.log(postRef)
        return db.runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(postRef).then((doc) => {
                if (!doc.exists) {
                    throw "Document does not exist!";
                }
                // Add one person to the city population.
                // Note: this could be done without a transaction
                //       by updating the population using FieldValue.increment()
                let newLikes = doc.data().like + 1;
                transaction.update(postRef, { like: newLikes });
            })
        }).then(() => {
            console.log("Transaction successfully committed!");
        }).catch((error) => {
            console.log("Transaction failed: ", error);
        });
    };