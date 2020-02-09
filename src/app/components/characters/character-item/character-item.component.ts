import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterItemComponent {
  @Input() character: Character;
  constructor() { }
}
