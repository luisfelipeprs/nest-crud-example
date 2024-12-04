import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { PostRepository } from './repositories/post.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository, PostRepository],
  exports: [PrismaService, UserRepository, PostRepository],
})
export class DatabaseModule {}