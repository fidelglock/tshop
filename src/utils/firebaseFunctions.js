// saving new item

import { collection, doc, getDocs, orderBy, query, setDoc, onSnapshot } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, {merge: true})
}

// get all items

export const getAllItems = async () => {
    const q = query(collection(firestore, "foodItems"))
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    )
    return items.docs.map((doc) => doc.data() )
}