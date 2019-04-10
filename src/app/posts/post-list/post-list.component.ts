import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { DataSource } from '@angular/cdk/collections';
import { getMatFormFieldDuplicatedHintError } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  constructor(private api: ApiService) {}

  posts: any;

  getAuthor(userId) {
    this.api.getUser(userId).subscribe(user => {
      return user.full_name;
    });
  }

  ngOnInit() {
    this.api.getPosts().subscribe(
      res => {
        this.posts = res;
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
