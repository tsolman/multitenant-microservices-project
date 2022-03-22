import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceDto } from 'src/workspace/dto/workspace.dto';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  create(workspace: WorkspaceDto): Promise<Workspace> {
    return this.workspaceRepository.save(workspace);
  }

  findAll(): Promise<WorkspaceDto[]> {
    return this.workspaceRepository.find();
  }
}
