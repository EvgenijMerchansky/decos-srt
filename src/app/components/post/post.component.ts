import { Component, OnInit } from '@angular/core';
import { ServicePosts } from 'src/app/services/app.service.posts';
import { ActivatedRoute } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    public postsService: ServicePosts,
    public route: ActivatedRoute,
    public spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.spinner.show();
    const postId: string = this.route.snapshot.paramMap.get('id');

    await this.getPost(postId);
  }

  public async getPost(postId: string): Promise<any> {
    await this.postsService.GetPostAsync(postId);

    await this.getUser(this.postsService.post.userId);

    await this.spinner.hide();
  }

  public async getUser(userId: number): Promise<any> {
    await this.postsService
      .GetUserAsync(userId)
      .subscribe(() => {
        this.spinner.hide();
      });
  }
}
