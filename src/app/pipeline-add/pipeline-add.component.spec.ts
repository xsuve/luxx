import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineAddComponent } from './pipeline-add.component';

describe('PipelineAddComponent', () => {
  let component: PipelineAddComponent;
  let fixture: ComponentFixture<PipelineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
