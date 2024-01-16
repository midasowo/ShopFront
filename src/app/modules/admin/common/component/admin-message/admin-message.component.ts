import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../../shared/shared.module";
import {AdminMessageService} from "../../service/admin-message.service";

@Component({
  selector: 'app-admin-message',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-message.component.html',
  styleUrl: './admin-message.component.scss'
})
export class AdminMessageComponent implements OnInit, OnDestroy {

  messages: Array<string> = [];
  private clickCounter = 0

  constructor(private adminMessageService: AdminMessageService) {
  }

  ngOnInit(): void {
    this.adminMessageService.subject.subscribe(messages => {
      this.messages = messages
      this.timeoutCloseMessages();
    })
  }

  clearMessages() {
    this.messages = []
    this.adminMessageService.clear()
  }

  private timeoutCloseMessages() {
    this.clickCounter++
    setTimeout(() => {
      if (this.clickCounter == 1) {
        this.clearMessages()
      }
      this.clickCounter--
    }, 10000)
  }

  ngOnDestroy(): void {
    this.adminMessageService.subject.unsubscribe()
  }
}
