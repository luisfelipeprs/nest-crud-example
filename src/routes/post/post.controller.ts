import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from '../../entities/post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    console.log('Fetching all posts');
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    console.log(`Fetching post with id: ${id}`);
    return this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() post: PostEntity) {
    console.log('Creating new post:', post);
    const createdPost = await this.postService.createPost(post);
    return { message: 'Post created successfully', post: createdPost };
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() post: PostEntity) {
    console.log(`Updating post with id: ${id}`);
    const updatedPost = await this.postService.updatePost(id, post);
    return { message: 'Post updated successfully', post: updatedPost };
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    console.log(`Deleting post with id: ${id}`);
    await this.postService.deletePost(id);
    return { message: 'Post deleted successfully' };
  }
}