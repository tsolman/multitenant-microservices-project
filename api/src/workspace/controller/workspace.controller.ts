import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkspaceDto } from '../dto/workspace.dto';
import { WorkspaceService } from '../service/workspace.service';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Get('/')
  getAll(): Promise<WorkspaceDto[]> {
    return this.workspaceService.findAll();
  }
  @Post('/')
  create(@Body() data: WorkspaceDto): Promise<WorkspaceDto> {
    return this.workspaceService.create(data);
  }
}
