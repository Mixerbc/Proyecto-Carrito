const carrito = document.querySelector("#carrito")
const listaCursos = document.querySelector("#lista-cursos")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
let articulosCarrito = []

cargarEvento()
    function cargarEvento(){
        
    


        listaCursos.addEventListener("click",agregarCurso)
        carrito.addEventListener("click",eliminarcurso)
        vaciarCarrito.addEventListener("click",()=>{

            limpiarCarrito()

        

            

        })


        }

    

function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){

         const cursoSeleccionado = e.target.parentElement.parentElement;
         leerFunction(cursoSeleccionado)
         
    }
}

//Elimina un curso del carrito

function eliminarcurso(e){


    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

//Elimina del arreglo articulosCarrito por el data-id


 articulosCarrito =  articulosCarrito.filter(curso=>{ curso.id !== cursoId
})
console.log(articulosCarrito)

        
     
    }
    


}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerFunction(curso){

    // Crea un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1

    }

    // Revisa si un elemento ya existe en el carrito
    
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){

        //Actualizamos la cantidad
        
        const cursos = articulosCarrito.map(curso =>{

            if( curso.id === infoCurso.id){
                curso.cantidad++
                return curso // retorna el objeto actualizado
            }
            else{
                return curso // retorna  los objetos que no son duplicados
            }
        })


        articulosCarrito = [...cursos]



    }

    else{

        articulosCarrito = [...articulosCarrito,infoCurso]
    }

       


    
    
    
   
    
    console.log(articulosCarrito)

    CarritoHTML()
    

    //Muestra el carrito de compras en HTML
function CarritoHTML(){

    //Limpia el carrito
    
limpiarCarrito()

//Recorre el carrito y genera HTML en el tbody

    articulosCarrito.forEach(curso => {
         const row = document.createElement("tr")
         row.innerHTML = ` <td> <img src="${curso.imagen}" width = "100" >  </td> 
         <td> ${curso.titulo}</td>
         <td> ${curso.precio}</td>
         <td> ${curso.cantidad}</td>
               <td>
               
               <a href="#" class="borrar-curso" data-id="${curso.id}" <a/> X </td>

         ` 
   //Agrega el HTML  del carrito en el tbody

         contenedorCarrito.appendChild(row)
    })
}

}

function limpiarCarrito(){
    
    contenedorCarrito.innerHTML = ""
}