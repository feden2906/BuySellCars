import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param, Patch,
  Put,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoleDecorator } from '../../common/decorators/role.decorator';
import { ERole } from '../../common/enum/role.enum';
import { BlockGuard } from '../../common/guards/banned.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { ManagerService } from './manager.service';

@ApiBearerAuth()
@ApiTags('Manager')
@RoleDecorator(ERole.MANAGER, ERole.ADMIN)
@UseGuards(AuthGuard(), RoleGuard, BlockGuard)
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiOperation({ summary: 'Block user' })
  @Patch(':userId')
  async blockUser(@Param('userId') userId: string): Promise<void> {
    await this.managerService.blockUser(userId);
  }

  @ApiOperation({ summary: 'Unblock user' })
  @Put(':userId')
  async unblockUser(@Param('userId') userId: string): Promise<void> {
    await this.managerService.unblockUser(userId);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUserById(@Param('userId') userId: string): Promise<void> {
    await this.managerService.deleteUser(userId);
  }
}
