import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  addTaskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _taskSvc: TaskService,
    private _authSvc: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: '',
    });
  }

  get title() {
    return this.addTaskForm.get('title');
  }
  get description() {
    return this.addTaskForm.get('description');
  }
  get dueDate() {
    return this.addTaskForm.get('dueDate');
  }

  onSubmit(addTaskForm: FormGroup) {
    console.log('addTaskForm: ', addTaskForm.value);

    const data: Task = {
      title: addTaskForm.value.title,
      description: addTaskForm.value.description,
      dueDate: addTaskForm.value.dueDate,
      userId: this._authSvc.currentUser.user_id,
    };

    console.log('data: ', data);
    this._taskSvc.create_task(data).subscribe((response) => {
      console.log('response: ', response);
      if (response) {
        this.toastr.success('Task created!');
        addTaskForm.reset();
        this.router.navigate(['/tasks'])
      }
    });
  }

  goBack(){
    history.back()
  }
}
