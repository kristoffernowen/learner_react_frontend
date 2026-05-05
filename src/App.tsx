import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayoutPage from "./pages/RootLayoutPage";
import Home from "./pages/Home";
import ManageExercisesPage from "./pages/ManageExercisesPage";
import PracticePage from "./pages/PracticePage";
import CreateExercisePage from "./pages/CreateExercisePage";
import ChooseExercise from "./pages/ChooseExercise";
import { ApiStatusProvider } from './context/ApiStatusContext';

const router = createBrowserRouter([
    {path: "/", element: <RootLayoutPage />, children: [
            {path: "/", element: <Home /> },
            {path: "/manage-exercises", element: <ManageExercisesPage /> },
            {path: "practice-page/:id", element: <PracticePage />},
            { path: "/new-exercise", element: <CreateExercisePage />},
            {path: "choose-exercise", element: <ChooseExercise />}
        ]}
])

function App() {
  return (
    <ApiStatusProvider>
        <RouterProvider router={router} />
    </ApiStatusProvider>
  )
}

export default App
