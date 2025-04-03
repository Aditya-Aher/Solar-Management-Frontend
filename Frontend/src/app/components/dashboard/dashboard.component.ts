import { Component, OnInit } from '@angular/core';
import { Visitor } from '../../models/visitor.model';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  visitors: Visitor[] = [];

  constructor(private visitorService: VisitorService) { }

  ngOnInit(): void {
    this.loadVisitors();
  }

  loadVisitors(): void {
    this.visitorService.getVisitors()
      .subscribe(visitors => this.visitors = visitors);
  }

  deleteVisitor(id: number): void {
    if (confirm('Are you sure you want to delete this visitor?')) {
      this.visitorService.deleteVisitor(id)
        .subscribe(() => {
          this.loadVisitors();
        });
    }
  }
}