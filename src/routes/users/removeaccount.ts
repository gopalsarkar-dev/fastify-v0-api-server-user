import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const removeaccount: FastifyPluginAsyncTypebox = async (
  fastify
): Promise<void> => {
  fastify.route({
    method: "DELETE",
    url: "/remove-account/:id",
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        "2xx": Type.Object({
          message: Type.String(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const existingUser = await fastify.prisma.user.findUnique({
          where: {
            id: id,
          },
        });

        if (existingUser) {
          await fastify.prisma.user.delete({
            where: {
              id: id,
            },
          });
          return reply.code(200).send({ message: "User successfully deleted" });
        } else {
          reply.code(404).send({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        reply.code(500).send({ message: "Delete operation failed" });
      }
    },
  });
};

export default removeaccount;
