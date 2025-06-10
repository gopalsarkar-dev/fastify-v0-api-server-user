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

      const userDetail = {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: email.trim().toLowerCase(),
        gender: gender,
      };

      try {
        const alreadyUser = await fastify.prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (alreadyUser !== null) {
          return reply.conflict(`${email} already register`);
        }

        await fastify.prisma.user.create({
          data: userDetail,
        });

        return reply.code(201).send({
          message: "User Successfuly created",
        });
      } catch (error) {
        console.log(error);

        return reply.code(500).internalServerError("User create failed");
      }
    },
  });
};

export default createuser;
