import { Injectable, inject } from "@angular/core";
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, where } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { query, orderBy, limit } from "firebase/firestore";

interface Config {
    orderBy?: any;
    limit?: any;
}
@Injectable({
    providedIn: 'root',
})

export class NetworkService {

    firestore = inject(Firestore);

    getDocuments(collectionName: string, config: any = null): Observable<any> {

        const documents = collection(
            this.firestore,
            collectionName
        );
        const queryArgs: any = [];
        if (config) {
            for (const key of Object.keys(config)) {
                if (config[key]) {
                    queryArgs.push(config[key]);
                }
            }
        }
        const requestQuery: any = query(documents, ...queryArgs);
        return collectionData(requestQuery, { idField: 'id' });
    }

    async addDocument(newDocument: any, collectionName: string) {
        const documents = collection(
            this.firestore,
            collectionName
        );
        await addDoc(documents, { ...newDocument });
    };

    async deleteDocument(id: string, collectionName: string) {
        const docRef = doc(this.firestore, collectionName, id);
        await deleteDoc(docRef);
    }
}
