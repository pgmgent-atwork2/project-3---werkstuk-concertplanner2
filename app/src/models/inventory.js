import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

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
    },
    image: {
      type: 'varchar',
      nullable: true,
    },
    color: {
      type: 'int',
    },
  },
  relations: {
    chairs: {
      target: 'chairs',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'inventory',
    },
  },
});
