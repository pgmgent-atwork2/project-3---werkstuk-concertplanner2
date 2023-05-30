import typeorm from 'typeorm';

const {
  EntitySchema
} = typeorm;

export default new EntitySchema({
  name: 'inventory',
  tableName: 'inventory',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    count: {
      type: 'int',
    },
    length: {
      type: 'int',
    },
    width: {
      type: 'int',
    }
  },
});