const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "crudgames",
});

app.use(cors());
app.use(express.json());

//INSERIR
app.post("/register", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO games ( name, cost, category ) VALUES ( ?,?,? )";
  db.query(SQL, [name, cost, category], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//DELETAR
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM games WHERE idgames = ?";
  db.query(SQL, [id], (err, results) => {
    if (err) console.log(err);
    else res.send(results);
  });
});

//MODIFICAR
app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let SQL =
    "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ? ";
  db.query(SQL, [name, cost, category, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//BUSCAR
app.get("/getCards", (req, res) => {
  let SQL = "SELECT * FROM games";
  db.query(SQL, (err, results) => {
    if (err) {
      console.error("Erro ao executar consulta: ", err);
    } else {
      res.send(results);
      console.log("Resultado da consulta: ", results);
    }
  });
});

//Consultar todas tabelas
// db.query("SELECT * FROM games", (err, results) => {
//   if (err) {
//     console.error("Erro ao executar consulta: ", err);
//   } else {
//     console.log("Resultado da consulta: ", results);
//   }
// });

//INSERIR NO BANCO FORCADO
// app.get("/", (req, res) => {
//   let SQL =
//     "INSERT INTO games (name, cost, category) VALUES ('The last of us 3', '290', 'Acao')";
//   db.query(SQL, (err, result) => {
//     console.log("Qual erro ->", err);
//     console.log("OK ->", result);
//   });
// });

app.listen(3001, () => {
  console.log("BACK RODANDO");
});
