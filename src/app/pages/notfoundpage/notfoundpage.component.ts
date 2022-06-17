import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfoundpage',
  templateUrl: './notfoundpage.component.html',
  styleUrls: ['./notfoundpage.component.css'],
})
export class NotfoundpageComponent {
  year = new Date().getFullYear();
}
