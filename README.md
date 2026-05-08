# Panel de Gestión de Usuarios
### EVA 2 — Programación Frontend | INACAP Valparaíso

---

## Descripción

Aplicación web interactiva para administrar usuarios internos de una organización. Permite registrar, visualizar, filtrar, ordenar y eliminar usuarios de forma dinámica desde el navegador, aplicando lógica de programación, estructuras de datos y manipulación del DOM.

---

## Funcionalidades

- **Registro de usuarios** con validación de campos (nombre, edad, rol)
- **Tabla dinámica** generada con `createElement` — sin innerHTML
- **Cambiar estado** Activo / Inactivo por usuario
- **Filtro por rol** — Todos / Administrador / Usuario
- **Ordenar por edad** — ascendente y descendente
- **Eliminar usuarios**
- **Contadores** de usuarios activos, inactivos, administradores y total
- **Notificaciones toast** al realizar acciones
- **Diseño responsive** con Bootstrap 5 + CSS personalizado

---

## Estructura del proyecto

```
panel-gestion-usuarios/
├── index.html          # Estructura HTML principal
├── script.js           # Lógica JavaScript modular
├── styles.css          # Estilos personalizados
└── bootstrap.min.css   # Bootstrap 5 local
```

---

## Funciones principales (`script.js`)

| Función | Descripción |
|---|---|
| `validarFormulario()` | Valida los campos antes de agregar |
| `agregarUsuario()` | Captura el formulario y agrega al arreglo |
| `cambiarEstado(indice)` | Alterna Activo / Inactivo |
| `eliminarUsuario(indice)` | Elimina con `splice()` |
| `filtrarUsuarios()` | Filtra por rol con `switch` + `array.filter` |
| `ordenarPorEdad()` | Ordena el arreglo asc/desc |
| `actualizarContadores()` | Actualiza las estadísticas en el DOM |
| `mostrarUsuarios(lista)` | Renderiza la tabla con `createElement` |
| `renderizar()` | Función central — sincroniza todo |
| `mostrarToast(mensaje)` | Muestra notificación temporal |

---

## Uso de Inteligencia Artificial

Para el desarrollo de esta EVA utilicé **Claude (Anthropic)** como herramienta de apoyo.

**¿Qué le pedí?**
- Generar la estructura base del proyecto (HTML, CSS y JS) siguiendo los requerimientos del enunciado
- Organizar el código de forma modular con las funciones indicadas
- Revisar y corregir bugs encontrados durante el desarrollo

**¿Qué bugs corrigió y qué aprendí?**

Durante el proceso encontré varios errores que corregí con ayuda de Claude y entendiendo el por qué de cada uno:

1. `agregarUsuario()` llamaba a `validarUsuario()` que no existía — se corrigió a `validarFormulario()`
2. Los template literals usaban comillas simples `'...'` en vez de backticks `` `...` ``, por lo que el nombre del usuario no se interpolaba correctamente
3. La función de notificación tenía dos nombres distintos (`mostrarMensaje` / `mostrarNotificacion`) — se unificó como `mostrarToast()`
4. `mostrarError()` agregaba la clase `is-invalid` pero `limpiarErrores()` intentaba remover `input-error` — clases inconsistentes que impedían limpiar el estilo de error
5. El toggle de Activo/Inactivo fallaba porque `indexOf` no encontraba correctamente el objeto tras reordenar el arreglo — se solucionó agregando un `id` único a cada usuario y usando `findIndex` comparando por `id`

**¿Qué mejoras apliqué?**
- Nombres de funciones en español descriptivo (`cambiarEstado`, `eliminarUsuario`) para mayor legibilidad
- Uso de `id` único por usuario para rastreo seguro en el arreglo
- Comentarios explicativos en cada función

---

## Tecnologías

- HTML5
- CSS3
- JavaScript ES6 (vanilla)
- Bootstrap 5

---

*Desarrollado por Sebastián Pasmiño — Analista Programador, 2° año INACAP Valparaíso*
