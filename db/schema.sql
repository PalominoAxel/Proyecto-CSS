-- Esquema de la base de datos "inpelsa" (PostgreSQL).
-- Crear la BD una sola vez:   CREATE DATABASE inpelsa;
-- Aplicar este archivo:       psql -U postgres -d inpelsa -f db/schema.sql

CREATE TABLE IF NOT EXISTS reclamaciones (
    id                SERIAL PRIMARY KEY,
    -- Sección 1: Información personal
    tipo_documento    VARCHAR(10)  NOT NULL CHECK (tipo_documento IN ('DNI', 'CE', 'PASAPORTE', 'RUC')),
    numero_documento  VARCHAR(20)  NOT NULL,
    nombres           VARCHAR(100) NOT NULL,
    apellidos         VARCHAR(100) NOT NULL,
    departamento      VARCHAR(50)  NOT NULL,
    direccion         VARCHAR(255) NOT NULL,
    telefono          VARCHAR(20)  NOT NULL,
    correo            VARCHAR(150) NOT NULL,
    nombre_apoderado  VARCHAR(200),
    -- Sección 2: Bien o servicio contratado
    monto_reclamado   NUMERIC(12, 2) CHECK (monto_reclamado >= 0),
    descripcion_bien  TEXT         NOT NULL,
    -- Sección 3: Detalle de la reclamación
    tipo_reclamacion  VARCHAR(10)  NOT NULL CHECK (tipo_reclamacion IN ('QUEJA', 'RECLAMO')),
    detalle           TEXT         NOT NULL,
    pedido            TEXT         NOT NULL,
    creado_en         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contactos (
    id         SERIAL PRIMARY KEY,
    nombres    VARCHAR(100) NOT NULL,
    apellidos  VARCHAR(100) NOT NULL,
    empresa    VARCHAR(150),
    ruc        CHAR(11),
    correo     VARCHAR(150) NOT NULL,
    telefono   VARCHAR(20),
    mensaje    TEXT         NOT NULL,
    creado_en  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
