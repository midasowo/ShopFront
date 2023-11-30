import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: Array<string> = [];
  subject = new Subject<Array<string>>()

  add(message: string) {
    this.messages.push(message)
    this.subject.next(this.messages)
  }

  clear() {
    this.messages = []
  }
}
