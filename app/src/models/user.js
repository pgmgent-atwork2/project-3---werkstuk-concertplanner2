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
    $
  }
});