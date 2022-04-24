import { Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  async getAllComments() {
    return 'getall comments';
  }
  async createComments(id: string, comments: CommentsCreateDto) {
    return 'hello world';
  }
}
