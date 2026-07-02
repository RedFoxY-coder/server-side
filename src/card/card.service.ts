import { Inject, Injectable } from '@nestjs/common';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/CardDto';
@Injectable()
export class CardService {
  constructor(
    @Inject('CARD_REPOSITORY') private readonly cardRepository: typeof Card,
  ) {}

  async createCard(createCardDto: CreateCardDto, id: string): Promise<Card> {
    return this.cardRepository.create({
      titleEn: createCardDto.titleEn,
      titleRu: createCardDto.titleRu,
      frontSide: createCardDto.frontSide,
      backSide: createCardDto.backSide,
      transcription: createCardDto.transcription,
      StackId: +id,
    });
  }
  async getCardsByStackId(id: string): Promise<Card[]> {
    return this.cardRepository.findAll({
      where: {
        StackId: +id,
      },
    });
  }
  async changeLevel(id: string, level: string) {
    return this.cardRepository.update(
      { level },
      {
        where: {
          id: +id,
        },
      },
    );
  }

  async deleteCard(id: string): Promise<Card | null> {
    const card = await this.cardRepository.findOne({ where: { id } });
    this.cardRepository.destroy({
      where: {
        id: +id,
      },
    });
    return card;
  }

  async deleteCardByStackId(id: string): Promise<number> {
    return this.cardRepository.destroy({
      where: {
        StackId: +id,
      },
    });
  }

  async updateCard(data: CreateCardDto, id: string) {
    return this.cardRepository.update(
      {
        titleEn: data.titleEn,
        titleRu: data.titleRu,
        frontSide: data.frontSide,
        backSide: data.backSide,
        transcription: data.transcription,
      },
      {
        where: {
          id: +id,
        },
      },
    );
  }
  async getByLevel(id: string, level: string): Promise<Card[] | undefined> {
    return this.cardRepository.findAll({
      where: {
        StackId: +id,
        level: +level,
      },
    });
  }
}
