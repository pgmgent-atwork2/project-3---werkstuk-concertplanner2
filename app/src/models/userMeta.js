import typeorm from 'typeorm';

const {
  EntitySchema
} = typeorm;

export default new EntitySchema({
  name: 'UserMeta',
  tableName: 'userMeta',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    orkestName: {
      type: 'varchar',
    }
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    }
  },
})