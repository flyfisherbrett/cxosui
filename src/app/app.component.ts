import { Component } from '@angular/core';
import { SessionService } from './session/session.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Company } from './interfaces/company.interface';
import { User } from './interfaces/user.interface';
import { ModalService } from './modal/modal.service';
declare var $, AOS;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  sideNavExpanded = true;
  user: User;
  companies: Array<Company>;
  company: Company;
  loggedIn: boolean;
  isHome: boolean = false;
  materialStyles: any;
  container: any;
  boostrapStyles: any;

  constructor(private sessionService: SessionService, private router: Router) {
    this.boostrapStyles = $('#bootstrapStyle');
    this.materialStyles = $('style')[0];

    this.router.events
      .subscribe((event: NavigationEnd) => {
        if (event instanceof NavigationEnd) {
          this.isHome = event.url === '/';
          (this.isHome) ? this.switchToBootstrap() : this.switchToMaterial();
        }
      });

    if (this.sessionService.isLoggedIn()) {
      this.user = this.sessionService.getUser() || {};
      this.companies = this.sessionService.getCompanies();
      this.company = this.sessionService.getCompany();
      this.loggedIn = true;
    }

    this.router.events.subscribe(event => {
      if (event.url === '/') {this.sideNavExpanded = false; };
    });

    this.sessionService.companySwitch.subscribe(c => {
      this.company = c;
    });

    this.sessionService.loggedIn.subscribe( loggedIn => {
      if (loggedIn) {
        this.sideNavExpanded = true;
        this.user = this.sessionService.getUser();
        this.companies = this.sessionService.getCompanies();
        this.company = this.sessionService.getCompany();
        this.loggedIn = true;
      } else {
        this.user = null;
        this.companies = [];
        this.company = null;
        this.sideNavExpanded = false;
        this.loggedIn = false;
      }
    });
  }

  setCompany(id) {
    this.sessionService.setCompany(id);
  }

  toggleSideNav() {
    this.sideNavExpanded = !this.sideNavExpanded;
    $(window).trigger('resize');
  }

  logout() { this.sessionService.logout(); }

   showAddCompanyModal() {
     $('#modal-add-company').openModal();
   }

  private switchToBootstrap() {
     $('head').append(this.boostrapStyles);
     $('.parallax-mirror').show();
     this.materialStyles.remove();
     this.container = $('#content-window');
     this.container.prop('id', '');
     var mn = $(".top-menu");
     var mn1 = $(".top-menu img")
     var mn2 = $(".b1-1");
     var mns = "main-nav-scrolled";
     var mnss = "img-res";
     var hdr = $('.top-menu').height();

     $(window).scroll(function () {
       if ($(this).scrollTop() > 50) {
         mn2.addClass("b1-1-s");
         mn.addClass(mns);
         mn1.addClass(mnss);
       } else {
         mn2.removeClass("b1-1-s");
         mn.removeClass(mns);
         mn1.removeClass(mnss);
       }
     });
     setTimeout(function () {
       AOS.init({ duration: 2000 });
     }, 500);
   }

   private switchToMaterial() {
     $('.parallax-mirror').hide();
     this.boostrapStyles.remove();
     $('head').append(this.materialStyles);
     this.container.prop('id', 'content-window');
   }
}
