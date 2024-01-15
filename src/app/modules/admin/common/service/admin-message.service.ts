import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: Array<string> = [];
  subject = new Subject<Array<string>>()

  add(message: string) {
    this.clear()
    this.messages.push(message)
    this.subject.next(this.messages)
  }

  clear() {
    this.messages = []
  }

  addBackendErrors(error: any) {
    this.clear()
    this.readErrors(error);
    this.subject.next(this.messages)
  }

  private readErrors(error: any) {
    if (error.errors?.length > 0) {
      for (let message of error.errors) {
        this.messages.push("Field: " + message.field + " -> " + message.defaultMessage)
      }
    } else {
      this.messages.push(error.message)
    }
  }
}
