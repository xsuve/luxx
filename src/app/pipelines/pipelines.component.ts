import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NzModalService } from 'ng-zorro-antd/modal';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

import { PipelineContact, Pipeline } from '../models/pipeline.model';
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
    private translate: TranslateService,
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

  // Get Pipeline Value
  getPipelineValue(pipelineContacts) {
    let sum = pipelineContacts.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
    return sum;
  }

  // Fetch Pipelines
  fetchPipelines() {
    this.pipelineService.getPipelines(this.loggedInUser._id).subscribe(res => {
      this.pipelines = res;
    });
  }

  // Delete Pipeline
  deletePipeline(id) {
    let deletePipelineTranslations = {
      title: 'Confirm Delete Pipeline',
      content: 'Are you sure you want to delete this pipeline?',
      okText: 'Yes, Delete Pipeline',
      cancelText: 'Cancel'
    };

    this.translate.get('confirm_delete_pipeline').subscribe(res => {
      deletePipelineTranslations.title = res;
    });
    this.translate.get('are_you_sure_delete_pipeline').subscribe(res => {
      deletePipelineTranslations.content = res;
    });
    this.translate.get('yes_delete_pipeline').subscribe(res => {
      deletePipelineTranslations.okText = res;
    });
    this.translate.get('cancel').subscribe(res => {
      deletePipelineTranslations.cancelText = res;
    });

    this.modalService.error({
      nzClassName: 'luxx-modal',
      nzIconType: 'delete',
      nzTitle: deletePipelineTranslations.title,
      nzContent: deletePipelineTranslations.content,
      nzOkText: deletePipelineTranslations.okText,
      nzOkType: 'danger',
      nzMaskClosable: true,
      nzCancelText: deletePipelineTranslations.cancelText,
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
