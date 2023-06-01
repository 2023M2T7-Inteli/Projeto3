const express = require('express');

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.json());




// SCRRIPT ENDPOINTS COLETOR //
const coletor = require("rotas_coletor.js")


