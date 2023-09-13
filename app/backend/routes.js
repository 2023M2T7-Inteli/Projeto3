import { Router } from "express";

import coletorRouter from "./coletor/rotas";

const routes = Router()

routes.use("/coletor/rotas.js", coletorRouter);

routes.use("/grupoColetor/rotas.js", grupoColetorRouter);

// routes.use("/grupoPesquisador/rotas.js", grupoPesquisadorRouter);

routes.use("/pesquisador/rotas.js", pesquisadorRouter);

routes.use("/perguntas/rotas.js", pesrguntasRouter);

routes.use("/protocolo/rotas.js", protocoloRouter);


export default routes;