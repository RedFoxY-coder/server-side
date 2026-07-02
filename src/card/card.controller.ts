import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCardDto } from './dto/CardDto';
import { CardService } from './card.service';
import { Card } from './card.entity';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @Post(':id')
  async createCard(
    @Body() cardData: CreateCardDto,
    @Param('id') id: string,
  ): Promise<Card> {
    console.log(cardData);
    return this.cardService.createCard(cardData, id);
  }
  @Get('/getById/:id')
  async getCardsByStackId(@Param('id') id: string): Promise<Card[]> {
    console.log(id);
    return this.cardService.getCardsByStackId(id);
  }
  @Get('/getByLevel/:id')
  async gelByLevel(
    @Query('level') level: string,
    @Param('id') id: string,
  ): Promise<Card[] | undefined> {
    console.log(level);
    return this.cardService.getByLevel(id, level);
  }
  @Patch('/changeLevel/:id')
  async levelUp(@Param('id') id: string, @Query('level') level: string) {
    return this.cardService.changeLevel(id, level);
  }
  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<Card | null> {
    return this.cardService.deleteCard(id);
  }
  @Patch(':id')
  async updateCard(@Body() updateData: CreateCardDto, @Param('id') id: string) {
    return this.cardService.updateCard(updateData, id);
  }
}
