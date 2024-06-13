import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayoutPage from "./pages/RootLayoutPage";
import Home from "./pages/Home";
import ManageExercisesPage from "./pages/ManageExercisesPage";
import PracticePage from "./pages/PracticePage";
import CreateExercisePage from "./pages/CreateExercisePage";
import ChooseExercise from "./pages/ChooseExercise";
import {urls} from "./utilities/urls";
import {useEffect} from "react";

const router = createBrowserRouter([
    {path: "/", element: <RootLayoutPage />, children: [
            {path: "/", element: <Home /> },
            {path: "/manage-exercises", element: <ManageExercisesPage /> },
            {path: "practice-page/:id", element: <PracticePage />},
            { path: "/new-exercise", element: <CreateExercisePage />},
            {path: "choose-exercise", element: <ChooseExercise />}
        ]}
])

const wakeUpApi = async () => {
    try{
        const response = await fetch(urls.getExercises);
        if(!response.ok){
            console.error("Api wakeup call. The first is expected to fail.", response.statusText)
        }
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error("An unexpected error occurred", error.message);
        } else {
            console.error("An unexpected error occurred");
        }
    }
};

function App() {

    useEffect(() => {
        wakeUpApi();
    }, []);
  return (
    <RouterProvider router={router} />
  )
}

export default App
