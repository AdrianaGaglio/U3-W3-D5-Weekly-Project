import { Component, Input } from '@angular/core';
import { iUser } from '../../../interfaces/iuser';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { FavouritesService } from '../../../services/favourites.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrl: './userdetail.component.scss',
})
export class UserdetailComponent {
  constructor(
    private userSvc: UserService,
    private authSvc: AuthService,
    private favSvc: FavouritesService
  ) {}

  user!: Partial<iUser>;

  ngOnInit() {
    this.authSvc.restoreUser();
    this.favSvc.getFavouritesLoggedUser();
    this.userSvc.user$.subscribe((user) => {
      if (user) if (user) this.user = user;
    });
  }
}
