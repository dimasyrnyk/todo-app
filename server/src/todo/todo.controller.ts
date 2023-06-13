import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { UserRequest } from 'src/types/user-request.interface';

@Controller()
export class TodoController {
  constructor(private readonly todosServise: TodoService) {}

  @HttpCode(HttpStatus.OK)
  @Get('user-todos')
  getUserTodos(@Req() request: UserRequest): Promise<Todo[]> {
    const userId = request.user.id;
    return this.todosServise.getUserTodos(userId);
  }
}
