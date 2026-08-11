--creación de base de datos
create database sistema_cine;

--Tabla pelicula
create table pelicula (
    id_pelicula serial primary key,
    titulo varchar(100) not null,
    genero varchar(50) not null,
    clasificacion varchar(10) not null,
    fecha_estreno date not null,
    sinopsis text
);
--Tabla sala
create table sala (
    id_sala serial primary key,
    numero_sala int not null,
    capacidad int not null,
    tipo_sala varchar(30) not null
);
--Tabla asiento
create table asiento (
    id_asiento serial primary key,
    numero_asiento int not null,
    fila varchar(2) not null,
    tipo_asiento varchar(20) not null,
    id_sala int not null,

    constraint fk_sala
    foreign key (id_sala)
    references sala(id_sala)
);
--Tabla funcion
create table funcion (
    id_funcion serial primary key,
    fecha date not null,
    hora_inicio time not null,
    precio_base numeric(10,2) not null check (precio_base > 0),
    id_pelicula int not null,
    id_sala int not null,
    constraint fk_pelicula
    foreign key (id_pelicula)
    references pelicula(id_pelicula),
	
    constraint fk_sala_funcion
    foreign key (id_sala)
    references sala(id_sala)
);
--Tabla cliente
create table cliente (
    id_cliente serial primary key,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    telefono varchar(15),
    correo varchar(100)
);
--Tabla empleado
create table empleado (
    id_empleado serial primary key,
    nombre varchar(50) not null,
    cargo varchar(30) not null,
    usuario varchar(30) not null,
    contraseña varchar(50) not null
);
--Tabla producto
create table producto (
    id_producto serial primary key,
    nombre_producto varchar(100) not null,
    categoria varchar(50) not null,
    precio numeric(10,2) not null check (precio > 0),
    stock int not null check (stock >= 0)
);
--Tabla entrada
create table entrada (
    id_entrada serial primary key,
    precio numeric(10,2) not null,
    id_funcion int not null,
    id_asiento int not null,
    constraint fk_funcion
    foreign key (id_funcion)
    references funcion(id_funcion),

    constraint fk_asiento
    foreign key (id_asiento)
    references asiento(id_asiento)
);
--Tabla compra
create table compra (
    id_compra serial primary key,
    metodo_pago varchar(20) not null,
    fecha_venta date not null,
    total_venta numeric(10,2) not null,
    id_cliente int,
    id_empleado int,
    id_entrada int,
    constraint fk_cliente_compra
    foreign key (id_cliente)
    references cliente(id_cliente),

    constraint fk_empleado
    foreign key (id_empleado)
    references empleado(id_empleado),

    constraint fk_entrada
    foreign key (id_entrada)
    references entrada(id_entrada)
);
--Tabla detallecompra
create table detallecompra (
    id_detalle serial primary key,
    cantidad int not null check (cantidad > 0),
    precio_unitario numeric(10,2) not null,
    subtotal numeric(10,2) not null,
    id_compra int not null,
    id_producto int not null,
    constraint fk_compra
    foreign key (id_compra)
    references compra(id_compra),

    constraint fk_producto
    foreign key (id_producto)
    references producto(id_producto)
);

--Insertar peliculas
insert into pelicula(titulo, genero, clasificacion, fecha_estreno, sinopsis) values
('Backrooms', 'Terror', '14A', '2026-06-04', 'Un grupo de jóvenes queda atrapado en un laberinto infinito de habitaciones extrañas.'),
('Michael', 'Biografía', 'ATP', '2026-06-04', 'Película basada en la vida y carrera de Michael Jackson.'),
('Star Wars: The Mandalorian and Grogu', 'Ciencia Ficción', 'ATP', '2026-06-04', 'Nueva aventura galáctica protagonizada por Din Djarin y Grogu.'),
('Scary Movie', 'Comedia', '14A', '2026-06-04', 'Regreso de la famosa saga de parodias de películas de terror.'),
('Toy Story 5', 'Animación', 'ATP', '2026-06-18', 'Woody, Buzz y sus amigos enfrentan una nueva aventura.'),
('El Día de la Revelación', 'Ciencia Ficción', 'TBC', '2026-06-11', 'La humanidad descubre que no está sola en el universo.'),
('Supergirl', 'Acción', 'TBC', '2026-06-25', 'Kara Zor-El emprende una aventura para hacer justicia en la galaxia.');

--Insertar salas
insert into sala(numero_sala, capacidad, tipo_sala) values
(1, 100, '2D'),
(2, 80, '3D'),
(3, 120, 'IMAX');

--Insertar asientos
insert into asiento(numero_asiento, fila, tipo_asiento, id_sala) values
(1, 'A', 'normal', 1),
(2, 'A', 'normal', 1),
(3, 'B', 'preferencial', 2),
(4, 'B', 'normal', 2),
(5, 'C', 'vip', 3);

--Insertar funciones
insert into funcion(fecha, hora_inicio, precio_base, id_pelicula, id_sala) values
('2026-06-10', '18:00', 50.00, 1, 1),
('2026-06-10', '20:30', 55.00, 1, 2),
('2026-06-11', '17:00', 45.00, 2, 1),
('2026-06-11', '19:30', 50.00, 2, 2),
('2026-06-12', '18:00', 60.00, 3, 3),
('2026-06-12', '21:00', 40.00, 4, 1),
('2026-06-13', '16:00', 45.00, 5, 2),
('2026-06-13', '20:00', 50.00, 6, 3),
('2026-06-14', '19:00', 55.00, 7, 1);

--Insertar clientes
insert into cliente(nombre, apellido, telefono, correo) values
('Luis', 'Fernandez', '70511111', 'luisf@gmail.com'),
('Maria', 'Gomez', '70622222', 'mariag@gmail.com'),
('Jose', 'Torrez', '70733333', 'joset@gmail.com'),
('Carla', 'Mendoza', '70844444', 'carlam@gmail.com'),
('Daniel', 'Lopez', '70955555', 'daniell@gmail.com'),
('Fernanda', 'Castro', '71066666', 'fernandac@gmail.com'),
('Miguel', 'Salazar', '71177777', 'miguels@gmail.com'),
('Paola', 'Rios', '71288888', 'paolar@gmail.com');

--Insertar empleados
insert into empleado(nombre, cargo, usuario, contraseña) values
('Pedro Vargas', 'cajero', 'pedrov', '1234'),
('Lucia Fernandez', 'taquilla', 'luciaf', 'abcd'),
('Andres Molina', 'seguridad', 'andresm', 'pass1'),
('Sofia Rojas', 'limpieza', 'sofiar', 'pass2'),
('Diego Castro', 'cajero', 'diegoc', '1234'),
('Valeria Quiroga', 'supervisor', 'valeriaq', 'admin1'),
('Jorge Salinas', 'proyeccionista', 'jorges', 'cine123'),
('Camila Torres', 'taquilla', 'camilat', 'venta1');

--Insertar productos
insert into producto(nombre_producto, categoria, precio, stock) values
('palomitas', 'alimento', 30.00, 50),
('refresco', 'bebida', 15.00, 100),
('nachos', 'alimento', 25.00, 40);

--Insertar entradas
insert into entrada(precio, id_funcion, id_asiento) values
(50.00, 1, 1),
(50.00, 1, 2),
(55.00, 2, 3),
(45.00, 3, 1),
(50.00, 4, 2),
(60.00, 5, 5),
(40.00, 6, 1),
(45.00, 7, 3),
(50.00, 8, 5),
(55.00, 9, 2);

--Insertar compras
insert into compra(metodo_pago, fecha_venta, total_venta, id_cliente, id_empleado, id_entrada) values
('efectivo', '2026-06-10', 80.00, 1, 1, 1),
('tarjeta', '2026-06-10', 55.00, 2, 1, 3),
('qr', '2026-06-11', 60.00, 3, 2, 6),
('efectivo', '2026-06-12', 40.00, 1, 2, 7),
('tarjeta', '2026-06-13', 95.00, 2, 1, 9);

--Insertar detallecompra
insert into detallecompra(cantidad, precio_unitario, subtotal, id_compra, id_producto) values
(2, 30.00, 60.00, 1, 1),
(1, 15.00, 15.00, 1, 2),
(1, 25.00, 25.00, 2, 3),
(2, 30.00, 60.00, 3, 1),
(1, 15.00, 15.00, 4, 2),
(2, 30.00, 60.00, 5, 1),
(1, 25.00, 25.00, 5, 3);

--7.1 Consultas básicas
-- SELECT
--select * from pelicula;
-- WHERE
--select * from pelicula where genero = 'Acción';
-- ORDER BY
--select * from funcion order by fecha desc;

--7.2 Consultas avanzadas
--JOIN
--select funcion.id_funcion, pelicula.titulo,
--sala.numero_sala, funcion.fecha, funcion.hora_inicio from funcion
--join pelicula on funcion.id_pelicula = pelicula.id_pelicula
--join sala on funcion.id_sala = sala.id_sala order by funcion.fecha;
--detalle completo de compras
--select compra.id_compra, cliente.nombre, empleado.nombre as empleado,+
--entrada.id_entrada, compra.total_venta, compra.fecha_venta from compra
--join cliente on compra.id_cliente = cliente.id_cliente
--join empleado on compra.id_empleado = empleado.id_empleado
--join entrada on compra.id_entrada = entrada.id_entrada order by compra.id_compra;

--GROUP BY
--select pelicula.titulo, count(funcion.id_funcion) as total_funciones
--from funcion join pelicula on funcion.id_pelicula = pelicula.id_pelicula
--group by pelicula.titulo order by pelicula.titulo;

--HAVING
--select pelicula.titulo, count(funcion.id_funcion) as total_funciones
--from funcion 
--join pelicula on funcion.id_pelicula = pelicula.id_pelicula
--group by pelicula.titulo having count(funcion.id_funcion) > 1;

--SUM
--select sum(total_venta) as total_general from compra;

--COUNT
--select count(*) as total_compras from compra;

--AVG
--select avg(precio) as precio_promedio from entrada;

--LIKE
--select * from cliente where lower(nombre) like 'a%';

--Procedimientos almacenados
--1. MOSTRAR CLIENTES
CREATE OR REPLACE PROCEDURE mostrar_clientes()
LANGUAGE plpgsql
AS $$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT nombre, apellido FROM cliente
    LOOP
        RAISE NOTICE '% %', reg.nombre, reg.apellido;
    END LOOP;
END;
$$;
--Prueba
CALL mostrar_clientes();
--2. TOTAL DE COMPRAS POR CLIENTE
CREATE OR REPLACE PROCEDURE total_compras_cliente(p_id INT)
LANGUAGE plpgsql
AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(total_venta)
    INTO total
    FROM compra
    WHERE id_cliente = p_id;
    RAISE NOTICE 'Total comprado: %', total;
END;
$$;
--Prueba
CALL total_compras_cliente(1);
--3. REGISTRAR VENTAS
create or replace procedure registrar_venta(
    p_id_cliente int,
    p_id_empleado int,
    p_id_entrada int,
    p_total numeric
)
language plpgsql
as $$
begin
    insert into compra(metodo_pago, fecha_venta, total_venta, id_cliente, id_empleado, id_entrada)
    values ('efectivo', current_date, p_total, p_id_cliente, p_id_empleado, p_id_entrada);
    raise notice 'venta registrada correctamente';
end;
$$;
--Prueba
call registrar_venta(1,1,1,100);
--4. VERIFICAR ASIENTOS DISPONIBLES POR SALA
create or replace procedure verificar_asientos(p_id_funcion int)
language plpgsql
as $$
declare
    reg record;
begin
    for reg in
        select a.id_asiento, a.fila, a.numero_asiento
        from asiento a
        where a.id_asiento not in (
            select en.id_asiento
            from entrada en
            where en.id_funcion = p_id_funcion
        )
    loop
        raise notice 'asiento disponible: fila % numero %', reg.fila, reg.numero_asiento;
    end loop;
end;
$$;
--Prueba
call verificar_asientos(1);

--Triggers
--1. VALIDAR PRECIO DE PRODUCTO
CREATE OR REPLACE FUNCTION fn_validar_precio()
RETURNS TRIGGER
AS $$
BEGIN
    IF NEW.precio < 0 THEN
        RAISE NOTICE 'Precio no valido';
        RETURN NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tg_validar_precio
BEFORE INSERT OR UPDATE ON producto
FOR EACH ROW
EXECUTE FUNCTION fn_validar_precio();
--2. CONTROL DE STOCK
create or replace function fn_control_stock()
returns trigger as $$
begin
    if (select stock from producto where id_producto = new.id_producto) < new.cantidad then
        raise exception 'stock insuficiente';
    end if;
    update producto
    set stock = stock - new.cantidad
    where id_producto = new.id_producto;
    return new;
end;
$$ language plpgsql;

create trigger trg_control_stock
before insert on detallecompra
for each row
execute function fn_control_stock();

--Vistas
--VISTA 1: DETALLE DE COMPRAS
CREATE OR REPLACE VIEW vista_compras AS
SELECT compra.id_compra, cliente.nombre, producto.nombre_producto,
       detallecompra.cantidad, detallecompra.subtotal
FROM compra
JOIN cliente ON compra.id_cliente = cliente.id_cliente
JOIN detallecompra ON compra.id_compra = detallecompra.id_compra
JOIN producto ON detallecompra.id_producto = producto.id_producto;
--Prueba
SELECT * FROM vista_compras;
--VISTA 2: TOTAL POR CLIENTE
CREATE OR REPLACE VIEW vista_total_clientes AS
SELECT cliente.nombre, SUM(compra.total_venta) AS total
FROM cliente
JOIN compra ON cliente.id_cliente = compra.id_cliente
GROUP BY cliente.nombre;
--Prueba
SELECT * FROM vista_total_clientes;
--VISTA 3: VENTAS COMPLETAS
create or replace view vista_ventas_completas as
select 
    c.id_compra,
    cl.nombre as cliente_nombre,
    cl.apellido as cliente_apellido,
    e.nombre as empleado,
    p.titulo as pelicula,
    s.numero_sala,
    f.fecha,
    f.hora_inicio,
    c.metodo_pago,
    c.fecha_venta,
    c.total_venta,
    a.fila,
    a.numero_asiento
from compra c
join empleado e on c.id_empleado = e.id_empleado
left join cliente cl on c.id_cliente = cl.id_cliente
left join entrada en on c.id_entrada = en.id_entrada
left join funcion f on en.id_funcion = f.id_funcion
left join pelicula p on f.id_pelicula = p.id_pelicula
left join sala s on f.id_sala = s.id_sala
left join asiento a on en.id_asiento = a.id_asiento
ORDER BY c.fecha_venta DESC;
--Prueba
select * from vista_ventas_completas;
--VISTA 4: PRODUCTOS MÁS VENDIDOS
create or replace view vista_productos_mas_vendidos as
select 
    pr.nombre_producto,
    pr.categoria,
    sum(d.cantidad) as total_vendido,
    sum(d.subtotal) as ingreso_total
from detallecompra d
join producto pr on d.id_producto = pr.id_producto
group by pr.nombre_producto, pr.categoria
order by total_vendido desc;
--Prueba
select * from vista_productos_mas_vendidos;

--Indices
--1:
CREATE INDEX idx_cliente_nombre ON cliente(nombre);
--2:
create index idx_funcion_fecha on funcion(fecha);
--3:
create index idx_compra_fecha on compra(fecha_venta);
--4:
CREATE INDEX idx_producto_categoria ON producto(categoria);

--CONSULTA OPTIMIZADA USANDO ÍNDICE
SELECT * FROM cliente
WHERE nombre = 'Juan';

-- Verificar que existe el procedimiento
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'registrar_venta';