import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StackService } from './stack.service.js';
import { Stack } from './stack.entity.js';
@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}
  @Post()
  async createStack(@Body() data: { name: string }): Promise<Stack> {
    return this.stackService.createStack(data.name);
  }
  @Get()
  async getAll(): Promise<Stack[]> {
    return this.stackService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Stack[]> {
    return this.stackService.getById(id);
  }
  @Patch(':id')
  async updateStack(@Param('id') id: string, @Body() data: { name: string }) {
    return this.stackService.updateStack(data.name, id);
  }
  @Delete(':id')
  async deleteStack(@Param('id') id: string): Promise<string> {
    return this.stackService.deleteStack(id);
  }
}
