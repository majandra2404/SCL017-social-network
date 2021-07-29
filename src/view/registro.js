
export default () =>{
  const viewRegistro = 
  `
  <div class="formulario-registro-container" id="formulario-registro-container">
    <form action="#" method="post" id="form-registro" class="form-registro">
      <input type="email" name="email-registro" id="email-registro"  class="email-registro" placeholder="tucorreo@correo.com" value="">
      <input type="password" name="password-registro" id="password-registro" class="password-registro" placeholder="contraseña" value="">
        <h4>Puedes hacer registro manual o puedes acceder con tu cuenta de Google</h4>

        
          <!-- Botón switch registro -->

      <div class="container-boton">
        <div class="switch">
          <input type="radio" class="switch-input" name="view" value="registro" id="registro" checked>
          <label for="registrame" class="switch-label switch-label-off">registro</label>
          <input type="radio" class="switch-input" name="view" value="google-btn" id="google-btn">
          <label for="google-btn" class="switch-label switch-label-on">
            <img class="logo-google" src="./Assets/imagenes/flat-color-icons_google.svg" alt="google">
          </label>
          <span class="switch-selection"></span>
        </div>
      </div>
    </form>

    <p class="registrate">¿ya tienes cuenta? Entonces <a href="#/">haz login</a> y comienza a disfrutar de una vida natural</p>
  </div>

  `
  // const sectionElement = document.createElement('main');
  // sectionElement.classList.add('registro-container');
  // sectionElement.innerHTML = viewRegistro;
  // sectionElement.querySelector('#registro').addEventListener('click', console.log('página de registro') );
  // return sectionElement;
}