import { Component, OnInit } from '@angular/core';
import {IPost, IUser, ServicePosts} from 'src/app/services/app.service.posts';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {IFakeError, IHttpError} from '../../helpers/httpErrorHelper';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, IFakeError {
  public post: IPost = undefined;
  public user: IUser = undefined;

  constructor(
    public postsService: ServicePosts,
    public route: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    const postId: string = this.route.snapshot.paramMap.get('id');

    this.getPost(postId);
  }

  public getPost(postId: string) {
    this.postsService.GetPostAsync(postId)
      .subscribe(post => {
        this.post = post;
        this.getUser(post.userId);
      },
        err => this.printError(err));
  }

  public getUser(userId: number) {
    this.postsService.GetUserAsync(userId)
      .subscribe(user => {
        this.user = user;
        this.spinner.hide();
      },
        err => this.printError(err));
  }

  public async printError(err: IHttpError): Promise<void> {
    await this.spinner.hide();
    window.alert(`Something was wrong: ${err.message}`);
    await this.router.navigate(['/posts']);
  }
}
