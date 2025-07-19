const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
  IP_SERVER,
  DB_PORT,
} = require("./constantes");

const port = process.env.PORT || 5000;

let uri = "";

if (DB_USER && DB_PASSWORD) {
  uri = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${IP_SERVER}:${DB_PORT}/${DB_NAME}?authSource=admin`;
} else {
  uri = `mongodb://${IP_SERVER}:${DB_PORT}/${DB_NAME}`;
}

mongoose
  .connect(uri)
  .then(() => {
    console.log(`✅ Conectado a la base de datos "${DB_NAME}" en ${IP_SERVER}:${DB_PORT}`);
    app.listen(port, () => {
      console.log("*******************");
      console.log("*** API REST ******");
      console.log("*******************");
      console.log(`🚀 Servidor escuchando en: http://${IP_SERVER}:${port}/api`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión a MongoDB:", err);
    process.exit(1);
  });
