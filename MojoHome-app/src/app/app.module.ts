import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './modules/main/main.component';
import { ChoresComponent } from './modules/chores/chores.component';
import { TitleComponent } from './modules/title/title.component';
import { CalcubreadComponent } from './modules/calcubread/calcubread.component';
import { BlockComponent } from './modules/main/block/block.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

import { UserService } from './service/user.service';
import { TodoComponent } from './modules/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChoresComponent,
    TitleComponent,
    CalcubreadComponent,
    BlockComponent,
    ClickOutsideDirective,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
