import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CollabService } from './collab.service';
import { CollabDto } from 'src/dto/collab.dto';
import { User } from 'src/todo/user.decorator';
import { JwtAuthGuard } from 'src/user-auth/jwt-auth/jwt.auth.guard';

@Controller('collab')
export class CollabController {
  constructor(private readonly collabService: CollabService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCollaborator(
    @Body() payload: CollabDto,
    @User('id') userId: string,
  ) {
    return await this.collabService.createCollab(payload, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCollaborators() {
    return await this.collabService.getCollabs();
  }
}
