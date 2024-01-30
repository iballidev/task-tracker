import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Task, TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent implements OnInit {
  updateTaskForm!: FormGroup;
  subscriptions: Subscription[] = [];
  taskId: any;

  constructor(
    private fb: FormBuilder,
    private _taskSvc: TaskService,
    private _authSvc: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getTaskId()
  }


  async getTaskId() {
    let taskId;
    let subscription = await this.route.params.subscribe((param: any) => {
      console.log('param.taskId: ', param.taskId);
      taskId = param.taskId;
      this.getTaskDetails(taskId);
    });
    this.subscriptions.push(subscription)
    return taskId;
  }
  getTaskDetails(taskId: string) {
    let subscription = this._taskSvc
      .get_task_details(taskId)
      .subscribe((result: any) => {
        console.log("result: ", result)
        this.taskId = result.task._id
        this.prefillForm(result.task)
      });
    this.subscriptions.push(subscription)
  }

  buildForm() {
    this.updateTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: '',
    });
  }

  get title() {
    return this.updateTaskForm.get('title');
  }
  get description() {
    return this.updateTaskForm.get('description');
  }
  get dueDate() {
    return this.updateTaskForm.get('dueDate');
  }

  transformDate(value: string): string {
    const date = new Date(value);
    const formattedDate = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');

    return formattedDate || value;
  }

  prefillForm(TaskData: any) {
    this.updateTaskForm.controls['title'].setValue(TaskData.title)
    this.updateTaskForm.controls['description'].setValue(TaskData.description)
    this.updateTaskForm.controls['dueDate'].setValue(this.transformDate(TaskData.dueDate))
  }

  onSubmit(updateTaskForm: FormGroup) {
    console.log('updateTaskForm: ', updateTaskForm.value);

    const data: any = {
      title: updateTaskForm.value.title,
      description: updateTaskForm.value.description,
      dueDate: updateTaskForm.value.dueDate
    };

    console.log('data: ', data);
    this._taskSvc.update_task(data, this.taskId).subscribe((response: any) => {
      if (response) {
        this.toastr.success('Task update!');
        updateTaskForm.reset();
        this.router.navigate(['/tasks/details', this.taskId])
      }
    });
  }

  goBack() {
    history.back()
  }
}
