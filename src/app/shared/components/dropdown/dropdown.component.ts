import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-dropdown',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DropdownComponent),
			multi: true,
		},
	],
})
export class DropdownComponent {
	isDropdownOpen = false;
	selectedOption: any = null;

	options = [
		{ name: 'Mesa 1', value: '1' },
		{ name: 'Mesa 2', value: '2' },
		{ name: 'Mesa 3', value: '3' },
		{ name: 'Mesa 4', value: '4' },
		{ name: 'Mesa 5', value: '5' },
		{ name: 'Mesa 6', value: '6' },
		{ name: 'Mesa 7', value: '7' },
	];

	private onChange = (value: any) => {};
	private onTouched = () => {};

	toggleDropdown() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	selectOption(option: any) {
		this.selectedOption = option;
		this.onChange(option.value); // Comunica el valor seleccionado al formulario reactivo
		this.isDropdownOpen = false;
	}

	// Métodos necesarios para ControlValueAccessor
	writeValue(value: any): void {
		this.selectedOption = this.options.find(opt => opt.value === value) || null;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		// Manejar el estado deshabilitado si es necesario
	}
}
