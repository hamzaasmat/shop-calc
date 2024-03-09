import { Component, OnInit, inject } from "@angular/core";
import { COMMON_MODULES } from "../../core/constants/constants";
import { NetworkService } from "../../core/services/network.service";
import moment from "moment";
import { ITransaction } from "../../core/interface/transaction.interface";

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

export class CalculatorComponent implements OnInit {
    title = "shop-calc";

    networkService = inject(NetworkService);

    currentValue: string = '';
    history: Calculation[] = [];
    lastEnterPressTime: number = 0;

    ngOnInit(): void {
        window.addEventListener('keydown', this.onKeyPress.bind(this));
    }
    onInputChange(event: Event) {
        const inputField = event.target as HTMLInputElement;
        inputField.scrollLeft = inputField.scrollWidth;
    }

    appendNumber(num: number): void {
        this.currentValue += num.toString();
    }

    handleEnterKeyPress(): void {
        const currentTime = Date.now();
        if (currentTime - this.lastEnterPressTime < 500) { // Check if Enter is pressed twice quickly
            this.saveRecord();
        } else {
            this.calculate();
        }
        this.lastEnterPressTime = currentTime;
    }

    onKeyPress(event: KeyboardEvent): void {
        const key: any = event.key;
        const isNumber = !isNaN(Number(key));
        const isOperator = ['+', '-', '*', '/', '.'].includes(key);
        if (isNumber || isOperator) {
            this.appendNumber(key);
            event.preventDefault();
        } else if (key === 'Enter') {
            // this.handleEnterKeyPress();
            this.calculate();
            event.preventDefault();
        } else if (key === 'Backspace') {
            this.backspace();
            event.preventDefault();
        }
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
            const date: any = new Date();
            const time = date.toISOString();

            const PAYLOAD: Partial<ITransaction> = {
                date: moment(date).format('YYYY-MM-DD'),
                time: time,
                value: result
            }
            this.networkService.addDocument(PAYLOAD, 'transactions');
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