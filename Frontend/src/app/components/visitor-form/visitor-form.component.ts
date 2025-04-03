import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitorService } from '../../services/visitor.service';
import { Visitor } from '../../models/visitor.model';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.css']
})
export class VisitorFormComponent implements OnInit {
  visitorForm: FormGroup;
  isEditMode = false;
  visitorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.visitorForm = this.fb.group({
      consumerName: ['', Validators.required],
      consumerNumber: ['', Validators.required],
      subcdStatus: ['', Validators.required],
      installationStatus: ['', Validators.required],
      reasonNotDone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.visitorId = +id;
      this.loadVisitor(this.visitorId);
    }
  }

  loadVisitor(id: number): void {
    this.visitorService.getVisitor(id).subscribe(visitor => {
      const mappedVisitor = {
        consumerName: visitor.consumerName || '',
        consumerNumber: visitor.consumerNumber || '',
        subcdStatus: visitor.subcdStatus || '',
        installationStatus: visitor.installationStatus || '',
        reasonNotDone: visitor.reasonNotDone || '',
        address: visitor.address || ''
      };
      this.visitorForm.patchValue(mappedVisitor);
    });
  }

  onSubmit(): void {
    if (this.visitorForm.valid) {
      const visitorData = this.visitorForm.value;
      
      if (this.isEditMode && this.visitorId) {
        this.visitorService.updateVisitor(this.visitorId, visitorData)
          .subscribe(() => this.router.navigate(['/dashboard']));
      } else {
        this.visitorService.createVisitor(visitorData)
          .subscribe(() => this.router.navigate(['/dashboard']));
      }
    }
  }
}