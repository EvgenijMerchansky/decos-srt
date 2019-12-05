import { Component, OnInit } from '@angular/core';
import {IPost, IUser, ServicePosts} from '../../services/app.service.posts';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {IFakeError, IHttpError} from '../../helpers/httpErrorHelper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, IFakeError {
  public user: IUser = undefined;
  public post: IPost = undefined;

  constructor(
    public postsService: ServicePosts,
    public route: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.spinner.show();
    const userId: number = +this.route.snapshot.paramMap.get('userId');
    const postId: string = this.route.snapshot.paramMap.get('id');

    this.getUser(userId);
    this.getPost(postId);
  }

  public getUser(userId: number) {
    this.postsService
      .GetUserAsync(userId).subscribe(user => {
        this.user = user;
        this.spinner.hide();
      });
  }

  public getPost(postId: string) {
    this.postsService.GetPostAsync(postId)
      .subscribe(post => {
        this.post = post;
        this.spinner.hide();
      }, err => this.printError(err));
  }

  public async printError(err: IHttpError): Promise<void> {
    await this.spinner.hide();
    window.alert(`Something was wrong: ${err.message}`);
    await this.router.navigate(['/posts']);
  }
}
