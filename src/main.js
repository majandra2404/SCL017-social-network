// Este es el punto de entrada de tu aplicacion

import { cambioRuta } from './controller/router.js';
import { changeHash } from './controller/view-controller.js';



 firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    changeHash('/home');

  } else {
     
    changeHash('#/');

  }
});



const init = () =>{


  window.addEventListener('hashchange' , ()=>{ 
    cambioRuta(window.location.hash);
  })

 
};


window.addEventListener('load', init);
