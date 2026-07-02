import { Sequelize } from 'sequelize-typescript';
import { Card } from '../card/card.entity';
import { Stack } from 'src/stack/stack.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'redFoxy23',
        database: 'memoryCards',
      });

      sequelize.addModels([Card, Stack]);

      Card.belongsTo(Stack);
      Stack.hasMany(Card);
      await sequelize.sync();
      return sequelize;
    },
  },
];
