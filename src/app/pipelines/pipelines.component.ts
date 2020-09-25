import { Component, OnInit } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { Pipeline } from '../models/pipeline.model';
import { PipelineService } from '../services/pipeline.service';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.css']
})
export class PipelinesComponent implements OnInit {

  loggedInUser: User;
  pipelines: Pipeline[] = [];

  constructor(
    private modalService: NzModalService,
    private userService: UserService,
    private pipelineService: PipelineService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();

    // Pipelines
    this.pipelineService.getPipelines(this.loggedInUser._id).subscribe(res => {
      this.pipelines = res;
    });
  }

  ngOnInit() {
  }

  // Fetch Pipelines
  fetchPipelines() {
    this.pipelineService.getPipelines(this.loggedInUser._id).subscribe(res => {
      this.pipelines = res;
    });
  }

  // Delete Pipeline
  deletePipeline(id) {
    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: 'Confirm Delete Pipeline',
      nzContent: 'Are you sure you want to delete this pipeline?',
      nzOkText: 'Yes, Delete Pipeline',
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        // Delete Contact
        this.pipelineService.deletePipeline(id).subscribe(res => {
          if(res) {
            this.fetchPipelines();
          }
        });
      }
    });
  }

}
