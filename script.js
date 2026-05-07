

// 1. Estructura de Datos

// Array de usuarios

let nextId = 1;

let usuarios = [
  { id: nextId++, nombre: "Juan Pérez",    edad: 30, rol: "Administrador", activo: true  },
  { id: nextId++, nombre: "Ana González",  edad: 25, rol: "Usuario",       activo: true  },
  { id: nextId++, nombre: "Carlos Muñoz",  edad: 40, rol: "Administrador", activo: false },
  { id: nextId++, nombre: "Valentina Soto",edad: 22, rol: "Usuario",       activo: true  },
  { id: nextId++, nombre: "Pedro Rodríguez",edad: 35, rol: "Administrador", activo: false },
  { id: nextId++, nombre: "Luisa Rodríguez",edad: 28, rol: "Usuario",       activo: true  }
];

// Estado del ordenamiento (toggle)
let ordenAscendente = true;

function validarFormulario(){
    const nombre = document.getElementById("input-nombre").value;
    const edad = document.getElementById("input-edad").value;
    const rol = document.getElementById("select-rol").value;

    let esValido = true;

    //Limpiar errores previos
    limpiarErrores();


    //Validar nombre
    if (nombre === "") {
        mostrarError("error-nombre", "input-nombre", "El nombre es obligatorio");
        esValido = false;
    }else if (nombre.length < 2) {
        mostrarError("error-nombre", "input-nombre", "El nombre debe tener al menos 2 caracteres");
        esValido = false;
    }

    //Validar edad
    const edadNum = parseInt(edad);
    if (edad === "") {
        mostrarError("error-edad", "input-edad", "La edad es obligatoria");
        esValido = false;
    }else if (isNaN(edadNum) || edadNum <= 0) {
        mostrarError("error-edad", "input-edad", "La edad debe ser un número mayor a 0");
        esValido = false;
    }else if (edadNum < 1 || edadNum > 120) {
        mostrarError("error-edad", "input-edad", "La edad debe estar entre 1 y 120");
        esValido = false;
    }

    //Validar rol
    if (rol === "") {
        mostrarError("error-rol", "select-rol", "El rol es obligatorio");
        esValido = false;
    }

    return esValido;
}

/** Muestra un mensaje de error y marca el input como inválido */
function mostrarError(idError, idInput, mensaje) {
    document.getElementById(idError).textContent = mensaje;
    document.getElementById(idInput).classList.add("input-error");
}

/** Limpia todos los mensajes de error y marca el input como válido */
function limpiarErrores() {
    const errores = ["error-nombre", "error-edad", "error-rol"];
    const inputs = ["input-nombre", "input-edad", "select-rol"];

    errores.forEach(id => {
        document.getElementById(id).textContent = "";
    });

    inputs.forEach(function(id)  {
        document.getElementById(id).classList.remove("input-error");
    });
}

// 3. Agregar Usuario

/*
Caputra los datos del formulario y los agrega a la lista de usuarios al arreglo usuarios.
*/
function agregarUsuario(){
    if (!validarFormulario()) return;

    const nombre = document.getElementById("input-nombre").value;
    const edad   = parseInt(document.getElementById("input-edad").value.trim());
    const rol    = document.getElementById("select-rol").value;

    const nuevoUsuario = {
        nombre: nombre,
        edad: edad,
        rol: rol,
        activo: true
    };

    usuarios.push(nuevoUsuario);

    // Limpiar el formulario
    document.getElementById("input-nombre").value = "";
    document.getElementById("input-edad").value = "";
    document.getElementById("select-rol").value = "";
    limpiarErrores();

    renderizar();
    mostrarToast('Usuario "${nombre}" agregado correctamente.');
}


/* 4. CambiarEstado (Activo / inactivo)
Alterna el campo activo del usuario en el indice recibido
*/       

function cambiarEstado(indice) {
    usuarios[indice].activo = usuarios[indice].activo ? false : true;

    const estado = usuarios[indice].activo ? "activo" : "inactivo";
    mostrarToast(`El usuario "${usuarios[indice].nombre}" ha sido ${estado}.`);  

    renderizar();
    
}

/* 5. Borrar Usuario
Elimina al usuario en el indice recibido
*/
function eliminarUsuario(indice) {
    const nombre = usuarios[indice].nombre;
    usuarios.splice(indice, 1);

    renderizar();
    mostrarToast('Usuario "${nombre}" eliminado correctamente.');
}

/* 6. Filtrar Usuario 
Lee el selector de filtro y retorna un arreglo con los usuarios filtrados.
*/

function filtrarUsuarios(){
    const filtro = document.getElementById("filtro-rol").value;

    switch (filtro) {
        case "Administrador":
            return usuarios.filter(user => user.rol === "Administrador");
        case "Usuario":
            return usuarios.filter(user => user.rol === "Usuario");
        default:
            return usuarios; //todos los usuarios.
    }
}

/*
7. Ordenar por Edad
Ordena el arreglo de usuarios por edad.
*/
function ordenarPorEdad() {
    if (ordenAscendente) {
        usuarios.sort((a, b) => a.edad - b.edad);
    } else {
        usuarios.sort((a, b) => b.edad - a.edad);
    }

    ordenAscendente = !ordenAscendente;

    const btnOrdenar = document.getElementById("btn-ordenar");
    btnOrdenar.textContent = ordenAscendente ? "↕ Edad" : "↔ Edad";
    btnOrdenar.classList.toggle("active", ordenAscendente);

    renderizar();
}

/* 
8. Actualizar Contadores
Calcula y actualiza en el DOM la cantidad de usuarios y la cantidad de usuarios activos, inactivos y el total.
*/

function actualizarContadores() {
    const activos = usuarios.filter(user => user.activo).length;
    const inactivos = usuarios.filter(user => !user.activo).length;
    const admins = usuarios.filter(user => user.rol === "Administrador").length;
    const total = usuarios.length;

    document.getElementById("count-activos").textContent = activos;
    document.getElementById("count-inactivos").textContent = inactivos;
    document.getElementById("count-admins").textContent = admins;
    document.getElementById("count-total").textContent = total;

    document.getElementById("total-badge").textContent = total === 1 ? `${total} usuario registrado` : `${total} usuarios registrados`;
}

/*
9. Mostrar Usuarios en la tabla
Genera las filas de la tabla dinámicamente usando createElement.
*/

function mostrarUsuarios(lista) {
    const tbody = document.getElementById("tabla-body");
    const emptyState = document.getElementById("empty-state");
    const tableWrap = tbody.closest(".table-wrapper");

    //Limpiar filas anteriores
    tbody.innerHTML = "";

    if (lista.length === 0) {
    emptyState.style.display = "block";
    tableWrap.style.display  = "none";
    return;
  }
 
  emptyState.style.display = "none";
  tableWrap.style.display  = "block";
 
  lista.forEach(function(usuario, i) {
    // Obtener índice real en el arreglo original (para cambiarEstado/eliminar)
    const indexReal = usuarios.findIndex(function(user) {
        return user.id === usuario.id;
    });
 
    // --- Fila ---
    const fila = document.createElement("tr");
    fila.classList.add("fila-nueva");
 
    // Celda: número
    const tdIndex = document.createElement("td");
    tdIndex.classList.add("td-index");
    tdIndex.textContent = i + 1;
 
    // Celda: nombre
    const tdNombre = document.createElement("td");
    tdNombre.classList.add("td-nombre");
    tdNombre.textContent = usuario.nombre;
 
    // Celda: edad
    const tdEdad = document.createElement("td");
    tdEdad.classList.add("td-edad");
    tdEdad.textContent = usuario.edad;
 
    // Celda: rol (badge)
    const tdRol = document.createElement("td");
    const badgeRol = document.createElement("span");
    badgeRol.classList.add("badge-rol");
    badgeRol.classList.add(
      usuario.rol === "Administrador" ? "badge-administrador" : "badge-usuario"
    );
    badgeRol.textContent = usuario.rol;
    tdRol.appendChild(badgeRol);
 
    // Celda: estado (badge)
    const tdEstado = document.createElement("td");
    const badgeEstado = document.createElement("span");
    badgeEstado.classList.add("badge-estado");
    badgeEstado.classList.add(usuario.activo ? "badge-activo" : "badge-inactivo");
    badgeEstado.textContent = usuario.activo ? "Activo" : "Inactivo";
    tdEstado.appendChild(badgeEstado);
 
    // Celda: acciones
    const tdAcciones = document.createElement("td");
    const divAcciones = document.createElement("div");
    divAcciones.classList.add("td-acciones");
 
    // Botón toggle estado
    const btnToggle = document.createElement("button");
    btnToggle.classList.add("btn-accion");
    btnToggle.classList.add(usuario.activo ? "btn-toggle-activo" : "btn-toggle-inactivo");
    btnToggle.textContent = usuario.activo ? "Desactivar" : "Activar";
    btnToggle.onclick = function() { cambiarEstado(indexReal); };
 
    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-accion", "btn-eliminar");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = function() { eliminarUsuario(indexReal); };
 
    divAcciones.appendChild(btnToggle);
    divAcciones.appendChild(btnEliminar);
    tdAcciones.appendChild(divAcciones);
 
    // Armar fila
    fila.appendChild(tdIndex);
    fila.appendChild(tdNombre);
    fila.appendChild(tdEdad);
    fila.appendChild(tdRol);
    fila.appendChild(tdEstado);
    fila.appendChild(tdAcciones);
 
    tbody.appendChild(fila);
  });
}

/* 
10 Renderizar -  Función Central
Función principal que sincroniza todo:
- Filtra
- Mostrar Usuarios
- Actualizar Contadores
Se llamada cada ves que el arreglo cambia.
*/

function renderizar() {
    const listaFiltrada = filtrarUsuarios();
    mostrarUsuarios(listaFiltrada);
    actualizarContadores();
}

/* 
11. Notificación
Muestra una notificación temporal en el DOM.
*/

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 2800);
}

/* 
12. Inicialización
Renderiza al cargar la página
*/

document.addEventListener("DOMContentLoaded", function() {
    renderizar();
});