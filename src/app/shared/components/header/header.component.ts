import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'Shop';

}
