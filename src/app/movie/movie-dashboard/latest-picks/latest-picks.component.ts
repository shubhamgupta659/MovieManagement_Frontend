import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'latest-picks',
  templateUrl: './latest-picks.component.html',
  styleUrls: ['./latest-picks.component.css']
})
export class LatestPicksComponent implements OnInit {
  
  @Input() value: Array<any>;
  @Output() public movieClickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showMovieDetails(id:number){
    this.movieClickEvent.emit(id+'');
  }

}
