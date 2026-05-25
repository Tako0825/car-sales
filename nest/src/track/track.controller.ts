import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { Validation } from 'src/common/validation/validation';
import { CreateTrackBatchDto } from './dto/create-track-batch.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('dashboard')
  async getDashboard() {
    return await this.trackService.getDashboard();
  }

  @Post('batch')
  @UsePipes(Validation)
  async createBatch(@Body() createTrackBatchDto: CreateTrackBatchDto) {
    return await this.trackService.createBatch(createTrackBatchDto);
  }
}
