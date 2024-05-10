import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayoutPage from "./pages/RootLayoutPage";
import Home from "./pages/Home";
import ManageExercisesPage from "./pages/ManageExercisesPage";
import PracticePage from "./pages/PracticePage";

const router = createBrowserRouter([
    {path: "/", element: <RootLayoutPage />, children: [
            {path: "/", element: <Home /> },
            {path: "/manage-exercises", element: <ManageExercisesPage /> },
            {path: "practice-page/:id", element: <PracticePage />}
        ]}
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
