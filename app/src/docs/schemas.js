export default {
  user: {
    properties: {
      id: {
        type: "number"
      },
      email: {
        type: "string"
      },
      password: {
        type: "string"
      },
      user_meta: {
        $ref: "#/components/schemas/userMeta"
      },
      role: {
        $ref: "#/components/schemas/role"
      },
      data: {
        $ref: "#/components/schemas/data"
      }
    }
  },
  userMeta: {
    properties: {
      id: {
        type: "number"
      },
      orkestname: {
        type: "string"
      }
    },
  },
  role: {
    properties: {
      id: {
        type: "number"
      },
      name: {
        type: "string",
        enum: ["admin", "user"]
      },
    },
  },
  data: {
    properties: {
      id: {
        type: "number"
      },
      data: {
        type: "string"
      }
    }
  },
  inventory: {
    properties: {
      id: {
        type: "number"
      },
      name: {
        type: "string"
      },
      count: {
        type: "number"
      },
      width: {
        type: "number"
      },
      length: {
        type: "number"
      }
    }
  }
}