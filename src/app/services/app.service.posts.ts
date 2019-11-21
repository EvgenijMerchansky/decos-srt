import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
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

    public posts: IPost[] = [];
    public post: IPost = undefined;
    public user: IUser = undefined;

    constructor(public http: HttpClient) { }

    public GetPostsAsync(): Observable<IPost[]> {
        return this.http
            .get<IPost[]>(`${this.apiBase}/posts?_limit=15`)
            .pipe(tap(data => {
              this.posts = data.map(it => {
                const tempFirst = it.title.slice(0, 1).toLocaleUpperCase();
                const tempLast = it.title.slice(1, it.title.length);
                it.title = tempFirst + tempLast;
                return it;
              });

              return data;
            }));
    }

    public GetPostAsync(postId: number): Observable<IPost> {
        return this.http
            .get<IPost>(`${this.apiBase}/posts/${postId}`)
            .pipe(tap(data => this.post = data));
    }

    public GetUserAsync(userId: number): Observable<IUser> {
        return this.http
            .get<IUser>(`${this.apiBase}/users/${userId}`)
            .pipe(tap(data => this.user = data));
    }

    public CreatePostAsync(newPost: INewPost): Observable<any> {
        return this.http.post(`${this.apiBase}/posts`, newPost);
    }
}
