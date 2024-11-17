DROP DATABASE IF EXISTS RegistroEstudiante;
CREATE DATABASE IF NOT EXISTS RegistroEstudiante;
USE RegistroEstudiante;

CREATE TABLE Estudiantes (
    numero_cuenta INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_nacimiento DATE,
    semestre INT NOT NULL,
    edad INT NOT NULL
);

CREATE TABLE Administradores (
    id_administrador INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE Visitas (
    id_visita INT AUTO_INCREMENT PRIMARY KEY,
    numero_cuenta INT,
    id_administrador INT,
    fecha_visita DATE NOT NULL,
    motivo VARCHAR(255),
    FOREIGN KEY (numero_cuenta) REFERENCES Estudiantes(numero_cuenta),
    FOREIGN KEY (id_administrador) REFERENCES Administradores(id_administrador)
);