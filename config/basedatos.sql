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
    usuario INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE Visitas (
    id_visita INT AUTO_INCREMENT PRIMARY KEY,
    numero_cuenta INT,
    usuario INT,
    fecha_visita DATE NOT NULL,
    motivo VARCHAR(255),
    FOREIGN KEY (numero_cuenta) REFERENCES Estudiantes(numero_cuenta),
    FOREIGN KEY (usuario) REFERENCES Administradores(usuario)
);

