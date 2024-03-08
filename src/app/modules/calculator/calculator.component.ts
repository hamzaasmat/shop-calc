import { Component, inject } from "@angular/core";
import { COMMON_MODULES } from "../../core/constants/constants";
import { NetworkService } from "../../core/services/network.service";

interface Calculation {
    expression: string;
    result: number;
}


@Component({
    selector: "app-calculator",
    templateUrl: "./calculator.component.html",
    styleUrls: ["./calculator.component.scss"],
    standalone: true,
    imports: [...COMMON_MODULES]
})

export class CalculatorComponent {
    title = "shop-calc";

    networkService = inject(NetworkService);

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
            this.networkService.recordTransaction({
                datetime: dateTime,
                value: result
            })
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