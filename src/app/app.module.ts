import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PublishComponent } from './publish/publish.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ServicePosts } from './services/app.service.posts';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {
    path: '',
    component: PostsComponent,
    data: { title: 'Home' }
  },
  {
    path: 'posts',
    component: PostsComponent,
    data: { title: 'Posts' }
  },
  {
    path: 'publish',
    component: PublishComponent,
    data: { title: 'Publish' }
  },
  {
    path: 'posts/:id',
    component: PostComponent,
    data: { title: 'Post' }
  },
  {
    path: 'posts/:id/users/:userId',
    component: ProfileComponent,
    data: { title: 'Profile' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PublishComponent,
    HeaderComponent,
    NavigationComponent,
    PostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [ServicePosts],
  bootstrap: [AppComponent]
})
export class AppModule { }
