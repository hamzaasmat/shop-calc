import { Component, inject, signal } from "@angular/core";
import { COMMON_MODULES } from "../../core/constants/constants";
import { NetworkService } from "../../core/services/network.service";
import moment from "moment";
import { BehaviorSubject } from "rxjs";

interface Calculation {
    expression: string;
    result: number;
}


@Component({
    selector: "app-transactions",
    templateUrl: "./transactions.component.html",
    styleUrls: ["./transactions.component.scss"],
    standalone: true,
    imports: [...COMMON_MODULES]
})

export class TransactionsComponent {
    title = "transactions";

    networkService = inject(NetworkService);
    transactions: BehaviorSubject<any> = new BehaviorSubject([]);

    public total = signal(0);

    constructor() {
        this.networkService.transactions.subscribe((transactions: any) => {
            this.transactions.next(transactions);
            console.log(transactions);
            this.total.set(transactions.reduce((total: any, transaction: any) => total + transaction.value, 0));
        })
    }

    public formatDate(date: Date): string {
        return moment(date).format('DD-MM-YYYY hh:mm:ss a');
    }

}