import { Stack } from './stack.entity';

export const stackProvider = [
  {
    provide: 'STACK_REPOSITORY',
    useValue: Stack,
  },
];
