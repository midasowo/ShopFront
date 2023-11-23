import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-full-page-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FlexLayoutModule, RouterLink],
  templateUrl: './full-page-admin.component.html',
  styleUrl: './full-page-admin.component.scss'
})
export class FullPageAdminComponent {

}
