import { Inject, Injectable } from '@nestjs/common';
import { Stack } from './stack.entity';
import { CardService } from 'src/card/card.service';
@Injectable()
export class StackService {
  constructor(
    @Inject('STACK_REPOSITORY') private readonly stackRepository: typeof Stack,
    private readonly cardService: CardService,
  ) {}
  async createStack(name: string): Promise<Stack> {
    return this.stackRepository.create({ name });
  }
  async getAll(): Promise<Stack[]> {
    return this.stackRepository.findAll();
  }
  async getById(id: string): Promise<Stack[]> {
    return this.stackRepository.findAll({ where: { id: +id } });
  }

  async updateStack(name: string, id: string) {
    return this.stackRepository.update({ name }, { where: { id: +id } });
  }
  async deleteStack(id: string) {
    await this.cardService.deleteCardByStackId(id);
    this.stackRepository.destroy({
      where: {
        id: +id,
      },
    });
    return id;
  }
}
