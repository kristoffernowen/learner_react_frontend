import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayoutPage from "./pages/RootLayoutPage";
import Home from "./pages/Home";
import ManageExercisesPage from "./pages/ManageExercisesPage";
import PracticePage from "./pages/PracticePage";
import CreateExercisePage from "./pages/CreateExercisePage";

const router = createBrowserRouter([
    {path: "/", element: <RootLayoutPage />, children: [
            {path: "/", element: <Home /> },
            {path: "/manage-exercises", element: <ManageExercisesPage /> },
            {path: "practice-page/:id", element: <PracticePage />},
            { path: "/new-exercise", element: <CreateExercisePage />},
        ]}
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
