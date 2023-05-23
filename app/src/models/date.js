import typeorm from 'typeorm';

const {
  EntitySchema
} = typeorm;

export default new EntitySchema({
  name: 'Date',
  tableName: 'Date',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    datum: {
      type: 'varchar',
    }
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
      },
      onDelete: "CASCADE",
    },
  }
})