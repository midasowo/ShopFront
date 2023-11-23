import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SidebarComponent} from "../../shared/components/sidebar/sidebar.component";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent, SidebarComponent, SharedModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
