import { Post } from "@prisma/client";

export class PostEntity implements Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  authorId: string;

  constructor(post: PostEntity) {
    Object.assign(this, post);
  }

  static mock(partial?: Partial<Post>): PostEntity {
    return new PostEntity({
      id: 'mock-id',
      title: 'Mock Title',
      content: 'This is a mock content',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: 'mock-author',
      authorId: 'mock-author-id',
      ...partial,
    });
  }
}
