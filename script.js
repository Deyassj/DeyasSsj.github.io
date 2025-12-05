// Obtener referencias a los elementos HTML
const inputBox = document.getElementById("input-box");
const listaContenedor = document.getElementById("lista-contenedor");

// Función para AGREGAR una nueva tarea
function agregarTarea() {
    if (inputBox.value === '') {
        alert("¡Debes escribir algo!");
    } else {
        // 1. Crear el nuevo elemento de la lista (<li>)
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        
        // 2. Crear el botón/ícono de eliminación (<span>) con el símbolo '×'
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        
        // 3. Agregar el span al li
        li.appendChild(span);
        
        // 4. Agregar el li a la lista principal (<ul>)
        listaContenedor.appendChild(li);
    }
    
    // Limpiar el campo de entrada
    inputBox.value = "";
    guardarDatos();
}

// Escuchar clics en la lista para MARCAR o ELIMINAR tareas
listaContenedor.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        // Alternar la clase 'checked' (marcar/desmarcar)
        e.target.classList.toggle("checked");
        // Aseguramos que la clase estática 'completada' también se pueda desmarcar si la usas
        e.target.classList.remove("completada");
        guardarDatos();
    } 
    else if (e.target.tagName === "SPAN") {
        // Eliminar el elemento padre (el <li> completo)
        e.target.parentElement.remove();
        guardarDatos();
    }
}, false); 

// Función para guardar las tareas en el almacenamiento local del navegador
function guardarDatos() {
    // Guardamos el HTML de la lista para mantener las tareas
    localStorage.setItem("data", listaContenedor.innerHTML);
}

// Función para cargar las tareas guardadas al iniciar la página
function mostrarLista() {
    // Restauramos el HTML de la lista
    listaContenedor.innerHTML = localStorage.getItem("data");
}

// Cargar la lista al iniciar
mostrarLista();