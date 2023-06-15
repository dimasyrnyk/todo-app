import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { UserRequest } from 'src/types/user-request.interface';
import { TokenAuthGuard } from 'src/token/token.guard';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller()
export class TodoController {
  constructor(private readonly todosServise: TodoService) {}

  @UseGuards(TokenAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('user-todos')
  getUserTodos(@Req() request: UserRequest): Promise<TodoDto[]> {
    const userId = request.user.id;
    return this.todosServise.getUserTodos(userId);
  }

  @UseGuards(TokenAuthGuard)
  @Post('todo')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTodo: CreateTodoDto): Promise<TodoDto> {
    return this.todosServise.create(createTodo);
  }

  @UseGuards(TokenAuthGuard)
  @Patch('todo')
  @HttpCode(HttpStatus.OK)
  update(@Body() updateTodo: TodoDto): Promise<TodoDto> {
    return this.todosServise.update(updateTodo);
  }
}
