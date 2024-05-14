type UrlCollection = {
    getExercises: string;
    postExercise: string;
    startExercise: string;
    checkAnswers: string;
}

/*export const urls: UrlCollection = {
    getExercises: 'https://koffes-learner-api.azurewebsites.net/api/Exercise',
    postExercise: 'https://koffes-learner-api.azurewebsites.net/api/Exercise',
    startExercise: "https://koffes-learner-api.azurewebsites.net/api/DoExercise/StartExercise/",
    checkAnswers: "https://koffes-learner-api.azurewebsites.net/api/DoExercise/CheckAnswers"
}*/

export const urls: UrlCollection = {
    getExercises: "https://localhost:7280/api/Exercise",
    postExercise: "https://localhost:7280/api/Exercise",
    startExercise: "https://localhost:7280/api/DoExercise/StartExercise/",
    checkAnswers: "https://localhost:7280/api/DoExercise/CheckAnswers"
}
