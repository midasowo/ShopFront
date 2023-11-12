import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
