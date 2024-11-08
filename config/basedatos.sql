DROP DATABASE IF EXISTS RegistroEstudiante;
CREATE DATABASE IF NOT EXISTS RegistroEstudiante;
USE RegistroEstudiante;

CREATE TABLE Estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    fecha_registro DATE NOT NULL,
    semestre INT NOT NULL,
    edad INT NOT NULL
);