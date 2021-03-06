// Angular components
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

// Application layout configuration service
import { ConfigService, ConfigObject } from './core/services/config.service';

// Rxjs components
import { Subscription } from 'rxjs/Subscription';

// Translate service
import { TranslateService } from '@ngx-translate/core';

// Application constants
import { constants } from '@env/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * The main application component
 * 
 * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
 */
export class AppComponent implements OnInit, OnDestroy {

  /**
   * On layout settings changed handler
   */
  onSettingsChanged: Subscription;

  /**
   * Current configuration object
   */
  settings: ConfigObject;

  /**
   * On route loading indicator
   */
  loading: boolean;

  /**
   * Component constructor
   * 
   * @param config The configuration service
   * @param router The router object
   * @param _translateService The translate service
   * 
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  constructor(
    public config: ConfigService,
    private router: Router,
    private _translateService: TranslateService
  ) {
    // Subscribe to all the settings change events
    this.onSettingsChanged = this.config.onSettingsChanged
      .subscribe((newSettings: ConfigObject) => this.settings = newSettings);
    // Add a subscriber to the router events to detect the loading indicator
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        // When the route start loading
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        // When the route stop loading ([end], [cancel] or [error] event)
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    if (!localStorage.getItem(constants.ls_lang)) {
      localStorage.setItem(constants.ls_lang, 'en');
    }
    // Add languages
    this._translateService.addLangs(['en', 'fr']);
    // Set the default language
    this._translateService.setDefaultLang('en');
    // Use a language
    this._translateService.use(localStorage.getItem(constants.ls_lang));
  }

  /**
   * Component OnInit phase
   *
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  ngOnInit(): void { }

  /**
   * Component OnDestroy phase
   *
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  ngOnDestroy(): void {
    this.onSettingsChanged.unsubscribe();
  }

}
