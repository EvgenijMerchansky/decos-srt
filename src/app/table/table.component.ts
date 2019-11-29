import { Component, OnInit } from '@angular/core';
import {IUser, ServicePosts} from '../services/app.service.posts';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public dataSet: IUser[];

  constructor(public postService: ServicePosts) { }

  ngOnInit() {
    this.postService.GetUsersAsync().subscribe(data => {
      this.dataSet = [...data];
    });
  }
}
