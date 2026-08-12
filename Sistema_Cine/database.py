# database.py - Conexión y consultas a la base de datos

import psycopg2
from psycopg2 import extras
from config import DB_CONFIG

class Database:
    def __init__(self):
        self.connection = None
        self.cursor = None
    
    def connect(self):
        """Establece conexión con la base de datos"""
        try:
            self.connection = psycopg2.connect(**DB_CONFIG)
            self.cursor = self.connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
            print("✅ Conexión exitosa a la base de datos")
            return True
        except Exception as e:
            print(f"❌ Error de conexión: {e}")
            return False
    
    def disconnect(self):
        """Cierra la conexión"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
        print("🔌 Conexión cerrada")
    
    def execute_query(self, query, params=None):
        """Ejecuta una consulta y retorna resultados"""
        try:
            print(f"📝 SQL: {query[:100]}...")  # Muestra parte de la consulta
            if params:
                print(f"📝 PARAMS: {params}")
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
        
            if query.strip().upper().startswith('SELECT'):
                result = self.cursor.fetchall()
                print(f"📊 Filas obtenidas: {len(result) if result else 0}")
                return result
            else:
                self.connection.commit()
                print("✅ Consulta ejecutada con éxito")
                return True
        except Exception as e:
            print(f"❌ Error en consulta: {e}")
            self.connection.rollback()
            return None
    
    # ============================================
    # CRUD - CLIENTES
    # ============================================
    
    def get_all_clientes(self):
        """Obtiene todos los clientes"""
        return self.execute_query("SELECT * FROM cliente ORDER BY id_cliente;")
    
    def get_cliente_by_id(self, id_cliente):
        """Obtiene un cliente por su ID"""
        query = "SELECT * FROM cliente WHERE id_cliente = %s;"
        result = self.execute_query(query, (id_cliente,))
        return result
    
    def insert_cliente(self, nombre, apellido, telefono, correo):
        """Inserta un nuevo cliente"""
        query = """
        INSERT INTO cliente (nombre, apellido, telefono, correo)
        VALUES (%s, %s, %s, %s) RETURNING id_cliente;
        """
        return self.execute_query(query, (nombre, apellido, telefono, correo))
    
    def update_cliente(self, id_cliente, nombre, apellido, telefono, correo):
        """Actualiza un cliente"""
        query = """
        UPDATE cliente SET nombre=%s, apellido=%s, telefono=%s, correo=%s
        WHERE id_cliente=%s;
        """
        return self.execute_query(query, (nombre, apellido, telefono, correo, id_cliente))
    
    def delete_cliente(self, id_cliente):
        """Elimina un cliente"""
        return self.execute_query("DELETE FROM cliente WHERE id_cliente=%s;", (id_cliente,))
    
    # ============================================
    # CRUD - PRODUCTOS
    # ============================================
    
    def get_all_productos(self):
        """Obtiene todos los productos"""
        return self.execute_query("SELECT * FROM producto ORDER BY id_producto;")
    
    def get_producto_by_id(self, id_producto):
        """Obtiene un producto por su ID"""
        query = "SELECT * FROM producto WHERE id_producto = %s;"
        return self.execute_query(query, (id_producto,))
    
    def insert_producto(self, nombre_producto, categoria, precio, stock):
        """Inserta un nuevo producto"""
        query = """
        INSERT INTO producto (nombre_producto, categoria, precio, stock)
        VALUES (%s, %s, %s, %s) RETURNING id_producto;
        """
        return self.execute_query(query, (nombre_producto, categoria, precio, stock))
    
    def update_producto(self, id_producto, nombre_producto, categoria, precio, stock):
        """Actualiza un producto"""
        query = """
        UPDATE producto SET nombre_producto=%s, categoria=%s, precio=%s, stock=%s
        WHERE id_producto=%s;
        """
        return self.execute_query(query, (nombre_producto, categoria, precio, stock, id_producto))
    
    def delete_producto(self, id_producto):
        """Elimina un producto"""
        return self.execute_query("DELETE FROM producto WHERE id_producto=%s;", (id_producto,))
    
    # ============================================
    # CONSULTAS - FUNCIONES
    # ============================================
    
    def get_all_funciones(self):
        """Obtiene todas las funciones con detalles"""
        query = """
        SELECT 
            f.id_funcion,
            p.titulo AS pelicula,
            s.numero_sala,
            f.fecha,
            f.hora_inicio,
            f.precio_base
        FROM funcion f
        JOIN pelicula p ON f.id_pelicula = p.id_pelicula
        JOIN sala s ON f.id_sala = s.id_sala
        ORDER BY f.fecha, f.hora_inicio;
        """
        return self.execute_query(query)
    
    def get_funciones_disponibles(self):
        """Obtiene funciones con asientos disponibles"""
        query = """
        SELECT 
            f.id_funcion,
            p.titulo,
            f.fecha,
            f.hora_inicio,
            s.numero_sala,
            f.precio_base,
            (SELECT COUNT(*) FROM asiento a WHERE a.id_sala = s.id_sala) - 
            (SELECT COUNT(*) FROM entrada e WHERE e.id_funcion = f.id_funcion) 
            AS asientos_disponibles
        FROM funcion f
        JOIN pelicula p ON f.id_pelicula = p.id_pelicula
        JOIN sala s ON f.id_sala = s.id_sala
        WHERE (SELECT COUNT(*) FROM asiento a WHERE a.id_sala = s.id_sala) - 
              (SELECT COUNT(*) FROM entrada e WHERE e.id_funcion = f.id_funcion) > 0
        ORDER BY f.fecha, f.hora_inicio;
        """
        return self.execute_query(query)
    
    def get_entradas(self):
        """Obtiene todas las entradas"""
        query = """
        SELECT 
            e.id_entrada,
            p.titulo AS pelicula,
            s.numero_sala,
            f.fecha,
            f.hora_inicio,
            e.precio,
            a.fila || '-' || a.numero_asiento AS asiento
        FROM entrada e
        JOIN funcion f ON e.id_funcion = f.id_funcion
        JOIN pelicula p ON f.id_pelicula = p.id_pelicula
        JOIN sala s ON f.id_sala = s.id_sala
        JOIN asiento a ON e.id_asiento = a.id_asiento
        ORDER BY e.id_entrada;
        """
        return self.execute_query(query)
    
    def get_asientos_disponibles(self, id_funcion):
        """Obtiene asientos disponibles para una función"""
        query = """
        SELECT a.id_asiento, a.fila, a.numero_asiento, a.tipo_asiento
        FROM asiento a
        JOIN sala s ON a.id_sala = s.id_sala
        JOIN funcion f ON f.id_sala = s.id_sala
        WHERE f.id_funcion = %s
        AND NOT EXISTS (
            SELECT 1 FROM entrada e 
            WHERE e.id_asiento = a.id_asiento 
            AND e.id_funcion = f.id_funcion
        )
        ORDER BY a.fila, a.numero_asiento;
        """
        return self.execute_query(query, (id_funcion,))
    
    def get_peliculas(self):
        """Obtiene todas las películas"""
        return self.execute_query("SELECT id_pelicula, titulo FROM pelicula ORDER BY titulo;")
    
    def get_empleados(self):
        """Obtiene todos los empleados"""
        return self.execute_query("SELECT id_empleado, nombre, cargo FROM empleado;")
    
    # ============================================
    # VENTAS
    # ============================================
    
    def get_all_ventas(self):
        """Obtiene todas las ventas con detalles"""
        query = """
        SELECT 
            c.id_compra,
            cl.nombre AS cliente,
            e.nombre AS empleado,
            p.titulo AS pelicula,
            c.fecha_venta,
            c.total_venta,
            c.metodo_pago
        FROM compra c
        JOIN empleado e ON c.id_empleado = e.id_empleado
        LEFT JOIN cliente cl ON c.id_cliente = cl.id_cliente
        LEFT JOIN entrada en ON c.id_entrada = en.id_entrada
        LEFT JOIN funcion f ON en.id_funcion = f.id_funcion
        LEFT JOIN pelicula p ON f.id_pelicula = p.id_pelicula
        ORDER BY c.id_compra DESC;
        """
        return self.execute_query(query)
    
    def registrar_venta(self, id_cliente, id_empleado, id_entrada, metodo_pago, total):
        """Registra una nueva venta (sin productos)"""
        try:
            if not self.connection or self.connection.closed:
                self.connect()
        
                query = """
                INSERT INTO compra (metodo_pago, fecha_venta, total_venta, id_cliente, id_empleado, id_entrada)
                VALUES (%s, CURRENT_DATE, %s, %s, %s, %s)
                RETURNING id_compra;
                """
                self.cursor.execute(query, (metodo_pago, total, id_cliente, id_empleado, id_entrada))
                self.connection.commit()
        
                id_compra = self.cursor.fetchone()[0]
                print(f" Venta registrada con ID: {id_compra}")
            return True
        
        except Exception as e:
            self.connection.rollback()
            print(f" Error al registrar venta: {e}")
            return False
        
    def delete_venta(self, id_venta):
        """Elimina una venta por su ID"""
        try:
            query_detalle = "DELETE FROM detallecompra WHERE id_compra = %s;"
            self.execute_query(query_detalle, (id_venta,))

            query_compra = "DELETE FROM compra WHERE id_compra = %s;"
            result = self.execute_query(query_compra, (id_venta,))
        
            if result:
                print(f" Venta {id_venta} eliminada correctamente")
                return result
        except Exception as e:
            print(f" Error al eliminar venta: {e}")
            return None
        
    def get_venta_by_id(self, id_venta):
        """Obtiene una venta por su ID"""
        query = """
        SELECT id_compra, metodo_pago, fecha_venta, total_venta, id_cliente, id_empleado, id_entrada
        FROM compra 
        WHERE id_compra = %s;
        """
        result = self.execute_query(query, (id_venta,))
        return result

    def update_venta(self, id_venta, metodo_pago, id_cliente, id_empleado, id_entrada, total):
        """Actualiza una venta"""
        try:
            query = """
                UPDATE compra 
                    SET metodo_pago = %s, 
                    id_cliente = %s, 
                    id_empleado = %s, 
                    id_entrada = %s, 
                    total_venta = %s
                WHERE id_compra = %s;
            """
            self.execute_query(query, (metodo_pago, id_cliente, id_empleado, id_entrada, total, id_venta))
            print(f" Venta {id_venta} actualizada correctamente")
            return True
        except Exception as e:
            print(f" Error al actualizar venta: {e}")
            return False
    

    # CRUD - EMPLEADOS

    def get_all_empleados(self):
        query = """
        select id_empleado, nombre, cargo, usuario
        from empleado
        order by id_empleado desc;
        """
        return self.execute_query(query)

    def insert_empleado(self, nombre, cargo, usuario, contraseña):
        query = """
        insert into empleado(nombre, cargo, usuario, contraseña)
        values (%s, %s, %s, %s);
        """
        self.cursor.execute(query, (nombre, cargo, usuario, contraseña))
        self.connection.commit()

    def get_empleado_by_id(self, id_empleado):
        query = """
        SELECT id_empleado, nombre, cargo, usuario, contraseña
        FROM empleado
        WHERE id_empleado = %s;
        """
        result = self.execute_query(query, (id_empleado,))
        return result[0] if result else None

    def update_empleado(self, id, nombre, cargo, usuario):
        query = """
        update empleado
            set nombre = %s,
            cargo = %s,
            usuario = %s
        where id_empleado = %s;
        """
        self.cursor.execute(query, (nombre, cargo, usuario, id))
        self.connection.commit()

    def delete_empleado(self, id):
        query = "delete from empleado where id_empleado = %s;"
        self.cursor.execute(query, (id,))
        self.connection.commit()

    # VISTAS

    def get_vista_compras(self):
        """Vista 1: Detalle de compras"""
        return self.execute_query("SELECT * FROM vista_compras ORDER BY id_compra;")
    
    def get_vista_total_clientes(self):
        """Vista 2: Total por cliente"""
        return self.execute_query("SELECT * FROM vista_total_clientes ORDER BY total DESC;")
    
    def get_vista_ventas_completas(self):
        """Vista 3: Ventas completas"""
        return self.execute_query("SELECT * FROM vista_ventas_completas ORDER BY id_compra;")
    
    def get_vista_productos_mas_vendidos(self):
        """Vista 4: Productos más vendidos"""
        return self.execute_query("SELECT * FROM vista_productos_mas_vendidos;")
    

    # PROCEDIMIENTOS ALMACENADOS

    def call_mostrar_clientes(self):
        """Procedimiento 1: Mostrar clientes"""
        try:
            self.cursor.callproc('mostrar_clientes')
            notices = self.connection.notices
            self.connection.notices = []
            return notices
        except Exception as e:
            print(f"Error: {e}")
            return None
    
    def call_total_compras_cliente(self, id_cliente):
        """Procedimiento 2: Total de compras por cliente"""
        try:
            self.cursor.callproc('total_compras_cliente', (id_cliente,))
            notices = self.connection.notices
            self.connection.notices = []
            return notices
        except Exception as e:
            print(f"Error: {e}")
            return None
    
    def call_verificar_asientos(self, id_funcion):
        """Procedimiento 3: Verificar asientos disponibles"""
        try:
            self.cursor.callproc('verificar_asientos', (id_funcion,))
            notices = self.connection.notices
            self.connection.notices = []
            return notices
        except Exception as e:
            print(f"Error: {e}")
            return None
    
    # ============================================
    # REPORTES
    # ============================================
    
    def get_peliculas_mas_vistas(self):
        """Reporte: Películas más vistas"""
        query = """
        SELECT 
            p.titulo,
            COUNT(e.id_entrada) AS total_entradas,
            SUM(c.total_venta) AS ingresos_totales
        FROM pelicula p
        JOIN funcion f ON p.id_pelicula = f.id_pelicula
        JOIN entrada e ON f.id_funcion = e.id_funcion
        JOIN compra c ON c.id_entrada = e.id_entrada
        GROUP BY p.id_pelicula, p.titulo
        ORDER BY total_entradas DESC;
        """
        return self.execute_query(query)
    
    def get_ingresos_por_dia(self):
        """Reporte: Ingresos por día"""
        query = """
        SELECT 
            fecha_venta,
            COUNT(*) AS total_ventas,
            SUM(total_venta) AS ingresos_totales
        FROM compra
        GROUP BY fecha_venta
        ORDER BY fecha_venta;
        """
        return self.execute_query(query)
    
    def get_empleados_ventas(self):
        """Reporte: Empleados y sus ventas"""
        query = """
        SELECT 
            e.nombre,
            e.cargo,
            COUNT(c.id_compra) AS total_ventas,
            SUM(c.total_venta) AS monto_total
        FROM empleado e
        JOIN compra c ON e.id_empleado = c.id_empleado
        GROUP BY e.id_empleado, e.nombre, e.cargo
        ORDER BY total_ventas DESC;
        """
        return self.execute_query(query)
    
    def get_productos_mas_vendidos_vista(self):
        query = """
            SELECT *
            FROM vista_productos_mas_vendidos;
        """
        return self.execute_query(query)
    
    def get_resumen_dashboard(self):
        """Obtiene estadísticas para el dashboard"""
        stats = {
            'total_clientes': self.execute_query("SELECT COUNT(*) FROM cliente;"),
            'total_peliculas': self.execute_query("SELECT COUNT(*) FROM pelicula;"),
            'total_ventas': self.execute_query("SELECT COUNT(*) FROM compra;"),
            'total_ingresos': self.execute_query("SELECT COALESCE(SUM(total_venta), 0) FROM compra;")
        }
        return stats
    
    # ============================================
    # LOGIN
    # ============================================
    
    def verificar_login(self, usuario, contrasena):
        """Verifica las credenciales del usuario"""
        query = "SELECT id_empleado, nombre, cargo FROM empleado WHERE usuario=%s AND contraseña=%s;"
        result = self.execute_query(query, (usuario, contrasena))
        if result and len(result) > 0:
            return {
                'id': result[0][0],
                'nombre': result[0][1],
                'cargo': result[0][2]
            }
        return None