import { Sequelize } from 'sequelize-typescript';
import { Card } from '../card/card.entity';
import { Stack } from 'src/stack/stack.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'postgresql://postgres:eyvQlUVtJYfegqWZpcIRHrOPvYiPfOFh@postgres.railway.internal:5432/railway',
        port: 5432,
        username: 'postgres',
        password: 'eyvQlUVtJYfegqWZpcIRHrOPvYiPfOFh',
        database: 'railway',
      });

      sequelize.addModels([Card, Stack]);

      Card.belongsTo(Stack);
      Stack.hasMany(Card);
      await sequelize.sync();
      return sequelize;
    },
  },
];
