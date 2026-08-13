# config.py - Configuración de la aplicación

# ============================================
# CONFIGURACIÓN DE LA BASE DE DATOS
# ============================================

class Config:
    """Clase de configuración principal"""
    
    # Clave secreta de Flask (para sesiones)
    SECRET_KEY = 'mi_clave_secreta_para_cinemannia_2026'
    
    # Modo debug (True = modo desarrollo)
    DEBUG = True
    
    # Duración de la sesión en segundos (1 hora)
    PERMANENT_SESSION_LIFETIME = 3600

# ============================================
# CONFIGURACIÓN PARA CONEXIÓN A POSTGRESQL
# ============================================

DB_CONFIG = {
    'host': 'localhost',
    'port': '5432',
    'database': 'sistema_cine',
    'user': 'postgres',
    'password': 'fabiola'
    
}