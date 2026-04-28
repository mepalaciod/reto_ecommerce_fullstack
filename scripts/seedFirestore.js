import app from '../src/firebase/firebase.config.js';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(app);

const MOCK_PRODUCTS = [
  { id: 1, title: "ani-k Glow Serum", description: "Sérum facial ligero de ani-k para aportar luminosidad, hidratación y una textura suave durante el día.", price: "29.99", rate: 4.7, image: "ani-k-glow-serum.svg" },
  { id: 2, title: "bloomshell Silk Lip Oil", description: "Aceite labial bloomshell con acabado jugoso, brillo sutil y sensación confortable por horas.", price: "18.50", rate: 4.8, image: "bloomshell-silk-lip-oil.svg" },
  { id: 3, title: "la poción Brow Fix", description: "Gel fijador de cejas de la poción para definir, peinar y mantener el look impecable todo el día.", price: "15.90", rate: 4.4, image: "la-pocion-brow-fix.svg" },
  { id: 4, title: "milagros Velvet Foundation", description: "Base líquida milagros con cobertura modulable y acabado aterciopelado para un maquillaje uniforme.", price: "42.00", rate: 4.9, image: "milagros-velvet-foundation.svg" },
  { id: 5, title: "latin nails Pro Kit", description: "Kit profesional de latin nails con herramientas y esmaltes pensados para una manicure de alto impacto.", price: "56.00", rate: 4.6, image: "latin-nails-pro-kit.svg" },
];

async function seedProducts() {
  console.log('Starting seed process...');
  const productsRef = collection(db, 'products');

  try {
    for (const product of MOCK_PRODUCTS) {
      // Usamos el ID del mock como ID del documento (convertido a string) 
      // para mantener el orden, o podríamos usar id aleatorios.
      // Usaremos id como string para tener control exacto
      const docRef = doc(productsRef, product.id.toString());
      await setDoc(docRef, product);
      console.log(`Seeded Product: ${product.title}`);
    }
    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database: ', error);
    process.exit(1);
  }
}

seedProducts();
