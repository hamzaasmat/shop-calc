import { Component, inject } from "@angular/core";
import { COMMON_MODULES } from "../../core/constants/constants";
import { NetworkService } from "../../core/services/network.service";

interface Calculation {
    expression: string;
    result: number;
}


@Component({
    selector: "app-vendors",
    templateUrl: "./vendors.component.html",
    styleUrls: ["./vendors.component.scss"],
    standalone: true,
    imports: [...COMMON_MODULES]
})

export class VendorsComponent {
    title = "Vendors";

    networkService = inject(NetworkService);
    transactions = this.networkService.transactions;
    constructor() {
        this.transactions.subscribe((trans: any) => {
            console.log('transactions: ', trans);
        })

    }

}