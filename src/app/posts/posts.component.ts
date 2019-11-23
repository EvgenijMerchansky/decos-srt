import { Component, OnInit } from '@angular/core';
import { ServicePosts } from '../services/app.service.posts';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(
    public postsService: ServicePosts,
    public spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.spinner.show();
    this.getPosts();
  }

  public async getPosts(): Promise<void> {
    await this.postsService.GetPostsAsync();

    await this.spinner.hide();
  }
}
