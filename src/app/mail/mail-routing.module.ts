import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  { path: 'inbox', redirectTo: 'mail/inbox', pathMatch: 'full'},
  { path: 'mail/inbox', component: InboxComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule { }
