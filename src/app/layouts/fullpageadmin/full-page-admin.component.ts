import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-full-page-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, RouterLink],
  templateUrl: './full-page-admin.component.html',
  styleUrl: './full-page-admin.component.scss'
})
export class FullPageAdminComponent {

}
