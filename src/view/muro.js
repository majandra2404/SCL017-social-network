
//Importar las funciones del view controller que usaremos en el muro

import {signOutSubmit,addNoteOnSubmit} from '../controller/view-controller.js';
import {notas} from './notas.js'

export const muro = () =>{

  const container = document.createElement('section');
  const user=firebase.auth().currentUser;
  container.className = 'muro';


  const viewMuro= `
  <header class="header-container" id="header-container">
    <img src="../Assets/imagenes/Naturopolis-logo-muro.svg" alt="logo" class="logo">
    <h1 id="titulo-header" class="titulo-header">
      Naturópolis
    </h1>
    <button class="btn-signOut"id="btn-signOut">
      <img src="../Assets/imagenes/Frame-icono-logOut.svg" alt="logOut" class="botón-logOut">
    </button>
  </header>
  <section class="perfil-usuario" id="perfil-usuario">
    <img src="${user.photoURL}" alt="" class="avatar-usuario">
    <h3 class="nombre-usuario-perfil" id="nombre-usuario">${user.displayName}</h3>
  </section>


  <section class="crear-post" id="section-post">
    <form class="form" id="form">
      <textarea name="" id="texto-input" class="texto-input" wrap="hard" maxlength="500" >
    
      </textarea>
      <button type="submit" class="btn-send" id="btn-send">
        <img src="../Assets/imagenes/send.svg" alt="send">
      </button>
    </form>
  </section>
  `;

  container.innerHTML = viewMuro;

    
    const signOutBtn = container.querySelector('#btn-signOut');
    signOutBtn.addEventListener('click' , ()=>{
      signOutSubmit();
    });

    const formulario = container.querySelector('#form');
    formulario.addEventListener('submit',(event)=>{
      event.preventDefault();

      const textarea = container.querySelector('#texto-input');
      console.log(textarea.value);
      addNoteOnSubmit(textarea.value);
      formulario.reset();
    

    });

// Usamos INSERTBEFORE para agregar las PUBLICACIONES al muro
  const crearPost = container.querySelector('#section-post');
  container.insertBefore(notas() , crearPost);
    
  return container;
  };