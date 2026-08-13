# app.py - Aplicación principal Flask

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from functools import wraps
from database import Database
from config import Config
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = Config.SECRET_KEY
app.config['PERMANENT_SESSION_LIFETIME'] = Config.PERMANENT_SESSION_LIFETIME

db = Database()

# ============================================
# DECORADOR PARA VERIFICAR SESIÓN
# ============================================

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'usuario' not in session:
            flash('Por favor, inicia sesión primero.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# ============================================
# RUTAS - AUTENTICACIÓN
# ============================================

@app.route('/')
def index():
    if 'usuario' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form.get('usuario')
        contrasena = request.form.get('contrasena')
        
        if not usuario or not contrasena:
            flash('Ingrese usuario y contraseña', 'danger')
            return render_template('login.html')
        
        if not db.connect():
            flash('Error de conexión a la base de datos', 'danger')
            return render_template('login.html')
        
        user = db.verificar_login(usuario, contrasena)
        db.disconnect()
        
        if user:
            session['usuario'] = user
            session.permanent = True
            flash(f'Bienvenido {user["nombre"]}', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Usuario o contraseña incorrectos', 'danger')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Sesión cerrada', 'info')
    return redirect(url_for('login'))

# ============================================
# RUTAS - DASHBOARD
# ============================================

@app.route('/dashboard')
@login_required
def dashboard():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('login'))
    
    stats = db.get_resumen_dashboard()
    db.disconnect()
    
    total_clientes = stats['total_clientes'][0][0] if stats['total_clientes'] else 0
    total_peliculas = stats['total_peliculas'][0][0] if stats['total_peliculas'] else 0
    total_ventas = stats['total_ventas'][0][0] if stats['total_ventas'] else 0
    total_ingresos = stats['total_ingresos'][0][0] if stats['total_ingresos'] else 0
    
    return render_template('index.html', 
                         usuario=session['usuario'],
                         total_clientes=total_clientes,
                         total_peliculas=total_peliculas,
                         total_ventas=total_ventas,
                         total_ingresos=total_ingresos)

# ============================================
# RUTAS - CLIENTES
# ============================================

@app.route('/clientes')
@login_required
def clientes():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    clientes = db.get_all_clientes()
    db.disconnect()
    return render_template('clientes.html', usuario=session['usuario'], clientes=clientes)

@app.route('/cliente/nuevo', methods=['GET', 'POST'])
@login_required
def cliente_nuevo():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        telefono = request.form.get('telefono')
        correo = request.form.get('correo')
        
        if not nombre or not apellido:
            flash('Nombre y Apellido son obligatorios', 'danger')
            return render_template('cliente_form.html', usuario=session['usuario'], cliente=None)
        
        if not db.connect():
            flash('Error de conexión', 'danger')
            return render_template('cliente_form.html', usuario=session['usuario'], cliente=None)
        
        result = db.insert_cliente(nombre, apellido, telefono, correo)
        db.disconnect()
        
        if result:
            flash('✅ Cliente agregado exitosamente', 'success')
            return redirect(url_for('clientes'))
        else:
            flash('❌ Error al agregar cliente', 'danger')
    
    return render_template('cliente_form.html', usuario=session['usuario'], cliente=None)

@app.route('/cliente/editar/<int:id>', methods=['GET', 'POST'])
@login_required
def cliente_editar(id):
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('clientes'))
    
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        telefono = request.form.get('telefono')
        correo = request.form.get('correo')
        
        if not nombre or not apellido:
            flash('Nombre y Apellido son obligatorios', 'danger')
            cliente = db.get_cliente_by_id(id)
            db.disconnect()
            return render_template('cliente_form.html', usuario=session['usuario'], cliente=cliente[0] if cliente else None)
        
        result = db.update_cliente(id, nombre, apellido, telefono, correo)
        db.disconnect()
        
        if result:
            flash('✅ Cliente actualizado exitosamente', 'success')
            return redirect(url_for('clientes'))
        else:
            flash('❌ Error al actualizar cliente', 'danger')
    
    cliente = db.get_cliente_by_id(id)
    db.disconnect()
    
    if not cliente:
        flash('Cliente no encontrado', 'danger')
        return redirect(url_for('clientes'))
    
    return render_template('cliente_form.html', usuario=session['usuario'], cliente=cliente[0])

@app.route('/cliente/eliminar/<int:id>')
@login_required
def cliente_eliminar(id):
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('clientes'))
    
    result = db.delete_cliente(id)
    db.disconnect()
    
    if result:
        flash('✅ Cliente eliminado exitosamente', 'success')
    else:
        flash('❌ Error al eliminar cliente', 'danger')
    
    return redirect(url_for('clientes'))

# ============================================
# RUTAS - PRODUCTOS
# ============================================

@app.route('/productos')
@login_required
def productos():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    productos = db.get_all_productos()
    db.disconnect()
    return render_template('productos.html', usuario=session['usuario'], productos=productos)

@app.route('/producto/nuevo', methods=['GET', 'POST'])
@login_required
def producto_nuevo():
    if request.method == 'POST':
        nombre = request.form.get('nombre_producto')
        categoria = request.form.get('categoria')
        precio = request.form.get('precio')
        stock = request.form.get('stock')
        
        if not nombre or not categoria:
            flash('Nombre y Categoría son obligatorios', 'danger')
            return render_template('producto_form.html', usuario=session['usuario'], producto=None)
        
        try:
            precio = float(precio) if precio else 0
            stock = int(stock) if stock else 0
        except ValueError:
            flash('Precio y Stock deben ser números', 'danger')
            return render_template('producto_form.html', usuario=session['usuario'], producto=None)
        
        if not db.connect():
            flash('Error de conexión', 'danger')
            return render_template('producto_form.html', usuario=session['usuario'], producto=None)
        
        result = db.insert_producto(nombre, categoria, precio, stock)
        db.disconnect()
        
        if result:
            flash('✅ Producto agregado exitosamente', 'success')
            return redirect(url_for('productos'))
        else:
            flash('❌ Error al agregar producto', 'danger')
    
    return render_template('producto_form.html', usuario=session['usuario'], producto=None)

@app.route('/producto/editar/<int:id>', methods=['GET', 'POST'])
@login_required
def producto_editar(id):
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('productos'))
    
    if request.method == 'POST':
        nombre = request.form.get('nombre_producto')
        categoria = request.form.get('categoria')
        precio = request.form.get('precio')
        stock = request.form.get('stock')
        
        if not nombre or not categoria:
            flash('Nombre y Categoría son obligatorios', 'danger')
            producto = db.get_producto_by_id(id)
            db.disconnect()
            return render_template('producto_form.html', usuario=session['usuario'], producto=producto[0] if producto else None)
        
        try:
            precio = float(precio) if precio else 0
            stock = int(stock) if stock else 0
        except ValueError:
            flash('Precio y Stock deben ser números', 'danger')
            producto = db.get_producto_by_id(id)
            db.disconnect()
            return render_template('producto_form.html', usuario=session['usuario'], producto=producto[0] if producto else None)
        
        result = db.update_producto(id, nombre, categoria, precio, stock)
        db.disconnect()
        
        if result:
            flash('✅ Producto actualizado exitosamente', 'success')
            return redirect(url_for('productos'))
        else:
            flash('❌ Error al actualizar producto', 'danger')
    
    producto = db.get_producto_by_id(id)
    db.disconnect()
    
    if not producto:
        flash('Producto no encontrado', 'danger')
        return redirect(url_for('productos'))
    
    return render_template('producto_form.html', usuario=session['usuario'], producto=producto[0])

@app.route('/producto/eliminar/<int:id>')
@login_required
def producto_eliminar(id):
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('productos'))
    
    result = db.delete_producto(id)
    db.disconnect()
    
    if result:
        flash('✅ Producto eliminado exitosamente', 'success')
    else:
        flash('❌ Error al eliminar producto', 'danger')
    
    return redirect(url_for('productos'))

# ============================================
# RUTAS - FUNCIONES
# ============================================

@app.route('/funciones')
@login_required
def funciones():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    funciones = db.get_all_funciones()
    db.disconnect()
    return render_template('funciones.html', usuario=session['usuario'], funciones=funciones)

# ============================================
# RUTAS - VENTAS
# ============================================

@app.route('/ventas')
@login_required
def ventas():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    ventas = db.get_all_ventas()
    db.disconnect()
    return render_template('ventas.html', usuario=session['usuario'], ventas=ventas)

@app.route('/nueva-venta', methods=['GET', 'POST'])
@login_required
def nueva_venta():
    if request.method == 'POST':
        id_cliente = request.form.get('id_cliente')
        id_empleado = request.form.get('id_empleado')
        id_entrada = request.form.get('id_entrada')
        metodo_pago = request.form.get('metodo_pago')
        total = request.form.get('total')

        productos_ids = request.form.getlist('producto_id[]')
        productos_cantidades = request.form.getlist('producto_cantidad[]')

        if not id_empleado:
            flash('Debes seleccionar un empleado', 'danger')
            return redirect(url_for('nueva_venta'))

        if not id_entrada:
            flash('Debes seleccionar una entrada', 'danger')
            return redirect(url_for('nueva_venta'))

        if not metodo_pago:
            flash('Debes seleccionar un método de pago', 'danger')
            return redirect(url_for('nueva_venta'))

        if not total or float(total) <= 0:
            flash('El total debe ser mayor a 0', 'danger')
            return redirect(url_for('nueva_venta'))

        try:
            id_cliente = int(id_cliente) if id_cliente and id_cliente != '' else None
            id_empleado = int(id_empleado)
            id_entrada = int(id_entrada)
            total = float(total)
        except ValueError:
            flash('Datos inválidos', 'danger')
            return redirect(url_for('nueva_venta'))

        if not db.connect():
            flash('Error de conexión a la base de datos', 'danger')
            return redirect(url_for('nueva_venta'))

        try:
            query_compra = """
            INSERT INTO compra (metodo_pago, fecha_venta, total_venta, id_cliente, id_empleado, id_entrada)
            VALUES (%s, CURRENT_DATE, %s, %s, %s, %s)
            RETURNING id_compra;
            """
            db.cursor.execute(query_compra, (metodo_pago, total, id_cliente, id_empleado, id_entrada))
            id_compra = db.cursor.fetchone()[0]

            for i in range(len(productos_ids)):
                id_producto = productos_ids[i]
                cantidad = productos_cantidades[i]

                if id_producto and cantidad:
                    id_producto = int(id_producto)
                    cantidad = int(cantidad)

                    query_precio = """
                    SELECT precio
                    FROM producto
                    WHERE id_producto = %s;
                    """
                    db.cursor.execute(query_precio, (id_producto,))
                    producto = db.cursor.fetchone()

                    if not producto:
                        raise Exception('Producto no encontrado')

                    precio_unitario = float(producto[0])
                    subtotal = precio_unitario * cantidad

                    query_detalle = """
                    INSERT INTO detallecompra (cantidad, precio_unitario, subtotal, id_compra, id_producto)
                    VALUES (%s, %s, %s, %s, %s);
                    """
                    db.cursor.execute(query_detalle, (cantidad, precio_unitario, subtotal, id_compra, id_producto))

            db.connection.commit()
            db.disconnect()

            flash(f'Venta registrada exitosamente (ID: {id_compra})', 'success')
            return redirect(url_for('ventas'))

        except Exception as e:
            db.connection.rollback()
            db.disconnect()
            flash(f'Error al registrar venta: {str(e)}', 'danger')
            return redirect(url_for('nueva_venta'))

    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))

    clientes = db.get_all_clientes()
    empleados = db.get_empleados()
    entradas = db.get_entradas()
    productos = db.get_all_productos()
    db.disconnect()

    return render_template('nueva_venta.html',
                           usuario=session['usuario'],
                           clientes=clientes,
                           empleados=empleados,
                           entradas=entradas,
                           productos=productos)

@app.route('/venta/editar/<int:id>', methods=['GET', 'POST'])
@login_required
def venta_editar(id):
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('ventas'))
    
    if request.method == 'POST':
        metodo_pago = request.form.get('metodo_pago')
        id_cliente = request.form.get('id_cliente')
        id_empleado = request.form.get('id_empleado')
        id_entrada = request.form.get('id_entrada')
        total = request.form.get('total')
        
        if not metodo_pago:
            flash('❌ Debes seleccionar un método de pago', 'danger')
            db.disconnect()
            return redirect(url_for('venta_editar', id=id))
        
        try:
            id_cliente = int(id_cliente) if id_cliente and id_cliente != '' else None
            id_empleado = int(id_empleado)
            id_entrada = int(id_entrada)
            total = float(total)
        except ValueError:
            flash('❌ Datos inválidos', 'danger')
            db.disconnect()
            return redirect(url_for('venta_editar', id=id))
        
        result = db.update_venta(id, metodo_pago, id_cliente, id_empleado, id_entrada, total)
        db.disconnect()
        
        if result:
            flash('✅ Venta actualizada exitosamente', 'success')
            return redirect(url_for('ventas'))
        else:
            flash('❌ Error al actualizar la venta', 'danger')
            return redirect(url_for('venta_editar', id=id))
    
    venta = db.get_venta_by_id(id)
    if not venta:
        flash('❌ Venta no encontrada', 'danger')
        db.disconnect()
        return redirect(url_for('ventas'))
    
    clientes = db.get_all_clientes()
    empleados = db.get_empleados()
    entradas = db.get_entradas()
    db.disconnect()
    
    return render_template('venta_editar.html', 
                         usuario=session['usuario'],
                         venta=venta[0],
                         clientes=clientes,
                         empleados=empleados,
                         entradas=entradas)

@app.route('/venta/eliminar/<int:id>')
@login_required
def venta_eliminar(id):
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('ventas'))
    
    result = db.delete_venta(id)
    db.disconnect()
    
    if result:
        flash('✅ Venta eliminada exitosamente', 'success')
    else:
        flash('❌ Error al eliminar la venta', 'danger')
    
    return redirect(url_for('ventas'))

# ============================================
# RUTAS - EMPLEADOS
# ============================================

@app.route('/empleados')
@login_required
def empleados():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    empleados = db.get_all_empleados()
    db.disconnect()
    return render_template('empleados.html', usuario=session['usuario'], empleados=empleados)

@app.route('/empleado_nuevo', methods=['GET', 'POST'])
@login_required
def empleado_nuevo():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        cargo = request.form.get('cargo')
        usuario_form = request.form.get('usuario')
        contrasena = request.form.get('contrasena')

        db.connect()
        db.insert_empleado(nombre, cargo, usuario_form, contrasena)
        db.disconnect()

        flash('Empleado agregado correctamente', 'success')
        return redirect(url_for('empleados'))

    return render_template('empleado_nuevo.html', usuario=session['usuario'])

@app.route('/empleado_editar/<int:id>', methods=['GET', 'POST'])
@login_required
def empleado_editar(id):
    db.connect()

    if request.method == 'POST':
        nombre = request.form['nombre']
        cargo = request.form['cargo']
        usuario = request.form['usuario']

        db.update_empleado(id, nombre, cargo, usuario)
        db.disconnect()

        flash('Empleado actualizado', 'success')
        return redirect(url_for('empleados'))

    empleado = db.get_empleado_by_id(id)
    db.disconnect()
    return render_template(
    'empleado_editar.html',
    usuario=session['usuario'],
    empleado=empleado)

@app.route('/empleado_eliminar/<int:id>')
@login_required
def empleado_eliminar(id):
    db.connect()
    db.delete_empleado(id)
    db.disconnect()

    flash('Empleado eliminado', 'danger')
    return redirect(url_for('empleados'))

# ============================================
# RUTAS - REPORTES
# ============================================

@app.route('/reportes')
@login_required
def reportes():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    peliculas_mas_vistas = db.get_peliculas_mas_vistas()
    ingresos_por_dia = db.get_ingresos_por_dia()
    empleados_ventas = db.get_empleados_ventas()

    productos_mas_vendidos = db.get_vista_productos_mas_vendidos()

    db.disconnect()
    
    return render_template('reportes.html', 
                         usuario=session['usuario'],
                         peliculas_mas_vistas=peliculas_mas_vistas,
                         ingresos_por_dia=ingresos_por_dia,
                         empleados_ventas=empleados_ventas,
                         productos_mas_vendidos=productos_mas_vendidos)

# ============================================
# RUTAS - VISTAS
# ============================================

@app.route('/vistas')
@login_required
def vistas():
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    vista_ventas_completas = db.get_vista_ventas_completas()
    vista_productos = db.get_vista_productos_mas_vendidos()
    db.disconnect()
    
    return render_template('vistas.html', 
                         usuario=session['usuario'],
                         vista_ventas_completas=vista_ventas_completas,
                         vista_productos=vista_productos)

# ============================================
# RUTAS - PROCEDIMIENTOS
# ============================================

@app.route('/procedimientos')
@login_required
def procedimientos():
    resultados = {}
    
    if not db.connect():
        flash('Error de conexión', 'danger')
        return redirect(url_for('dashboard'))
    
    resultados['mostrar_clientes'] = db.call_mostrar_clientes()
    resultados['verificar_asientos'] = db.call_verificar_asientos(1)
    resultados['total_compras'] = db.call_total_compras_cliente(1)
    db.disconnect()
    
    return render_template('procedimientos.html', 
                         usuario=session['usuario'],
                         resultados=resultados)

# ============================================
# RUTA - API
# ============================================

@app.route('/api/funciones/<int:id_funcion>/asientos')
@login_required
def api_asientos_disponibles(id_funcion):
    if not db.connect():
        return jsonify({'error': 'Error de conexión'}), 500
    
    asientos = db.get_asientos_disponibles(id_funcion)
    db.disconnect()
    
    if asientos:
        resultado = [{
            'id': a[0],
            'fila': a[1],
            'numero': a[2],
            'tipo': a[3]
        } for a in asientos]
        return jsonify(resultado)
    else:
        return jsonify([])

# ============================================
# INICIAR APLICACIÓN
# ============================================

if __name__ == '__main__':
    app.run(debug=Config.DEBUG, host='0.0.0.0', port=5000)