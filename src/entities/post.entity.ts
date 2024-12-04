import { Post } from "@prisma/client";
import { UserEntity } from "./user.entity";

export class PostEntity implements Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author?: UserEntity | null;
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
      author: null,
      authorId: 'mock-author-id',
      ...partial,
    });
  }
}
