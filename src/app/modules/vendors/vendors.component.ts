import { Component, inject } from "@angular/core";
import { COMMON_MODULES } from "../../core/constants/constants";
import { NetworkService } from "../../core/services/network.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

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

    public formGroup: FormGroup = new FormGroup({});
    public vendors: BehaviorSubject<any> = new BehaviorSubject([]);
    constructor(
        private formBuilder: FormBuilder,
    ) {

        this.formGroup = this.formBuilder.group({
            id: [''],
            vendor: [''],
            purchaseCost: [''],
        });

        this.networkService.getDocuments('vendors', null).subscribe((vendors: any) => {
            this.vendors.next(vendors);
        })
    }

    public onSubmit(): void {
        const { value } = this.formGroup;
        this.networkService.addDocument({
            vendor: value.vendor,
            purchaseCost: value.purchaseCost
        }, 'vendors');
        this.formGroup.reset();
    }

}