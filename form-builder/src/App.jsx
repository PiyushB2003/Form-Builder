import BuilderPage from "./pages/BuilderPage"
import "./index.css";
function App() {

  return (
    <>
      <div className="p-10 min-h-screen w-screen flex items-center flex-col">
        <div className="w-full">
          <BuilderPage />
        </div>
      </div>
    </>
  )
}

export default App
