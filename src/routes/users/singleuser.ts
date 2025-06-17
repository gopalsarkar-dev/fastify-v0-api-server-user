import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

const singleuser: FastifyPluginAsyncTypebox = async (
  fastify
): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/singleuser/:id",
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const getSingleUser = await fastify.prisma.user.findUniqueOrThrow({
          where: {
            uId: id,
          },
        });

        return reply.code(200).send(getSingleUser);
      } catch (error) {
        fastify.log.error(error);
        // return
      }
    },
  });
};

export default singleuser;
