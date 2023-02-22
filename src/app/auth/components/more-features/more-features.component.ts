import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-more-features',
  templateUrl: './more-features.component.html',
  styleUrls: ['./more-features.component.css']
})
export class MoreFeaturesComponent {
  @Output() changeView: EventEmitter<boolean> = new EventEmitter();

  change(value: boolean): void {
    this.changeView.emit(value);
  }

}
