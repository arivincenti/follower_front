import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() originalArray: any[];
  @Output() transformArray = new EventEmitter<any[]>();

  filterArray: any[];
  
  constructor() { }
  
  ngOnInit() {}

  filtrar(filter: string)
  {
    switch (filter)
    {
      case 'inactive': {
        this.filterArray = this.originalArray;
        this.filterArray = this.originalArray.filter(res => res.deleted_at);
        this.transformArray.emit(this.filterArray);
      };
        break;
      case 'active': {
        this.filterArray = this.originalArray;
        this.filterArray = this.originalArray.filter(res => !res.deleted_at);
        this.transformArray.emit(this.filterArray);
      };
        break;
      default: {
        this.filterArray = this.originalArray;
        this.transformArray.emit(this.filterArray);
      };
    }
  }

}
