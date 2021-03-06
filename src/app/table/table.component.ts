import { Component, OnInit } from '@angular/core';
import {IUser, ServicePosts} from '../services/app.service.posts';
import {NgxSpinnerService} from 'ngx-spinner';
import {IFakeError, IHttpError} from '../helpers/httpErrorHelper';
import {Router} from '@angular/router';

interface IName {
  text: string;
  value: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, IFakeError {
  public dataSet: IUser[] = [];
  public names: IName[] = [];
  public listOfSearchName: string[] = [];
  public sortName: string | null = null;
  public sortValue: string | null = null;
  public searchAddress: string;
  public tempData: IUser[] = [];
  public currentUserData: IUser = undefined;
  public activeUser: number = undefined;

  constructor(
    public postService: ServicePosts,
    public postsService: ServicePosts,
    public router: Router,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.postService.GetUsersAsync().subscribe(data => {
      this.dataSet = [...data];
      this.tempData = [...data];
      this.names = [...data.map(item => ({ text: item.name, value: item.name }))];
      this.spinner.hide();
    }, );
  }

  filter(names: string[], searchAddress: string): void {
    this.listOfSearchName = names;
    this.searchAddress = searchAddress;
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  public openProfile(id: number) {
    this.spinner.show();
    this.postsService.GetUserAsync(id).subscribe(data => {
      this.currentUserData = data;
      this.activeUser = id;
      this.spinner.hide();
    });
  }

  search(): void {
    this.currentUserData = undefined;
    const filterFunc = (item: IUser) =>
      (this.searchAddress ? 0 : true) &&
      (this.listOfSearchName.length ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.dataSet.filter(item => filterFunc(item));

    if (this.sortName && this.sortValue) {
      this.tempData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          // tslint:disable-next-line:no-non-null-assertion
          ? a[this.sortName!] > b[this.sortName!]
          ? 1
          : -1
          // tslint:disable-next-line:no-non-null-assertion
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.tempData = data;
    }
  }

  public async printError(err: IHttpError): Promise<void> {
    await this.spinner.hide();
    window.alert(`Something was wrong: ${err.message}`);
    await this.router.navigate(['/posts']);
  }
}
