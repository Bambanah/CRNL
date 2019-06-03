import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { DataSource } from '@angular/cdk/collections';

import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  constructor(private api: ApiService, public auth: AuthService) {}

  loading = true;
  posts: any;

  faTimes = faTimes;

  ngOnInit() {
    this.api.getPosts().subscribe(
      res => {
        this.posts = res;
        this.posts.forEach(post => {
          let date = new Date(post.createdAt);
          post.createdAt = date.toDateString();
        });
        this.loading = false;
      },
      err => {
        console.warn(err);
      }
    );
  }

  deletePost(postId: string) {
    this.api.deletePost(postId).subscribe(data => {});
    this.posts = this.posts.filter(post => {
      return post._id != postId;
    });
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getPosts();
  }

  disconnect() {}
}
