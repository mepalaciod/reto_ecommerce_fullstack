import app from "./firebase.config.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import MOCK_PRODUCTS from "../mockdata/mock_products.js";

const db = getFirestore(app);

export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return products.length > 0 ? products.sort((a, b) => Number(a.id) - Number(b.id)) : MOCK_PRODUCTS;
    } catch (error) {
        console.error("Error fetching products from Firestore:", error);
        return MOCK_PRODUCTS;
    }
};

export const getProductById = async (id) => {
    try {
        const docRef = doc(db, "products", String(id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || null;
    } catch (error) {
        console.error("Error fetching product by id:", error);
        return MOCK_PRODUCTS.find(p => String(p.id) === String(id)) || null;
    }
};
