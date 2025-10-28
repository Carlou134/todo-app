import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente'
  ];
  name = "Carlos";
  age = 22;
  disabled = true;
  img = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg";

  person = {
    name: "Carlos",
    age: 22
  }
}
