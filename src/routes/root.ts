import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const root: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {},
    handler: async (request, reply) => {
      reply.send("Gopal Hellow World");
    },
  });
};

export default root;
