import { Component, Input, OnInit } from '@angular/core';

import { IMessage } from '@interfaces/message.interface';

import { messages } from '@constants/messages.constant';

@Component({
  selector: 'app-no-feeds',
  templateUrl: './no-feeds.component.html',
  styleUrls: ['./no-feeds.component.css']
})
export class NoFeedsComponent implements OnInit {
  @Input() messageIndex = 0;
  public messageSelected: IMessage;

  ngOnInit(): void {
    this.messageSelected = messages[+this.messageIndex];
  }

}
