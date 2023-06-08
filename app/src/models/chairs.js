import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'chairs',
  tableName: 'chairs',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    color: {
      type: 'varchar',
    },
  },
  relations: {
    inventory: {
      target: 'inventory',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'chairs',
      onDelete: 'CASCADE',
    },
  },
});
