import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'sistema_cine',
  user: 'postgres',
  password: '12345678',
  client_encoding: 'UTF8',
});

export default pool;