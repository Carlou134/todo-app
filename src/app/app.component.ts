import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'Hola!';
  tasks = [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente'
  ]
}
