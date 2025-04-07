import { ContextProvider } from "../context/useContext";
import Overlay from "./components/Overlay/Overlay";

function App(): JSX.Element {


  return (
    <ContextProvider>
      <Overlay />
    </ContextProvider>

  )
}

export default App