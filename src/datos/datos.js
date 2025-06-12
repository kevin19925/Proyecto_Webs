
// Lista de usuarios con contraseñas y otros detalles
const usuarios = [
  {
    id: 1,
    nombre: "Kevin",
    apellido: "Quishpe",
    tipo: "usuario", // Tipo de usuario: "usuario" o "administrador"
    facultad: "Facultad de Ingeniería Eléctrica y Electrónica",
    correo: "kevin.quishpe@epn.edu.ec",
    contrasena: "12345678", // Contraseña para la simulación
    telefono: "0987654321", // Teléfono del usuario
    fechaNacimiento: "2000-07-11", // Fecha de nacimiento del usuario
    Direccion: "Av. Universitaria 123", // Dirección del usuario
  },
  {
    id: 2,
    nombre: "Santiago",
    apellido: "Pila",
    tipo: "usuario", // Tipo de usuario: "usuario" o "administrador"
    facultad: "Facultad de Ingeniería Eléctrica y Electrónica",
    correo: "santiago.pila@epn.edu.ec",
    contrasena: "87654321", // Contraseña para la simulación
    telefono: "0987245607", // Teléfono del usuario
    fechaNacimiento: "2001-09-28", // Fecha de nacimiento del usuario
    Direccion: "Av. Universitaria 123", // Dirección del usuario
  },
  {
    id: 3,
    nombre: "Fabricio",
    apellido: "Tixe",
    tipo: "usuario", // Tipo de usuario: "usuario" o "administrador"
    facultad: "Facultad de Ingeniería Eléctrica y Electrónica",
    correo: "fabricio.tixe@epn.edu.ec",
    contrasena: "12345678", // Contraseña para la simulación
    telefono: "0939228473", // Teléfono del usuario
    fechaNacimiento: "2002-06-10", // Fecha de nacimiento del usuario
    Direccion: "Av. Colon 568", // Dirección del usuario
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "García",
    tipo: "usuario", // Tipo de usuario: "usuario" o "administrador"
    facultad: "ESFOT",
    correo: "ana.garcia@epn.edu.ec",
    contrasena: "12345678", // Contraseña para la simulación
    telefono: "0987654321", // Teléfono del usuario
    fechaNacimiento: "1995-05-15", // Fecha de nacimiento del usuario
    Direccion: "Av. Universitaria 123", // Dirección del usuario
  },
  {
    id: 5,
    nombre: "Luis",
    apellido: "Torres",
    tipo: "usuario",
    facultad: "FIS",
    correo: "luis.torres@epn.edu.ec",
    contrasena: "password123", // Contraseña para la simulación
    telefono: "0987654322", // Teléfono del usuario
    fechaNacimiento: "1994-08-20", // Fecha de nacimiento del usuario
    Direccion: "Calle Ejemplo 456", // Dirección del usuario
  },
  {
    id: 6,
    nombre: "Administrador",
    apellido: "Sistema",
    tipo: "administrador", // Rol administrador
    facultad: "FIS", // Agregar escuela aunque no es relevante para el administrador
    correo: "admin@epn.edu.ec",
    contrasena: "admin123", // Contraseña del administrador
    telefono: "0987654323", // Teléfono del administrador
    fechaNacimiento: "1980-01-01", // Fecha de nacimiento del administrador
    Direccion: "Av. Principal 789", // Dirección del administrador
  },
];

// Lista de facultades
const facultades = [
  { nombre: "Facultad de Ciencias" },
  { nombre: "Facultad de Ingeniería Civil y Ambiental" },
  { nombre: "Facultad de Ingeniería Eléctrica y Electrónica" },
  { nombre: "Facultad de Ingeniería Mecánica" },
  { nombre: "Facultad de Ingeniería en Geología y Petróleos" },
  { nombre: "Facultad de Ingeniería de Sistemas" },
  { nombre: "Facultad de Administración de Empresas" },
  { nombre: "Facultad de Ciencias Sociales y Humanas" },
  { nombre: "Escuela de Formación de Tecnólogos" }
];

// Lista de canchas Disponibles con su estado (Disponible o en mantenimiento)
const canchas = [
  {
    id: 1,
    nombre: "Cancha de Fútbol 1",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 5, // División de la cancha grande
    tipo: "fútbol",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbSsqJa8sr-dC-AiLAeCaA_BbsR5iLN09Rw&s",
  },
  {
    id: 2,
    nombre: "Cancha de Fútbol 2",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 5, // División de la cancha grande
    tipo: "fútbol",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbSsqJa8sr-dC-AiLAeCaA_BbsR5iLN09Rw&s",
  },
  {
    id: 3,
    nombre: "Cancha de Fútbol 3",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 5, // División de la cancha grande
    tipo: "fútbol",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbSsqJa8sr-dC-AiLAeCaA_BbsR5iLN09Rw&s",
  },
  {
    id: 4,
    nombre: "Cancha de Fútbol 4",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 5, // División de la cancha grande
    tipo: "fútbol",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbSsqJa8sr-dC-AiLAeCaA_BbsR5iLN09Rw&s",
  },
  {
    id: 5,
    nombre: "Cancha de Fútbol Sala",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 10,
    tipo: "futsal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbSsqJa8sr-dC-AiLAeCaA_BbsR5iLN09Rw&s",
  },
  {
    id: 6,
    nombre: "Cancha de Básquet 1",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 10,
    tipo: "básquet",
    img: "../../src/img/icono_reservacio_basquet.jpg",
  },
  {
    id: 7,
    nombre: "Cancha de Básquet 2",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 10,
    tipo: "básquet",
    img: "../../src/img/icono_reservacio_basquet.jpg",
  },
  {
    id: 8,
    nombre: "Cancha de Básquet 3",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 10,
    tipo: "básquet",
    img: "../../src/img/icono_reservacio_basquet.jpg",
  },
  {
    id: 9,
    nombre: "Cancha de Vóley 1",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 8,
    tipo: "vóley",
    img: "../../src/img/icono_reserv_voley.jpg",
  },
  {
    id: 10,
    nombre: "Cancha de Vóley 2",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 8,
    tipo: "vóley",
    img: "../../src/img/icono_reserv_voley.jpg",
  },
  {
    id: 11,
    nombre: "Cancha de Vóley 3",
    ubicacion: "Estadio de Fútbol",
    estado: "Disponible",
    capacidad: 8,
    tipo: "vóley",
    img: "../../src/img/icono_reserv_voley.jpg",
  },
];

// Lista de horarios Disponibles para reservas
const horarios = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

// Lista de reservas realizadas
const reservas = [
  {
    id: 1,
    usuarioId: 1, // ID de usuario (Ana)
    canchaId: 1, // Estadio de Fútbol
    fecha: "2025-06-12",
    hora: "10:00",
    duracion: "2h",
    estado: "Reservada", // Estado de la reserva (pendiente, confirmada, cancelada)
  },
  {
    id: 2,
    usuarioId: 2, // ID de usuario (Luis)
    canchaId: 3, // Cancha de Básquet
    fecha: "2025-06-13",
    hora: "15:00",
    duracion: "1h",
    estado: "Reservada", // Reserva pendiente
  },
];

// Acciones posibles para el administrador
const accionesAdmin = [
  "suspender cancha",
  "habilitar cancha",
  "editar cancha",
  "agregar usuario",
  "suspender usuario",
  "eliminar reserva",
  "ver reportes",
];

// Roles definidos en el sistema (solo 'usuario' y 'administrador')
const rolesSistema = ["usuario", "administrador"];

// Lista de espacios (canchas) con detalles sobre su nombre, edificio, capacidad, etc.
const espacios = [
  {
    id: 1,
    nombre: "Estadio de Fútbol",
    edificio: "Edificio 30",
    capacidad: 22,
    tipo: "fútbol",
    descripcion:
      "Selecciona entre una de las 4 canchas Disponibles distribuidas a lo ancho del estadio de la EPN. Puedes utilizar estos espacios siguiendo las normas de uso de estos espacios.",
    img: "../../src/img/bg_signup.jpg", // Imagen representativa de la cancha
  },
  {
    id: 2,
    nombre: "Cancha de Fútbol Sala",
    edificio: "Edificio 33",
    capacidad: 10,
    tipo: "futsal",
    descripcion:
      "Cancha ubicada en el Ágora de Tecnólogos de la EPN, en la que puedes realizar deportes como fútbol sala y tenis, adecuado para un tiempo de recreación activa.",
    img: "../src/img/icono_reserv_futsala.jpg", // Imagen representativa de la cancha
  },
  {
    id: 3,
    nombre: "Cancha de Básquet",
    edificio: "Edificio 31",
    capacidad: 10,
    tipo: "básquet",
    descripcion:
      "Selecciona entre una de las dos canchas de básquet Disponibles en la EPN. Cuentan con adecuaciones para tablero electrónico, donde podrás realizar actividades recreativas.",
    img: "../../src/img/icono_reservacio_basquet.jpg",
  },

  {
    id: 4,
    nombre: "Cancha de voly",
    edificio: "Edificio 31",
    capacidad: 6,
    tipo: "vóley",
    descripcion:
      "Selecciona entre una de las dos canchas de voly Disponibles en la EPN. Cuentan con adecuaciones para tablero electrónico, donde podrás realizar actividades recreativas.",
    img: "../../src/img/icono_reserv_voley.jpg",
  },
];

export {
  usuarios,
  facultades,
  canchas,
  horarios,
  reservas,
  accionesAdmin,
  rolesSistema,
  espacios,
};
