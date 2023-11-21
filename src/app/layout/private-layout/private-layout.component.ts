import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css']
})
export class PrivateLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("I am Private Layout");
  }

}
