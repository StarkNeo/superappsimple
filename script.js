//BOTONES QUE SE USAN FRECUENTEMENTE//

//botones de control de lista
const boton_Guardar = document.getElementById('guardar');
const boton_Mostrar = document.getElementById('mostrar');
const boton_Cerrar = document.getElementById('cerrar');
const boton_crear = document.getElementById('boton-crear');
const guardar_cambios= document.getElementById('guardar-cambios');
const borrar_lista=document.getElementById('borrar-local');


class Articulo {
    constructor(nombre_articulo, precio_pres, precio_real) {
        this.nombre_articulo = nombre_articulo;
        this.precio_pres = precio_pres;
        this.precio_real = precio_real;

    }

}

//FUNCION PARA AGREGAR UN ITEM

function agregar(e) {
    let seccion = document.getElementById('lista');
    let listas = document.createElement('div');
    listas.classList = 'articulo';
    listas.innerHTML = `
            <label>Nombre Producto</label>
            <input class='propiedad item' type='text' placeholder='Nombre del articulo'>
            <label>Valor Presupuesto</label>
            <input class='propiedad precio' value='0' type='number' onchange="sumaPres()" placeholder='$ Valor Presupuestado'>
            <label>Valor Real</label>
            <input class='propiedad real' value='0' type='number' onchange="sumaReal()" placeholder='$ Valor Real'>
            <input class='btneliminar' type='button' value='-'">
                    
            `;
    seccion.appendChild(listas);
    boton_Guardar.style.display = 'unset';
    


}


//FUNCION PARA ELIMINAR UN ITEM
const eliminar = e => {
    let parentLi = e.parentNode;
    let parentUl = parentLi.parentNode;
    parentUl.removeChild(parentLi);
    sumaPres();
    sumaReal();

}


//EVENTO PARA AGREGAR O ELIMINAR ITEMS

document.addEventListener('click', e => {
    let boton = e.target;
    if (boton.value === '(+) Agregar Articulos') {
        agregar(boton);
    }
    else if (boton.value === '-') {
        eliminar(boton);
    }
    else {
        console.log('FUNCIONA BIEN PORQUE NO ES EL BOTON BUSCADO')
    }

})



//FUNCION PARA SUMAR
const sumaPres = () => {
    let inputPrecios = document.getElementsByClassName('precio');
    let sumaArreglo = 0;
    let totalPresupuesto = document.getElementById('total-pres');

    for (let index = 0; index < inputPrecios.length; index++) {

        sumaArreglo += parseFloat(inputPrecios[index].value);
    }
    totalPresupuesto.value = sumaArreglo.toFixed(2);
    diferencia();
    return sumaArreglo.toFixed(2);
}

const sumaReal = () => {
    let inputReal = document.getElementsByClassName('real');
    let sumaReal = 0;
    let totalReal = document.getElementById('total-real');
    for (let index = 0; index < inputReal.length; index++) {
        sumaReal += parseFloat(inputReal[index].value);

    }
    totalReal.value = sumaReal.toFixed(2);
    diferencia();
    return sumaReal.toFixed(2);

}
//FUNCION PARA DETERMINAR DIFERENCIA
const diferencia = () => {
    let total_real = document.getElementById('total-real').value;
    let total_pres = document.getElementById('total-pres').value;
    let cajaDiferencia = document.getElementById('diferencia');
    cajaDiferencia.value = (total_pres - total_real).toFixed(2);
}

//GUARDAR LISTA EN EL LOCALSTORAGE

const guardar = () => {
    let items = document.getElementsByClassName('articulo');
    let nodos = []
    for(const item of items){
        let producto = new Articulo();
        producto.nombre_articulo = item.childNodes[3].value;
        producto.precio_pres = item.childNodes[7].value;
        producto.precio_real = item.childNodes[11].value;
        nodos.push(producto);
    
    }
    
    localStorage.setItem('presupuesto', JSON.stringify(nodos));
    limpiar();
    //boton_crear.style.display = 'none';
    boton_Mostrar.style.display = 'unset';
    boton_Guardar.style.display = 'none';
    return nodos;
    
}



const limpiar = () => {
    let lista = document.getElementById('lista');
    lista.innerHTML = `
    <p>Lista almacenada con exito</p>
    `
    let total_real = document.getElementById('total-real').value = 0;
    let total_pres = document.getElementById('total-pres').value = 0;
    let cajaDiferencia = document.getElementById('diferencia').value = 0;

}

const obtenerLocal = () => {
    if(localStorage.length===0){
        alert('No existe lista en el almacen');
    }
    else{
        let seccion = document.getElementById('lista');
        seccion.innerHTML=" ";
        let almacen = JSON.parse(localStorage.getItem('presupuesto'));
        for (let x = 0; x < almacen.length; x++) {
            let elemento = document.createElement('div');
            elemento.classList = 'articulo';
            elemento.innerHTML = `
            <label>Nombre Producto</label>
            <input class='propiedad item' type='text' placeholder='Nombre del articulo' value="${almacen[x].nombre_articulo}">
            <label>Valor Presupuesto</label>
            <input class='propiedad precio' type='number' onchange="sumaPres()" placeholder='$ Valor Presupuestado' value="${almacen[x].precio_pres}">
            <label>Valor Real</label>
            <input class='propiedad real' type='number' onchange="sumaReal()" placeholder='$ Valor Real' value="${almacen[x].precio_real}">
            <input class='btneliminar' type='button' value='-'">

                        
                `;
            seccion.appendChild(elemento);
        }
        sumaPres();
        sumaReal();
    
        boton_Mostrar.style.display = 'none';
        //boton_crear.style.display = 'unset';
        //boton_Cerrar.style.display = 'unset';
        boton_Guardar.style.display='none';
        guardar_cambios.style.display='unset';
        borrar_lista.style.display='unset';
    
    
    }
    
}


const guardarCambios = () => {
    let items = document.getElementsByClassName('articulo');
    let nodos = []
    for(const item of items){
        let producto = new Articulo();
        producto.nombre_articulo = item.childNodes[3].value;
        producto.precio_pres = item.childNodes[7].value;
        producto.precio_real = item.childNodes[11].value;
        nodos.push(producto);
    
    }
    
    localStorage.setItem('presupuesto', JSON.stringify(nodos));
    limpiar();
    //boton_crear.style.display = 'none';
    boton_Mostrar.style.display = 'unset';
    //boton_Guardar.style.display = 'none';
    guardar_cambios.style.display='none';
    return nodos;
    
}


const borrarLista=()=>{
    localStorage.clear();
    guardar_cambios.style.display='none';
    borrar_lista.style.display='none';
    limpiar();
    boton_Mostrar.style.display='flex';
}