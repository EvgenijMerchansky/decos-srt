import { Component, OnInit } from '@angular/core';
import {ServicePosts} from '../../services/app.service.posts';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private loading = true;

  constructor(
    private postsService: ServicePosts,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const userId: number = +this.route.snapshot.paramMap.get('userId');
    const postId: number = +this.route.snapshot.paramMap.get('id');

    this.getUser(userId);
    this.getPost(postId);
  }

  public getUser(userId: number): void {
    this.postsService
      .GetUserAsync(userId).subscribe(() => {
        this.loading = false;
      });
  }

  public getPost(postId: number): void {
    this.postsService
      .GetPostAsync(postId).subscribe(() => {
        this.loading = false;
      });
  }
}
