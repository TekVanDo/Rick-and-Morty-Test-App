import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzCardModule, NzRadioModule, NzInputModule, NzFormModule, NzIconModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterItemComponent } from './components/characters/character-item/character-item.component';
import { CharactersHeaderComponent } from './components/characters/characters-header/characters-header.component';
import { CharactersFooterComponent } from './components/characters/characters-footer/characters-footer.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { EnumKeysPipe } from './pipes/enum-keys-pipe.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterItemComponent,
    CharactersHeaderComponent,
    CharactersFooterComponent,
    TimeAgoPipe,
    EnumKeysPipe
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    // NzFormModule,
    // NzInputModule,
    // NzRadioModule,
    // NzCardModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
