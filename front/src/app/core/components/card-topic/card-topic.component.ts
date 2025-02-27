import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Topic} from "../../../features/topic/interfaces/topic";
import {BreakpointService} from "../../services/breakpoint/breakpoint.service";
import {UnsubscribeObservableService} from "../../services/unsubsribe-observable/unsubscribe-observable.service";

@Component({
  selector: 'app-card-topic',
  templateUrl: './card-topic.component.html',
  styleUrl: './card-topic.component.scss',
  standalone: false
})
export class CardTopicComponent implements OnInit {
  cols!: Observable<number>;


  @Input()
  public cardItems$!: Observable<Topic[]>;

  @Output()
  onBtnAction: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  canUnsubscribe!: boolean;

  constructor(private breakpointService: BreakpointService,
              private unsubscribeObservableService: UnsubscribeObservableService) {
  }

  ngOnInit(): void {
    this.cardItems$.pipe(this.unsubscribeObservableService.takeUntilDestroy).subscribe(items => {
        this.cols = this.breakpointService.gridBreakPoint(items);
      }
    )
  }

  onButtonClick(itemId: number) {
    this.onBtnAction.emit(String(itemId));
  }

  trackById(index: number, item: Topic): number {
    return item.id;
  }
}
