import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  categories = [
    'Kategoria 1',
    'Kategoria 2',
    'Kategoria 3',
    'Kategoria 4',
    'Kategoria 5'
  ]

}
