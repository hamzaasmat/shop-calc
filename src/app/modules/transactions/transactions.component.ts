import { Component, inject, signal } from "@angular/core";
import { COMMON_MODULES } from "../../core/constants/constants";
import { NetworkService } from "../../core/services/network.service";
import moment from "moment";
import { BehaviorSubject } from "rxjs";
import { orderBy, limit, where } from "firebase/firestore";
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
        let date: any = new Date();
        date = moment(date).format('YYYY-MM-DD')
        this.fetchTransactions(date);
    }

    public fetchTransactions(filter: any = null) {
        let config: any = { orderBy: orderBy('time', 'desc') };
        if (filter) {
            config.filter = where('date', '==', filter);
        }
        this.networkService.getDocuments('transactions', config).subscribe((transactions: any) => {
            this.transactions.next(transactions);
            this.total.set(transactions.reduce((total: any, transaction: any) => total + transaction.value, 0));
        })
    }

    public formatDatetime(date: Date): string {
        return moment(date).format('hh:mm:ss a');
    }

    public getDate(e: any) {
        this.fetchTransactions(e?.target?.value)
    }

}