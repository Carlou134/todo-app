import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Tasks } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Tasks[]>([
    {
      id: Date.now(),
      title: "Crear Proyecto",
      completed: false
    },
    {
      id: Date.now(),
      title: "Crear componente",
      completed: false
    },
    ]);

    changeHandler(event: Event){
      const input = event.target as HTMLInputElement;
      const newTask = input.value;
      this.addTask(newTask);
    }

    addTask(title: string){
      const newTask = {
        id: Date.now(),
        title: title,
        completed: false
      }
      this.tasks.update((tasks) => [...tasks, newTask]);
    }

    deleteTask(index: number){
      this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
    }
}
