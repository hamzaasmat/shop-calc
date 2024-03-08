import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Transaction } from "../interface/transaction.interface";

@Injectable({
    providedIn: 'root',
})

export class NetworkService {

    firestore = inject(Firestore);

    contactsCollection = collection(
        this.firestore,
        'transactions'
    );

    transactions: Observable<any> = collectionData(this.contactsCollection, { idField: 'id' });

    async recordTransaction(newTransaction: Partial<Transaction>) {
        await addDoc(this.contactsCollection, { ...newTransaction });
    };

    async deleteTransaction(id: string) {
        const docRef = doc(this.firestore, 'transactions', id);
        await deleteDoc(docRef);
    }
}
