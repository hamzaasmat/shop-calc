import { Component } from "@angular/core";
import { COMMON_MODULES } from "../core/constants/constants";

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
    constructor() { }
   
}