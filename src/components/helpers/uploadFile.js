import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default async function uploadFile(file, userEmail, progressBar) {
  progressBar.style.height = "4px";
  const promise = new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, "userImages" + userEmail);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.style.width = progress + "%";
      },

      (error) => {
        console.log(`error`, error);
        reject(error);
      },

      async () => {
        progressBar.style.height = "0px";
        setTimeout(() => {
          progressBar.style.width = "0px";
        }, 100);

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
  return promise;
}
