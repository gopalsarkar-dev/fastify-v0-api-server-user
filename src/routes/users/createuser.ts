import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const createuser: FastifyPluginAsyncTypebox = async (
  fastify
): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/createuser",
    schema: {
      body: Type.Object({
        first_name: Type.String(),
        last_name: Type.String(),
        email: Type.String(),
        gender: Type.String(),
      }),
    },
    handler: async (request, reply) => {
      const { email, first_name, gender, last_name } = request.body;

      try {
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export default createuser;
