import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface IPost {
  body: string;
  id: string;
  title: string;
  userId: number;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  };
  phone: string;
  website: string;
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  };
}

export interface INewPost {
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicePosts {
  public readonly apiBase: string = 'https://jsonplaceholder.typicode.com';

  public postsRef: AngularFireList<IPost[]>;
  public posts: IPost[] = [];
  public users: IUser[] = [];
  public post: IPost = undefined;
  public user: IUser = undefined;

  constructor(
    public http: HttpClient,
    public db: AngularFireDatabase) {
    this.postsRef = db.list('posts');
  }

  public GetPostsAsync(): Observable<IPost[]> {
    return this.db
      .list<IPost>('posts')
      .valueChanges()
      .pipe(tap(posts => posts));
  }

  public GetPostAsync(postId: string): Observable<IPost> {
    return this.db
      .list<IPost>('posts')
      .valueChanges()
      .pipe(map(posts => {
        const postIndex = posts.findIndex(post => post.id === postId);

        return posts[postIndex];
      }));
  }

  public GetUserAsync(userId: number): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.apiBase}/users/${userId}`)
      .pipe(tap(data => data));
  }

  public GetUsersAsync(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${this.apiBase}/users`)
      .pipe(tap(data => this.users = data));
  }

  public async CreatePostAsync(newPost: INewPost) {
    const postKey = this.db.list('posts')
      .push(newPost).key;

    const updates = {};
    updates['posts/' + postKey] = {...newPost, id: postKey};

    await this.db.database.ref().update(updates);
  }

  public async ChangeSocketValue(value: any): Promise<void> {
    await this.db.database
      .ref('example')
      .update({data: value});
  }
}
