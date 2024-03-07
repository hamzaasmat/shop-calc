import { Component } from "@angular/core";
import { COMMON_MODULES } from "../core/constants/constants";

interface Calculation {
    expression: string;
    result: number;
}


@Component({
    selector: "app-root",
    templateUrl: "./calculator.component.html",
    styleUrls: ["./calculator.component.scss"],
    standalone: true,
    imports: [...COMMON_MODULES]
})

export class CalculatorComponent {
    title = "shop-calc";
    constructor() { }

    currentValue: string = '';
    history: Calculation[] = [];

    appendNumber(num: number): void {
        this.currentValue += num.toString();
    }

    appendPoint(): void {
        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
    }

    appendOperation(operation: string): void {
        if (this.currentValue !== '' && !isNaN(parseFloat(this.currentValue[this.currentValue.length - 1]))) {
            this.currentValue += operation;
        }
    }

    calculate(): void {
        if (this.currentValue !== '' && !isNaN(parseFloat(this.currentValue[this.currentValue.length - 1]))) {
            try {
                const result = eval(this.currentValue);
                this.history.push({ expression: this.currentValue, result });
                this.currentValue = result.toString();
            } catch (error) {
                this.currentValue = 'Error';
            }
        }
    }

    saveRecord(): void {
        if (this.currentValue !== '') {
            const result = eval(this.currentValue);
            const dateTime = new Date().toISOString();
            localStorage.setItem(dateTime, result.toString());
            this.history.push({ expression: this.currentValue, result });
            this.reset();
        }
    }

    backspace(): void {
        if (this.currentValue.length > 0) {
            this.currentValue = this.currentValue.slice(0, -1);
        }
    }
    
    reset(): void {
        this.currentValue = '';
    }
}