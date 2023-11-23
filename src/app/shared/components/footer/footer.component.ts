import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared.module";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
