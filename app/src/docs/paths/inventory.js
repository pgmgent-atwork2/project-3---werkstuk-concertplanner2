import inventoryResponse from '../responses/inventory.js';

export default {
  "/inventory": {
    summary: "CRUD with inventory",
    description: "Get the inventory in the database",
    get: {
      tags: ["inventory"],
      summary: "Get all inventory information",
      responses: inventoryResponse,
    },
    post: {
      tags: ["inventory"],
      summary: "Create a new inventory item",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#components/schemas/inventory"
            }
          }
        }
      },
      responses: inventoryResponse

    },
  },
  "/inventory/{id}": {
    summary: " get one inventory item with given id",
    description: "get one inventory with given id",
    get: {
      tags: ["inventory"],
      summary: " get one inventory item with given id",
      parameters: [{
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
          minimum: 1,
        },
        description: "Id of the inventory to get",
      }, ],
      responses: inventoryResponse,
    },
    delete: {
      tags: ["inventory"],
      summary: "Deletes a inventory item with an id",
      parameters: [{
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "integer",
          minimum: 1,
        },
        description: "ID of the inventory item to delete",
      }, ],
      responses: inventoryResponse,

    }
  },
};