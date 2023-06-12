import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todosServise: TodoService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUserTodos(@Param('id') id: string): Promise<Todo[]> {
    return this.todosServise.getUserTodos(id);
  }
}
