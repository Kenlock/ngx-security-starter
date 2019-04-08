// Angular modules
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Application services
import { ProfileService } from '@services/profile.service';
import { RoleService } from '@services/role.service';
import { UserService } from '@services/user.service';

// Application models
import { PartialList } from '@models/common/partial-list.model';
import { Profile } from 'selenium-webdriver/firefox';
import { Role } from '@models/role.model';

// Application constants
import { constants } from '@env/constants';

// JWT helper service
import { JwtHelperService } from '@services/security/jwt-helper.service';

// Translation imports
import { TranslationLoaderService } from '@app/core/services/translation-loader.service';
import { locale as en } from './i18n/en';
import { locale as fr } from './i18n/fr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnInit {

  /**
   * Profiles count statistics
   */
  profilesStatistics: number = null;

  /**
   * Roles count statistics
   */
  rolesStatistics: number = null;

  /**
   * Users count statistics
   */
  usersStatistics: number = null;

  /**
   * Component constructor
   * 
   * @param profileService The profile service
   * @param roleService The role service
   * @param userService The user service
   * @param titleService The title service
   * @param jwtHelper The jwt helper service
   * @param _translationLoader The translation loader
   * 
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  constructor(
    private profileService: ProfileService,
    private roleService: RoleService,
    private userService: UserService,
    titleService: Title,
    public jwtHelper: JwtHelperService,
    private _translationLoader: TranslationLoaderService
  ) {
    // Set the page title
    titleService.setTitle(constants.app_name + ' - Dashboard');
    // Load translation
    this._translationLoader.loadTranslations(en, fr);
  }

  /**
   * Component OnInit phase
   *
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  ngOnInit(): void {
    // Load profiles count
    if (this.hasRole('ROLE_PROFILES')) {
      this.loadProfilesStatistics();
    }
    // Load roles count
    if (this.hasRole('ROLE_ROLES')) {
      this.loadRolesStatistics();
    }
    // Load users count
    if (this.hasRole('ROLE_USERS')) {
      this.loadUsersStatistics();
    }
  }

  /**
   * Load profiles count statistics
   * 
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  private loadProfilesStatistics(): void {
    this.profilesStatistics = null;
    this.profileService.find({
      size: 0
    }).subscribe((res: PartialList<Profile>) => {
      this.profilesStatistics = res.count;
    });
  }

  /**
   * Load roles count statistics
   * 
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  private loadRolesStatistics(): void {
    this.rolesStatistics = null;
    this.roleService.find({
      size: 0
    }).subscribe((res: PartialList<Role>) => {
      this.rolesStatistics = res.count;
    });
  }

  /**
   * Load users count statistics
   * 
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  private loadUsersStatistics(): void {
    this.usersStatistics = null;
    this.userService.find({
      size: 0
    }).subscribe((res: PartialList<Role>) => {
      this.usersStatistics = res.count;
    });
  }

  /**
   * Check if logged user has an authority based on a String
   * 
   * @param role The authority's code
   *
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  hasRole(role: string): Boolean {
    return this.jwtHelper.hasRole(role);
  }

}
