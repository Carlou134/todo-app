import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Tasks } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
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

    newTaskCtrl = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    })

    changeHandler(){
      if(this.newTaskCtrl.valid){
        const value = this.newTaskCtrl.value.trim();
        if(value)
        {
          this.addTask(value);
          this.newTaskCtrl.setValue('');
        }
      }
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

    updateTask(index: number){
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if(position === index){
            return {
              ...task,
              completed: !task.completed
            }
          }
          return task;
        })
      })
    }

    updateTaskEditingMode(index: number){
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if(position === index){
            return {
              ...task,
              editing: true
            }
          }
          return {
            ...task,
            editing: false
          };
        })
      })
    }

    updateTaskText(index: number, event: Event){
      const input = event.target as HTMLInputElement;
      const value = input.value;
      this.tasks.update((tasks) => {
        return tasks.map((task, position) => {
          if(position === index){
            return {
              ...task,
              text: input.value,
              editing: false
            }
          }
          return task;
        })
      })
    }
}
