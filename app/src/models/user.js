import typeorm from 'typeorm';
const {
  EntitySchema
} = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    }
  },
  relations: {
    role: {
      target: "Role",
      type: "many-to-one",
      joinColumn: true,
      inverseSide: "role",
    },
    meta: {
      target: "UserMeta",
      type: "one-to-one",
      cascade: true,
      inverseSide: "user",
    },
    events: {
      target: "Events",
      type: "one-to-many",
      cascade: true,
      inverseSide: "user",
    }
  },
});