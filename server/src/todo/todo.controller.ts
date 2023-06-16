import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  @Get('user-todos')
  @HttpCode(HttpStatus.OK)
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
  @Patch('todos/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: TodoDto,
  ): Promise<TodoDto> {
    updateTodoDto.id = id;
    return this.todosServise.update(updateTodoDto);
  }

  @UseGuards(TokenAuthGuard)
  @Delete('todos/completed')
  @HttpCode(HttpStatus.OK)
  removeCompleted(@Req() request: UserRequest): Promise<{ message: string }> {
    const userId = request.user.id;
    return this.todosServise.deleteCompleted(userId);
  }

  @UseGuards(TokenAuthGuard)
  @Delete('todos/:id')
  @HttpCode(HttpStatus.OK)
  removeOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.todosServise.deleteOne(id);
  }
}
