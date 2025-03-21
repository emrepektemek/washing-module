import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-machine-add',
  imports: [ReactiveFormsModule],
  templateUrl: './machine-add.component.html',
  styleUrl: './machine-add.component.css',
})
export class MachineAddComponent implements OnInit {
  machineForm: FormGroup;
  machineType: string = '';
  dataAdd: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private machineService: MachineService
  ) {}

  ngOnInit() {
    this.createMachineForm();
  }

  createMachineForm() {
    this.machineForm = this.formBuilder.group({
      machineName: ['', [Validators.required]],
    });
  }

  selectMachine(selectedMachine: string) {
    this.machineType = selectedMachine;
  }

  addMachine() {
    let machineObject = Object.assign({}, this.machineForm.value, {
      machineType: this.machineType,
    });

    console.log(machineObject);

    this.dataAdd = false;

    this.machineService.add(machineObject).subscribe(
      (response) => {
        this.toastrService.info(response.message);
        this.machineForm.setValue({
          machineName: '',
        });
        this.machineType = '';
        this.dataAdd = true;
      },
      (responseError) => {
        this.dataAdd = true;
        if (responseError.error.ValidationErrors) {
          this.toastrService.error(
            responseError.error.ValidationErrors[0].ErrorMessage
          );
        } else {
          this.toastrService.error(responseError.error.message);
        }
      }
    );
  }
}
