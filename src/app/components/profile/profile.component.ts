import { Component, OnInit } from '@angular/core';
import {ServicePosts} from '../../services/app.service.posts';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public postsService: ServicePosts,
    public route: ActivatedRoute,
    public spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.spinner.show();
    const userId: number = +this.route.snapshot.paramMap.get('userId');
    const postId: string = this.route.snapshot.paramMap.get('id');

    this.getUser(userId);
    this.getPost(postId);
  }

  public async getUser(userId: number): Promise<void> {
    this.postsService
      .GetUserAsync(userId).subscribe(() => {
        this.spinner.hide();
      });
  }

  public async getPost(postId: string): Promise<void> {
    await this.postsService.GetPostAsync(postId);
  }
}
