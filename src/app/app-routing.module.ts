import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./Page/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'termsconditions',
    loadChildren: () => import('./Page/termsconditions/termsconditions.module').then( m => m.TermsconditionsPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./Page/privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
