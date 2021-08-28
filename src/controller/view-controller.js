//Este archivo maneja todas las funciones de firebase.js que se van a usar

import {signIn, logIn, googleLogin, saveUsers, signOut,addNote} from './firebase.js';




export const changeHash = (hash) => {
  location.hash = hash;
};
export const signInOnSubmit = () => { //funcion de registro manual
  const email = document.getElementById("email-registro").value;
  const password = document.getElementById("password-registro").value;
  
  signIn(email, password)
    // eslint-disable-next-line no-alert

    .then(() => alert('Datos Guardados'), changeHash('#/'))
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

export const loginWithGoogle = () => {
  googleLogin().then(() => {
    changeHash('/home');
    saveUsers();
    
  });
};

export const logInOnSubmit = () => { //funcion de logueado manual
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value; 


  logIn(email, password)
    .then(() =>  {
      saveUsers();
      changeHash('/home');

    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      
    });
};

export const signOutSubmit = () => {
  signOut().then(() => {
    changeHash('#/');
    alert('Cerrando sesión');
  }).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });
};
export const addNoteOnSubmit = (post) => {


 addNote(post)
    console.log(post);
     
};

export const feedUpdate = (callback) => {
  const db = firebase.firestore();
  db.collection('notes').orderBy ("date").onSnapshot(callback);
   
};

export const deletePost = (id) => {
  const db = firebase.firestore();
  db.collection("notes").doc(id).delete();
}

export const getPost=(id)=> {
  const db=firebase.firestore();
  return db.collection("notes").doc(id).get();


}
export const updatePost = (id) => {
  const db = firebase.firestore();
  db.collection("notes").doc(id).update();
}