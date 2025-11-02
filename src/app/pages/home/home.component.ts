import { NgFor, NgIf } from '@angular/common';
import { Component, computed, signal, effect, OnInit, inject, Injector } from '@angular/core';
import { Tasks } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks = signal<Tasks[]>([]);
  filter = signal<'all'| 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
  const filter = this.filter();
  const tasks = this.tasks();
      if(filter === 'pending'){
        return tasks.filter(task => !task.completed)
      }
      if(filter === 'completed'){
        return tasks.filter(task => task.completed)
      }
      return tasks;
    })

    newTaskCtrl = new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    })

    injector = inject(Injector);

    ngOnInit(){
      const storage = localStorage.getItem('tasks');
      if(storage){
        const tasks = JSON.parse(storage);
        console.log(tasks);
        this.tasks.set(tasks);
      }
      this.trackTasks();
    }

    trackTasks(){
      effect(() => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, {injector: this.injector});
    }

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
              text: value,
              editing: false
            }
          }
          return task;
        })
      })
    }

    changeFilter(filter: 'all' | 'pending' | 'completed'){
      this.filter.set(filter);
    }
}
