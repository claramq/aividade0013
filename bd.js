//bd.js
import pkg from "pg";
const { Pool } = pkg;

//bd.js
export { selectUsuarios, selectUsuario, insertUsuario, deleteUsuario };

//bd.js
async function connect() {
    const pool = new Pool({
      connectionString: process.env.URL_BD,
    });
    return pool.connect();
  }

  //bd.js
async function selectUsuarios() {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuario");
    return res.rows;
  }

  //bd.js
async function selectUsuario(id) {
  const client = await connect();
  const query = "SELECT * FROM usuario WHERE id = $1";
  const usuario = [id];
  const res = await client.query(query, usuario);
  client.release();
  return res.rows;
}

  export { selectUsuarios };

  //bd.js
export { selectUsuario };

//bd.js
async function insertUsuario(data) {
  const client = await connect();
  const query = "INSERT INTO usuario (nome,senha,email) VALUES ($1,$2,$3) ";
  const usuario = [data.nome, data.senha, data.email];
  await client.query(query, usuario);
  client.release();
}

//bd.js
export { selectUsuarios, selectUsuario, insertUsuario };

//bd.js
async function deleteUsuario(id) {
  const client = await connect();
  const query = "DELETE FROM usuario WHERE id = $1";
  await client.query(query, [id]);
  client.release();
}