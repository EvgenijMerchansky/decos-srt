import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSignInClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  public onClick() {
    this.onSignInClick.emit();
  }
}
