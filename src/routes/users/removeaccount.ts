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
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const existingUser = await fastify.prisma.user.findUnique({
          where: {
            uId: id,
          },
        });

        if (existingUser) {
          await fastify.prisma.user.delete({
            where: {
              uId: id,
            },
          });
          return reply.code(200).send({ message: "User successfully deleted" });
        } else {
          return reply
            .code(404)
            .send({ message: "User not found at this time" });
        }
      } catch (error) {
        console.error(error);
        return reply.code(500).send({
          message: "Failed to Remove user account-due to server error",
        });
      }
    },
  });
};

export default removeaccount;
