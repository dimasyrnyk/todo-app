import { Injectable, NotFoundException } from '@nestjs/common';
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
    return todos.map((todo) => new TodoDto(todo)).reverse();
  }

  async searchTodos(
    searchTerm: string,
    isCompleted: boolean,
    userId: string,
  ): Promise<TodoDto[]> {
    const query = this.todoModel.find({
      creator: userId,
      title: { $regex: searchTerm, $options: 'i' },
    });

    if (typeof isCompleted !== 'undefined') {
      query.where('isCompleted', isCompleted);
    }

    const todos = await query.exec();

    return todos.map((todo) => new TodoDto(todo)).reverse();
  }

  async create(createTodo: CreateTodoDto): Promise<TodoDto> {
    const createdTodo = await this.todoModel.create(createTodo);
    const todoDto = new TodoDto(createdTodo);
    return todoDto;
  }

  async update(updateTodo: TodoDto): Promise<TodoDto> {
    const { id, ...updatedFields } = updateTodo;
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true },
    );

    const todoDto = new TodoDto(updatedTodo);
    return todoDto;
  }

  async deleteCompleted(userId: string): Promise<{ message: string }> {
    const result = await this.todoModel
      .deleteMany({
        creator: userId,
        isCompleted: true,
      })
      .exec();

    if (!result) {
      throw new NotFoundException('Todo not found');
    }

    return { message: 'All completed todos has been deleted' };
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    const deletedTodo = this.todoModel.findByIdAndRemove(id).exec();

    if (!deletedTodo) {
      throw new NotFoundException('Todo not found');
    }

    return { message: 'Todo has been deleted' };
  }
}
