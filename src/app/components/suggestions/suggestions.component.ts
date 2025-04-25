import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent {
  @Input() suggestions: string[] = [];
  @Input() show: boolean = false;
  @Output() suggestionSelected = new EventEmitter<string>();

  onSelect(suggestion: string): void {
    this.suggestionSelected.emit(suggestion);
  }
}
