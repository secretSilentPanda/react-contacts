import AddContact from "./components/AddContact";
import Contacts from "./components/Contacts";
import { app } from "./firebase/firebase";

function App() {
  return (
    <div>
      <AddContact />
      <Contacts />
    </div>
  );
}

export default App;
