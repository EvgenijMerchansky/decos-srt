import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

interface IFormProfile {
  valid: boolean;
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  private name = new FormControl('');
  private description = new FormControl('');
  private profileForm: IFormProfile;

  constructor() { }

  ngOnInit() {
  }

}
