import { Component, OnInit } from '@angular/core';
import {IPost, ServicePosts} from '../services/app.service.posts';
import {NgxSpinnerService} from 'ngx-spinner';
import {IFakeError, IHttpError} from '../helpers/httpErrorHelper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, IFakeError {
  public posts: IPost[] = [];

  constructor(
    public postsService: ServicePosts,
    public router: Router,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getPosts();
  }

  public getPosts() {
    this.postsService.GetPostsAsync()
      .subscribe(posts => {
        this.posts = posts;
        this.spinner.hide();
      },
        err => this.printError(err));
  }

  public async printError(err: IHttpError): Promise<void> {
    await this.spinner.hide();
    window.alert(`Something was wrong: ${err.message}`);
    await this.router.navigate(['/']);
  }
}
