import {  Injectable } from '@nestjs/common';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/CardDto';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card) private cardModel: typeof Card
  ){}

  async createCard(createCardDto: CreateCardDto, id: number): Promise<Card> {
  
    return this.cardModel.create({
     ...createCardDto,
      stackId: id,
    });
  }
  async getCardsByStackId(id: number): Promise<Card[]> {
    const cards = await this.cardModel.findAll({
      where: {
        StackId: id,
      },
    });
    const sortedCards = [...cards].sort((a, b) => a.id - b.id)
    return sortedCards
  }
  async changeLevel(id: number, level: string): Promise<Card | null> {
    await this.cardModel.update(
      { level: +level },
      {
        where: {
          id
        },
      },
    );
    const card = await this.cardModel.findOne({where: {
      id
    }})
   return card
  }

  async deleteCard(id: number): Promise<Card | null> {
    const card = await this.cardModel.findOne({ where: { id } });
    this.cardModel.destroy({
      where: {
        id
      },
    });
    return card;
  }

  async deleteCardByStackId(id: number): Promise<number> {
    return this.cardModel.destroy({
      where: {
        StackId: id,
      },
    });
  }

  async updateCard(data: CreateCardDto, id: number) {
    await this.cardModel.update(
      {
       ...data
      },
      {
        where: {
          id
        },
      },
    );
    const updatedCard = await this.cardModel.findOne({where: {id}})
    return updatedCard
  }

  async getByLevel(id: number, level: number): Promise<Card[] | undefined> {
    const cards = await this.cardModel.findAll({
      where: {
        StackId: id,
        level
      },
    });
      const sortedCards = [...cards].sort((a, b) => a.id - b.id)
    return sortedCards
  }

}
