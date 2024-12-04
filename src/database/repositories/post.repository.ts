import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostEntity } from '../../entities/post.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository {
  private collection: Prisma.PostDelegate;

  constructor(private readonly prisma: PrismaService) {
    this.collection = prisma.post;
  }

  findAll() {
    return this.collection.findMany();
  }


  findById(id: string) {
    return this.collection.findUnique({ where: { id } });
  }

  async create(post: PostEntity) {
    const { author, ...postData } = post;

    const postToCreate = {
      ...postData,
      authorId: post.authorId,
    };

    return this.collection.create({ data: postToCreate });
  }

  async update(id: string, post: Partial<PostEntity>) {
    const { authorId, ...postData } = post;

    const postToUpdate: Prisma.PostUpdateInput = {
      ...postData,
      author: authorId ? { connect: { id: authorId } } : undefined,
    };

    return this.collection.update({
      where: { id },
      data: postToUpdate,
    });
  }


  delete(id: string) {
    return this.collection.delete({ where: { id } });
  }
}