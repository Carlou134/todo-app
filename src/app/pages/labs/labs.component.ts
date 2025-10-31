import { NgFor } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente'
  ]);
  name = signal("Carlos");
  age = 22;
  disabled = true;
  img = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg";

  person = {
    name: "Carlos",
    age: 22
  }

  clickHandler() {
    alert('Hola');
  }

  changeHandler(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}


