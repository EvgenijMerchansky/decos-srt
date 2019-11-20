import { Component, OnInit } from '@angular/core';
import { ServicePosts } from '../services/app.service.posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private loading: boolean = true;

  constructor(private postsService: ServicePosts) { }

  ngOnInit() {
    this.getPosts();
  }

  public getPosts(): void {
    this.postsService.GetPostsAsync().subscribe(() => {
      this.loading = false;
    });
  }
}
