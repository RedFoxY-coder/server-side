import { Inject, Injectable } from '@nestjs/common';
import { Stack } from './stack.entity';
import { CardService } from 'src/card/card.service';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class StackService {
  constructor(
    @InjectModel(Stack) private stackModel: typeof Stack,
    private readonly cardService: CardService,
   
  ) {}
  async createStack(userId: number, name: string): Promise<Stack> {
      const stack = await this.stackModel.create({ name: name, userId: userId});
    return stack

   
  }
  async getAll(): Promise<Stack[]> {
    const stacks = await this.stackModel.findAll({include: {all: true}});
    const sortedStacks = [...stacks].sort((a, b) => a.id - b.id)
    return sortedStacks
  }
  async getById(id: number): Promise<Stack[]> {
    return this.stackModel.findAll({ where: { id } });
  }

  async updateStack(name: string, id: number) {
    return this.stackModel.update({ name }, { where: { id } });
  }
  async deleteStack(id: number) {
    await this.cardService.deleteCardByStackId(id);
    this.stackModel.destroy({
      where: {
        id
      },
    });
    return id;
  }
}
