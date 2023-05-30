export default {
  200: {
    description: "successful response",
    content: {
      "application/json": {
        schema: {
          $ref: "#components/schemas/user",
        },
      },
    },
  },
};