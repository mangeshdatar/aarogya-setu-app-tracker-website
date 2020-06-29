import { db } from './firebase';


export const getUsers = async () => {
    let data;
    await  db.collection("userInfo")
        .get()
        .then(querySnapshot => {
          data=  querySnapshot.docs.map(doc => doc.data());
            
        });
    return data
  }