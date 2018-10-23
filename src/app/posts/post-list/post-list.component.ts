import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(private api: ApiService) { }

  posts: any;

  ngOnInit() {
    this.api.getPosts()
    .subscribe(res => {
      this.posts = res;
    }, err => {
      console.log(err);
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
