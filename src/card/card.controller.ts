import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ChangeLevelDto, CreateCardDto } from './dto/CardDto';
import { CardService } from './card.service';
import { Card } from './card.entity';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @Post(':id')
  async createCard(
    @Body() cardData: CreateCardDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Card> {
    return this.cardService.createCard(cardData, id);
  }
  @Get('/getById/:id')
  async getCardsByStackId(@Param('id', ParseIntPipe) id: number): Promise<Card[]> {
    return this.cardService.getCardsByStackId(id);
  }
  @Get('/getByLevel/:id')
  async gelByLevel(
    @Query('level', ParseIntPipe) level: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Card[] | undefined> {
    return this.cardService.getByLevel(id, level);
  }
  @Patch('/changeLevel/:id')
  async changeLevel( @Body() level: ChangeLevelDto, @Param('id', ParseIntPipe) id: number,): Promise<Card | null> {
    console.log(level)
    return this.cardService.changeLevel(id, level.level);
  }
  @Delete(':id')
  async deleteCard(@Param('id', ParseIntPipe) id: number): Promise<Card | null> {
    return this.cardService.deleteCard(id);
  }
  @Patch(':id')
  async updateCard(@Body() updateData: CreateCardDto, @Param('id', ParseIntPipe) id: number): Promise<Card | null> {
    return this.cardService.updateCard(updateData, id);
  }
 
}
