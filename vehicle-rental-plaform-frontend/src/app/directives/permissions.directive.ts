import { Directive, ElementRef, Input } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';

@Directive({
  standalone:true,
  selector: '[appPermissions]'
})
export class PermissionsDirective {

  constructor(private permissionsService : PermissionsService, private el : ElementRef) { }

  @Input() permissionAcess : string = '';

  ngOnInit() {
    this.permissionsService.permissions.subscribe({
      next : (value) => {
        this.el.nativeElement.hidden = !value.includes(this.permissionAcess);
      }
    })
  }

}
