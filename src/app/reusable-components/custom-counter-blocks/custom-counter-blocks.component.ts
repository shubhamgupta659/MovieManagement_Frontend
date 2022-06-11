import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-counter-blocks',
  templateUrl: './custom-counter-blocks.component.html',
  styleUrls: ['./custom-counter-blocks.component.css']
})
export class CustomCounterBlocksComponent implements OnInit {
  @Input() tabsdata: Array<any>;
  @Output() public tabClickEvent = new EventEmitter();

  // public tabs = [
  //   {name: 'IT', count : 6, color:'rgb(224,57,6)', icon:'mdi-face-profile'},
  //   {name: 'HR', count : 2, color:'rgb(224,2,119)', icon:'mdi-face-profile'},
  //   {name: 'ACCOUNTS', count : 1, color:'rgb(173,7,85)', icon:'mdi-face-profile'}
  // ]

  constructor() { }

  ngOnInit() {
  }

  public tabclick(e){
    this.tabClickEvent.emit(e);
  }

}
