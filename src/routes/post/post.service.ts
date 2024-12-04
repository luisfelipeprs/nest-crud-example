import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../database/repositories/post.repository';
import { PostEntity } from '../../entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts() {
    const posts = await this.postRepository.findAll();
    if (!posts.length) throw new NotFoundException('No posts found');
    return posts.map((post) => new PostEntity(post));
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return new PostEntity(post);
  }

  async createPost(post: PostEntity) {
    return await this.postRepository.create(post);
  }

  async updatePost(id: string, post: PostEntity) {
    const updatedPost = await this.postRepository.update(id, post);
    if (!updatedPost) throw new NotFoundException(`Post with id ${id} not found`);
    return new PostEntity(updatedPost);
  }

  async deletePost(id: string) {
    const deleted = await this.postRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Post with id ${id} not found`);
    return deleted;
  }
}
