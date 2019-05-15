import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  constructor(private api: ApiService) {}

  loading = true;
  posts: any;

  ngOnInit() {
    this.api.getPosts().subscribe(
      res => {
        console.log(res);
        this.posts = res;
        this.posts.forEach(post => {
          let date = new Date(post.createdAt);
          post.createdAt = date.toDateString();
        });
        this.loading = false;
      },
      err => {
        console.error(err);
      }
    );
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
