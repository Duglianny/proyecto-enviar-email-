

// paso 1 asegurar que el html este listo y se decargue todo el documento para ejecutar 

document.addEventListener('DOMContentLoaded', function() {  //esta es la propiedad para ejecutar despues de que el html este listo 

  //PASO ###8 CREANDO UN OBJETO PARA VALIDAR Y SINCRONIZAR DATOS

  const email = {  //se coloca como string vacios ya que a medida de que el uausario vaya llenando se van llenando el objeto 

    email: '',
    asunto:'',
    mensjae:''
  }

  //paso ##2 seleccionar los elementos cuyo campos se van a llenar como los inputs

  const inputEmail = document.querySelector('#email'); // con esto seleccionamos cada uno de los campos y nos selecciona el html de cada input 

  const inputAsunto = document.querySelector('#asunto');

  const inputMensaje = document.querySelector('#mensaje')

  const formulario = document.querySelector('#formulario');

  const btnSubmit = document.querySelector('#formulario button[type="submit"]');//para seleccionae el boton  por su atributo 

  
  // paso 3 asisganr eventos 

 /* MODO LARGO   
  inputEmail.addEventListener('blur', function(e){  //este es el evento para validar formularios cuando este evento ocurra se ejecuta este codigo este primer blur se va a ejecutar cuando se abandona el campo es decir cuando el ususario escribe en el campo y se sale de el se dispara el evento 

    console.log(e.target.value); //ojoo el target me mostrara el elemento sobre el cual esta ocurriendo el evento y el .value es para saber que es lo que el usuario escribio para hacer una validacion es decir si escribe y se sale del campo al disparar el evento se mostrar en consola lo que el usuario escribio 

  })

  inputAsunto.addEventListener('blur', function(e){
    console.log(e.target.value)
  })

  inputMensaje.addEventListener('blur', function(e){
    console.log(e.target.value)
  })*/

  //MODO CORTO PARA NO REPETIR TANTO CODIGO 

  inputEmail.addEventListener('blur', validar);  //para no repetir codigo se hace de la siguiente manera crando una funcion aparte y declarandola en cada evento se coloca solo el nombre ya que si se le colocan los ( ) signofoca que se esta mandnando allamar la funcion 

  inputAsunto.addEventListener('blur', validar);

  inputMensaje.addEventListener('blur', validar);

  function validar(e){  //aqui con el nombre de la funcion declarado en cada una de las variables se le pasa el evento para hacerle referencia y este se ejecutara una vez suceda ese evento es decir los 3 eventos usan la misma funcion 

    //PASO ##4  VALIDAR CAMPOS VACIOS Y ELIMINAR ESPACIOS 

    if(e.target.value.trim() === ''){ //aqui dice que la funcion .value que es para ver ue escribe el usuario el .trim es para eliminar los espacios innecesarios que el usuario ponga de mas si eso es igual a un string vacio dira que esta vacio el campo asi se pongan en el campo puro espacios vacios dira que esta vacio ya que el trim los elimina 

      mostarAlerta(`El campo ${e.target.id}  es obligatorio`, e.target.parentElement);  //primero se tiene la funcion de vaidar y en caso de que halla un error se manda a llamar aqui adentro la funcion de la aletar  en caso de que halla un error aqui se ejecuta el codigo de la funcion de la alerta se mostrara este msj la variable que se coloca adentro es el evento e .id ya que cada campo tiene su propio id entoncs cuando se seleccione cada campo el nombre cambiara con respecto a su id para validar cada campo,  el segundo valor es el valor de la referencia el cual me va del input al padre que seria el div 

      // PASO ##6 // limpiar una alerta cuando la validacion es correcta 

      return;// este return lo que hace es detener la ejecucion del codigo en caso de que este vacio el campo muestra la alerta y luego el return para deterner la ejecucion 
    }

    //paso ###7 

    if(e.target.id === 'email' && !validarEmail(e.target.value)){ //se manda a llamar auqi en validacion la funcion que seria para validar el email para que se ejecute el codigo de abajo de esta funcion el cual retorna false en caso de que no se cumpla la expresion regular en caso de que si retorna true  el e.target.value  para ver si el ususario escribio un email valido  el ! al principio es para negarlo es decir si no se cumple es condicion o validacion arroja esta codigo abajo   e.target.id === 'email' &&  esto se le agrego de ultimo ya que se jecuta este codigo de no cumplir la expresion regular en los demas campos entonces con esto se le indica con el && que se deben cumplir esas dos condiciones en ese campo que sea un email y que cumpla la expresion regular con el id del campo email para que solo sea ahi 

      mostarAlerta('el email no es valido', e.target.parentElement)// aqio se dice el msj de la alerta con sus estilos del primer parametro y la refenrecia para que solo salga en ese div 

      return; //para que se deje de ejecutar el codigo despues de ejecutar 1 vez

    }

    limpiarAlerta(e.target.parentElement);     

    //paso ## 9 aignar los valores al objeto al pasa la validacion para que se agg cada valor a su campo correspondiente en cada objeto 

    email[e.target.name] = e.target.value.trim().toLowerCase();  // a email que es el objeto de arriba e.target.name ya que cada campo asi como tiene un id cada uno tambien tiene un name  y eso es igual a lo que escriba el usuario eliminando los espacios y todo el minusculas con esto se van llenando los campos del objetis a medida que el usuario vaya llenando sus campos 

  
    //paso ###10 comprobar email

    comprobarEmail();
    

  }
    // PASO ##5 ALERTA DE ERROR EN LA VALIDACION EN CASO DE QUE NO SE LLENE CORRECTAMENTE 

  function mostarAlerta(mensaje, referencia){ //aqui se le pasa el parametro mensaje  y se manda a llamar arriba uando halla error se imprime este cosigo la referencia es otro parametro en el cual es donde se va a añadir el otro valor separado de una coma cuando se mande a llamar esta funcion arriba 

    //COMPRUEBA SI YA EXISTE UNA ALERTA (PREVENIR QUE SE GENEREN MULTIPLES ALERTAS)

    const alerta = referencia.querySelector('.bg-red-600'); // seleccionando los elememtnos que tengan esa clse ue se les agrego abajo, si se coloca document este remove eliminara las alertas previas de otros campo es decir arroja alerta en email pero cuando va a arrojar la alerta de asunto se borra la de emain con referencia se limita a buscar solo en esa seccion esa clase ya que en referencia arriba se declaro que seria el div padre de cada input entonces aqui se esta diciendo que seleccione esa clase en cada input para que de esta manera se eeliminen las multipkes alertas pero no se borren las previas 
    
    /*if(alerta){ //si ya existe una alerta que es la primera impresion entonce eliminar las demas 
      alerta.remove();
    }*/

    limpiarAlerta(referencia);// como aqui el codigo es el mismo que abajo lo que se hace es que se borra ese codigo largo que se repite aqui arriba y se manda a llamar la funcion aqui arriba y hara la misma funcion solo que el comprobar se pasa a su funcion abajo 
   
    //generar alerta en html

    const error = document.createElement('P'); //se crea una nueva etiqueta en la fucnion que sera agregada luego al html 

    error.textContent = mensaje   //aqui es igual al paraetro para que imprima el msj de la funcion arriba 

    error.classList.add('bg-red-600', 'text-white', 'p-2') //estas clasesse agregaron para darle estilos a la alerta con un fondo rojo texto blanco y padding de 2 


    //inyectar el error a la etiqueda o id formulario del htmk para que se muestre 

    referencia.appendChild(error);  //se le dice a formulario a esa etiqueta form que le agregue un hijo que es el error y se muestre en el html cada vez que se deje el campo vacio esto anade la alerta a lo ultimo de form ya que appenchild agrega los hijos al final PEROOOO con referencia cuyo parametros declarados arriba nos lleva al padre de cada input que son los div de esta manera se colocara cada alerta debado de su campo 
  }

  //PASO ##6

  function limpiarAlerta(referencia){ //limpiar alerta tambien tendra una referencia donde se aadira su valor 

    const alerta = referencia.querySelector('.bg-red-600'); //se selecciona ya no para eliminar las demas alertas si no para eliminar esa alerta si pasa l validacion 
    
    if(alerta){ 
      alerta.remove();
    }

  }

  //PASO ### 7 VALIDAR EMAIL CON UNA EXPRESION CORRECTA 

  function validarEmail(email){

    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/  //este es el codigo regular o correcto cuyo codigo regular es un patron de este tipo que busca un patron en una cadena de texto o en una serie de numeros el patron de email es usuario@dominio.com  otro patron con los numeros son las tarjetas de debidos ue son 16 numeros o codigos postales que son 5 numeros 

    const resultado = regex.test(email);// para utilizar o implementar una expresion regular el metodo especial para ello es test y a el se le pasa que es lo que se quiere comprobar en este caso el parametro de la funcion es el email 

    return resultado; //para retornar el resultado 
  }

  //paso## 10 

  function comprobarEmail() { //esta funcion se manda a llamar cada vez que se agregue algo en el formulario y se llama arriba en la validacion 

    console.log( Object.values(email).includes('') ) 

    /*if(Object.values(email).includes('')) { //este codigo me muestra del objeto email  el lado derecho que seriasn los valores que nos interesan por que son los valores que el usuario ha ingresado mientras que en vez de values fuera .keys me muestra el lado izquierdo o las llaves de los objetos, como esto retorna un arreglo se puede usar el metodo de arreglo .includes y lo que hace es tomar todos los valores del objeto y los agg a un arreglo y con .include verifica si al menos 1 de los valores contiee un string vacio y retorna true y false si todos los valores estan llenos y con eso se puede habilitar el boton  en si es para verificar que todos los campos esten llenos para que se habiite el boton 


    }else{
      btnSubmit.classList.remove('opacity-50');  //aqui dice que si arriba es false o esten todos los campos llenos se elimine esta clase de ese boton submit 

      btnSubmit.disabled = false; // y tambien que cuando esten llenos el desabilitado que tiene se le quite 
    }
  
    // console.log(Object.values(email).includes(''));*/
  
  }
})
  

  


