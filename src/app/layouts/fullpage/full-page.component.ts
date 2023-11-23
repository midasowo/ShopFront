import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-full-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, SharedModule],
  templateUrl: './full-page.component.html',
  styleUrl: './full-page.component.scss'
})
export class FullPageComponent {

}
