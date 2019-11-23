import { Component, OnInit } from '@angular/core';
import {INewPost, ServicePosts} from '../services/app.service.posts';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  public title = '';
  public description = '';
  public formIsValid = false;

  constructor(
    public postService: ServicePosts,
    public router: Router,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  public validate = ($event: any): void => {
    const data = $event.trim();

    if (data === '' || data === ' ' || this.title.length < 10 || this.description.length < 50) {
      this.formIsValid = false;
      return;
    }

    this.formIsValid = true;
  }

  public onSubmit = (): void => {
    this.spinner.show();
    const newPost = this.generateNewPost();
    this.postService.CreatePostAsync(newPost);
    this.cleanFields();
    this.spinner.hide();
    window.alert('✓ new post successfully published!');
    this.router.navigate(['posts']);
  }

  public cleanFields = (): void => {
    this.title = '';
    this.description = '';
  }

  public generateNewPost = (): INewPost => {
    return {
      title: this.title,
      body: this.description,
      userId: this.generateRandomUserId()
    };
  }

  public generateRandomUserId = (): number => {
    return Math.round(Math.random() * 10);
  }
}
