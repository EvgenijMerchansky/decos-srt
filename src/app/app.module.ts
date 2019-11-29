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
import { MetricsComponent } from './metrics/metrics.component';
import { SplashComponent } from './splash/splash.component';
import {ServiceAuth} from './services/app.service.auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ChartsModule } from 'ng2-charts';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableComponent } from './table/table.component';

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
    path: 'metrics',
    component: MetricsComponent,
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
  },
  {
    path: 'table',
    component: TableComponent,
    data: { title: 'Table' }
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
    MetricsComponent,
    SplashComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChartsModule,
    NgZorroAntdModule,
    NzTableModule
  ],
  providers: [ServicePosts, ServiceAuth, AngularFirestore, AngularFireAuthGuardModule, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
