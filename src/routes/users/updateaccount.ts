import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const updateaccount: FastifyPluginAsyncTypebox = async (
  fastify
): Promise<void> => {
  fastify.route({
    method: "PATCH",
    url: "/update-account/:id",
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Object({
        first_name: Type.String(),
        last_name: Type.Union([Type.String(), Type.Null()]),
        email: Type.String(),
        gender: Type.String(),
      }),
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      const updateUser = request.body;

      try {
        // query existingUser id in database
        const existingUser = await fastify.prisma.user.findUnique({
          where: {
            uId: id,
          },
        });

        if (existingUser) {
          // update user info
          const user = await fastify.prisma.user.update({
            where: {
              uId: id,
            },
            data: updateUser,
          });
          return reply.code(200).send(user);
        } else {
          return reply
            .code(404)
            .send({ message: "User not found at this time" });
        }
      } catch (error) {
        console.error(error);
        return reply.code(500).send({
          message: "Failed to update user account-due to server error",
        });
      }
    },
  });
};

export default updateaccount;
