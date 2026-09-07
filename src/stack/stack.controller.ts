import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StackService } from './stack.service.js';
import { Stack } from './stack.entity.js';
@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}
  @Post(':userId')
  async createStack(@Param('userId', ParseIntPipe) userId: number, @Body() data: { name: string }): Promise<Stack> {
    return this.stackService.createStack(userId, data.name);
  }
  @Get()
  async getAll(): Promise<Stack[]> {
    return this.stackService.getAll();
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Stack[]> {
    return this.stackService.getById(id);
  }
  @Patch(':id')
  async updateStack(@Param('id', ParseIntPipe) id: number, @Body() data: { name: string }) {
    this.stackService.updateStack(data.name, id);
    return {
      name: data.name,
      id: +id
    }
  }
  @Delete(':id')
  async deleteStack(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.stackService.deleteStack(id);
  }
}
