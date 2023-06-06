import { Router } from "express";
const routes = Router()

import coletorRouter from "./coletor/rotas.js";
routes.use("/coletor/rotas.js", coletorRouter);

import grupoColetorRouter from "./grupoColetor/rotas.js";
routes.use("/grupoColetor/rotas.js", grupoColetorRouter);

// routes.use("/grupoPesquisador/rotas.js", grupoPesquisadorRouter);
import pesquisadorRouter from "./pesquisador/rotas.js";
routes.use("/pesquisador/rotas.js", pesquisadorRouter);

import perguntasRouter from "./perguntas/rotas.js";
routes.use("/perguntas/rotas.js", perguntasRouter);

import protocoloRouter from "./protocolo/rotas.js";
routes.use("/protocolo/rotas.js", protocoloRouter);


export default routes;