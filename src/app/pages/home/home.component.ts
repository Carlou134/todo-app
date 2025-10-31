import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal([
      'Instalar el Angular CLI',
      'Crear proyecto',
      'Crear componente'
    ]);

    changeHandler(event: Event){
      const input = event.target as HTMLInputElement;
      const newTasks = input.value;
      this.tasks.update((tasks) => [...tasks, newTasks]);
    }

    deleteTask(index: number){
      this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
    }
}
