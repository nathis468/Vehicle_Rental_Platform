import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appPermissions]'
})
export class PermissionsDirective {

  constructor(private authService: AuthService, private el: ElementRef) { }

  @Input() permissionAcess: string = '';

  permissionsSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.permissionsSubscription = this.authService.permissions.subscribe({
      next: (value) => {
        this.el.nativeElement.hidden = !value.includes(this.permissionAcess);
      }
    })
  }

  ngOnDestroy() {
    this.permissionsSubscription.unsubscribe();
  }

}
