import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FlexModule} from "@angular/flex-layout";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
