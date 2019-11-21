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
  private loading = true;

  constructor(
    private postsService: ServicePosts,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    const postId: number = +this.route.snapshot.paramMap.get('id');

    this.getPost(postId);
  }

  public getPost(postId: number) {
    this.postsService
      .GetPostAsync(postId)
      .subscribe(() => {
        this.getUser(this.postsService.post.userId);
      });
  }

  public getUser(userId: number): void {
    this.postsService
      .GetUserAsync(userId)
      .subscribe(() => {
        this.spinner.hide();
      });
  }
}
