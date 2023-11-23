import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared.module";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Shop';

}
