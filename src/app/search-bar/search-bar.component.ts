import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

export interface SortOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  majors = new FormControl();
  majorList: string[] = [
    'Computer Science',
    'Information Systems'
  ];

  minors = new FormControl();
  minorList: string[] = [
    'Computational and Simulation Science',
    'Business Process Management',
    'Data-centric Computing Extension',
    'Enterprise Systems',
    'User Experience',
    'Information Systems',
    'Intelligent Systems',
    'Mobile Applications',
    'Networks and Security'
  ];

  sortOptions: SortOptions[] = [
    {value: 'newest', viewValue: 'Newest'},
    {value: 'oldest', viewValue: 'Oldest'},
    {value: 'recommended', viewValue: 'Recommended'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
