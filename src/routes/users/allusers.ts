import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const createuser: FastifyPluginAsyncTypebox = async (
  fastify
): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/allusers",
    schema: {
      response: {
        "2xx": Type.Array(
          Type.Object({
            first_name: Type.String(),
            last_name: Type.Union([Type.String(), Type.Null()]),
            email: Type.String(),
            gender: Type.String(),
          })
        ),
      },
    },
    handler: async (request, reply) => {
      try {
        const getAllUser = await fastify.prisma.user.findMany();

        if (getAllUser) {
          return reply.code(200).send(getAllUser);
        }
      } catch (error) {
        console.log(error);

        return reply.code(500).internalServerError("Getting Data failed");
      }
    },
  });
};

export default createuser;
