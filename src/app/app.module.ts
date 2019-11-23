import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BestComponent } from './best/best.component';

const appRoutes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
    data: { title: 'Home' }
  },
  {
    path: 'publish',
    component: PublishComponent,
    data: { title: 'Publish' }
  },
  {
    path: 'best',
    component: BestComponent,
    data: { title: 'Best' }
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
    BestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    FormsModule
  ],
  providers: [ServicePosts],
  bootstrap: [AppComponent]
})
export class AppModule { }
