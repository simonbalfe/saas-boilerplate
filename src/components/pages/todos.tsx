"use client";

import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = () => {
    if (newTodoText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setNewTodoText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
        <p className="text-base-content/70 mt-2">
          Keep track of your tasks and stay organized.
        </p>
      </div>

      {/* Stats */}
      <div className="stats shadow w-full bg-base-100 border border-base-200">
        <div className="stat">
          <div className="stat-title">Total Tasks</div>
          <div className="stat-value text-primary">{todos.length}</div>
          <div className="stat-desc">All time</div>
        </div>

        <div className="stat">
          <div className="stat-title">Active</div>
          <div className="stat-value text-secondary">{activeTodos.length}</div>
          <div className="stat-desc">Tasks remaining</div>
        </div>

        <div className="stat">
          <div className="stat-title">Completed</div>
          <div className="stat-value text-success">{completedTodos.length}</div>
          <div className="stat-desc">
            {todos.length > 0 ? `${Math.round((completedTodos.length / todos.length) * 100)}% done` : '0% done'}
          </div>
        </div>
      </div>

      {/* Add Todo Input */}
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          <h2 className="card-title text-lg">Add New Task</h2>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              className="input input-bordered flex-1"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary gap-2"
              onClick={addTodo}
            >
              <Plus className="h-5 w-5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Active Tasks</h2>
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-0">
              <ul className="divide-y divide-base-200">
                {activeTodos.map((todo) => (
                  <li key={todo.id} className="p-4 hover:bg-base-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-3 flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        <span className="text-base">{todo.text}</span>
                      </label>
                      <button
                        className="btn btn-ghost btn-sm btn-square text-error"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Completed Tasks</h2>
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-0">
              <ul className="divide-y divide-base-200">
                {completedTodos.map((todo) => (
                  <li key={todo.id} className="p-4 hover:bg-base-200 transition-colors opacity-60">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-3 flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-success"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        <span className="text-base line-through text-base-content/60">
                          {todo.text}
                        </span>
                      </label>
                      <button
                        className="btn btn-ghost btn-sm btn-square text-error"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="card bg-base-100 shadow-sm border border-base-200">
          <div className="card-body items-center text-center py-12">
            <Check className="h-16 w-16 text-base-content/20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
            <p className="text-base-content/60">
              Add your first task to get started!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
