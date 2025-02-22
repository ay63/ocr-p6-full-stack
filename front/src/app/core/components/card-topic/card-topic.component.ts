import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Topic} from "../../../features/topic/interfaces/topic";

@Component({
  selector: 'app-card-topic',
  templateUrl: './card-topic.component.html',
  styleUrl: './card-topic.component.scss',
  standalone: false
})
export class CardTopicComponent implements OnInit {
  cols: number = 2;

  @Input()
  public cardItems$!: Observable<Topic[]>;

  @Output()
  onBtnAction: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  canUnsubscribe!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      this.cols = result.matches ? 1 : 2;
    });
  }

  onButtonClick(itemId: number) {
    this.onBtnAction.emit(String(itemId));
  }

  trackById(index: number, item: Topic): number {
    return item.id;
  }
}
