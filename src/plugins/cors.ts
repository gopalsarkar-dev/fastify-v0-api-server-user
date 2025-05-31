import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin<FastifyCorsOptions>((fastify) => {
  fastify.register(fastifyCors, {
    origin: "*",
  });
});
