# Utilización de AI para el proyecto

Durante el desarrollo del proyecto se empleo ChatGPT en los siguientes 2 aspectos:

### 1. Construcción de scripts SQL para base de datos

A partir del modelo entidad relación alojado en el archivo:
[diagrama-entidad-relacion.txt](src/db/diagrams/diagrama-entidad-relacion.txt)

Se hace uso de ChatGPT para la generación de los scripts alojados en la carpeta [migrations](src/db/migrations/).

Entregando tanto los scripts para la construcción de las tablas:

```sql

USE racional_db;

-- Tabla User
CREATE TABLE User (
    id CHAR(36) PRIMARY KEY NOT NULL,
    rut VARCHAR(9) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE
);


...(continua)
```

Como también para generar registros de prueba en cada una de las tablas:

```sql
-- Insertar datos de ejemplo

-- Usuarios
INSERT INTO User (id, rut, name, username, email, passwordHash, enabled) VALUES
(UUID(), '12345678K', 'Carlos Rivas', 'crivas', 'crivas@example.com', MD5('password1'), TRUE),
(UUID(), '23456789K', 'María Torres', 'mtorres', 'mtorres@example.com', MD5('password2'), TRUE),
(UUID(), '34567890K', 'Juan Pérez', 'jperez', 'jperez@example.com', MD5('password3'), TRUE),
(UUID(), '45678901K', 'Lucía Gómez', 'lgomez', 'lgomez@example.com', MD5('password4'), TRUE),
(UUID(), '56789012K', 'Andrés Soto', 'asoto', 'asoto@example.com', MD5('password5'), TRUE);


...(continua)
```

Se tiene especial cuidado y revisión en que los datos entregados respeten las relaciones entre las tablas y las restricciones sobre los propios datos. Por ejemplo, que las transacciones registradas por usuario en la tabla "Transaction" coincida con el saldo del usuario alojado en la columna "balance" de la tabla "Portfolio".

### 2. Generación de documentación

Para la generación del archivo [README.md](README.md) se empleo ChatGPT para dos situación:

1. La generación de la descripción de los endpoints se solicita en un prompt entregando la documentación ya generada por Swagger en formato json, obtenida del URL: http://localhost:3000/api-json.

2. Utilizando el texto del diagrama de entidad relación mencionado en el punto anterior ([1. Construcción de scripts SQL (...)](#1-construcción-de-scripts-sql-para-base-de-datos)), se utiliza para generar la descripción resumida de las tablas y sus relaciones.
