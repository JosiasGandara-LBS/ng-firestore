import { inject, Inject, Injectable, signal } from '@angular/core';
import { collectionData, Firestore, addDoc } from '@angular/fire/firestore';
import { Product } from '../interfaces/product.interface';
import { map } from 'rxjs';
import { collection, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
	private firestore = inject(Firestore);

	public selectedProduct = signal<Product | null>(null);

	getProducts() {
		return collectionData(collection(this.firestore, 'menu'), { idField: 'id' }).pipe(
			map((products: any) => {
				return products.map((product: any) => {
					return {
						id: product.id,
						name: product.name,
						price: product.price,
						description: product.description,
						image: product.image,
						category: product.category
					};
				});
			}
			)
		);
	}

	getProductById(id: string) {
		return getDoc(doc(this.firestore, 'menu', id))
	}


	async uploadImage(file: File): Promise<string> {
		try {
			const storage = getStorage();
			const storageRef = ref(storage, `images/${file.name}`);
			const snapshot = await uploadBytes(storageRef, file);
			const downloadURL = await getDownloadURL(snapshot.ref);
			return downloadURL;
		} catch (error) {
			console.error('Error uploading image:', error);
			throw error;
		}
	}


	addCategory(category: any) {
		return addDoc(collection(this.firestore, 'categories'), category);
	}
}
