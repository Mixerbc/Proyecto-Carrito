const carrito = document.querySelector("#carrito")
const listaCursos = document.querySelector("#lista-cursos")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
let articulosCarrito = []

cargarCurso()

function cargarCurso(){

    listaCursos.addEventListener("click",agregandocurso)
    carrito.addEventListener("click",eliminarcurso)
    vaciarCarrito.addEventListener("click",()=>{
        limpiarcurso()
        articulosCarrito = ""
    })
}

function agregandocurso(e){
    e.preventDefault()

if(e.target.classList.contains("agregar-carrito")){
    const curso = e.target.parentElement.parentElement

     leerdatosCurso(curso)
}

}

function leerdatosCurso(curso){
    

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
          cantidad: 1,

    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso

            }
            else{
                return curso
            }
        })
        articulosCarrito = [...cursos]
    }  
    else{ articulosCarrito = [...articulosCarrito,infoCurso]

    }
            

  

    CarritoHTML();
}

function eliminarcurso(e){
    if(e.target.classList.contains("borrar-curso")){
        cursoId = e.target.getAttribute("data-id")
       articulosCarrito = articulosCarrito.filter(curso=>  curso.id !== cursoId)
       
       CarritoHTML();

    }

}

function CarritoHTML(){

    limpiarcurso()
    

    

articulosCarrito.forEach(curso =>{
    const row = document.createElement("tr")
    row.innerHTML = `
    <td> <img src="${curso.imagen}" width="100"> </td>
    <td> ${curso.titulo} </td>     
    <td> ${curso.precio}</td>
    <td>${curso.cantidad}</td>
<td> <a href="#" class= "borrar-curso" data-id="${curso.id}"> X
    </td>
    `
contenedorCarrito.appendChild(row)
})
}

function limpiarcurso(){
    contenedorCarrito.innerHTML=""
}