type UrlCollection = {
    getExercises: string;
    postExercise: string;
    deleteExercise: string;
    startExercise: string;
    checkAnswers: string;
}

const baseUrl = "https://koffes-learner-api.azurewebsites.net/api/";

export const urls: UrlCollection = {
    getExercises: `${baseUrl}Exercise/`,
    postExercise: `${baseUrl}Exercise/`,
    deleteExercise: `${baseUrl}Exercise/`,
    startExercise: `${baseUrl}DoExercise/StartExercise/`,
    checkAnswers: `${baseUrl}DoExercise/CheckAnswers`
}

