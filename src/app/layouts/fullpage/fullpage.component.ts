import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-fullpage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, FlexLayoutModule],
  templateUrl: './fullpage.component.html',
  styleUrl: './fullpage.component.scss'
})
export class FullpageComponent {

}
