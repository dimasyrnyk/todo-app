import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async getUserTodos(id: string): Promise<TodoDto[]> {
    const todos = await this.todoModel.find({ creator: id }).exec();
    return todos.map((todo) => new TodoDto(todo));
  }

  async create(createTodo: CreateTodoDto): Promise<TodoDto> {
    const createdTodo = await this.todoModel.create(createTodo);
    const todoDto = new TodoDto(createdTodo);
    return todoDto;
  }
}
