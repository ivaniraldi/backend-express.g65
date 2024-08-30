const express = require("express");
const cors = require("cors");

const fs = require("fs");

const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.static("public")); // Servir archivos estáticos desde la carpeta "public"

//correr el servidor
app.listen(3000, console.log("¡Servidor encendido! Corriendo en http://localhost:3000"));


//levantar el html (tipo frontend) monolitico
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


//Rutas de productos
app.get("/productos", (req, res) => {
  const jsonProductos = fs.readFileSync("./data/productos.json");
  const productos = JSON.parse(jsonProductos);
  res.json(productos);
}); 

app.post("/productos", (req, res) => {
  const producto = req.body;
  const productos = JSON.parse(fs.readFileSync("./data/productos.json"));
  productos.push(producto);
  fs.writeFileSync("./data/productos.json", JSON.stringify(productos));
  res.send("Producto agregado con éxito!");
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const productos = JSON.parse(fs.readFileSync("./data/productos.json"));
  const index = productos.findIndex((p) => p.id == id);
  productos.splice(index, 1);
  fs.writeFileSync("./data/productos.json", JSON.stringify(productos));
  res.send("Producto eliminado con éxito");
});

app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const producto = req.body;
  const productos = JSON.parse(fs.readFileSync("./data/productos.json"));
  const index = productos.findIndex((p) => p.id == id);

  productos[index] = producto;

  fs.writeFileSync("./data/productos.json", JSON.stringify(productos));
  res.send("Producto modificado con éxito");
});

//Rutas de usuarios
app.get(
  "/usuarios", //aca estaria el middleware
  (req, res) => {
    const jsonUsuarios = fs.readFileSync("./data/usuarios.json");
    const usuarios = JSON.parse(jsonUsuarios);
    res.json(usuarios);
  }
);

app.post("/usuarios", (req, res) => {
  const usuario = req.body;
  const usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"));
  usuarios.push(usuario);
  fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios));
  res.send("Usuario agregado con éxito!");
});

app.delete("/usuarios/:name", (req, res) => {
  const { name } = req.params;
  const usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"));
  const index = usuarios.findIndex(
    (u) => u.name.toLowerCase() == name.toLowerCase()
  );
  usuarios.splice(index, 1);
  fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios));
  res.send("Usuario eliminado con éxito");
});

app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const modificacion = req.body;
    const usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"));
    const index = usuarios.findIndex((p) => p.id == id);
  
    usuarios[index] = modificacion;
  
    fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios));
    res.send("Usuario modificado con éxito");
  });
  