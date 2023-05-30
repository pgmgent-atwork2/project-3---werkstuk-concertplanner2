import userResponse from '../responses/users.js';

export default {
  "/users": {
    summary: "CRUD with users",
    description: "Get all users in the database",
    get: {
      tags: ["Users"],
      summary: "Get all users",
      responses: userResponse,
    },
    post: {
      tags: ["Users"],
      summary: "Create a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#components/schemas/user"
            }
          }
        }
      },
      responses: userResponse

    },
  },
  "/users/{id}": {
    summary: " get one user with given id",
    description: "get one user with given id",
    get: {
      tags: ["Users"],
      summary: " get one user with given id",
      parameters: [{
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
          minimum: 1,
        },
        description: "Id of the user to get",
      }, ],
      responses: userResponse,
    },
    delete: {
      tags: ["Users"],
      summary: "Deletes a user with an id",
      parameters: [{
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
          minimum: 1,
        },
        description: "ID of the user to delete",
      }, ],
      responses: userResponse,

    }
  },
};