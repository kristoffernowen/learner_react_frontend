type UrlCollection = {
    getExercises: string;
    startExercise: string;
    checkAnswers: string;
}

export const urls: UrlCollection = {
    getExercises: 'https://koffes-learner-api.azurewebsites.net/api/Exercise',
    startExercise: "https://koffes-learner-api.azurewebsites.net/api/DoExercise/StartExercise/",
    checkAnswers: "https://koffes-learner-api.azurewebsites.net/api/DoExercise/CheckAnswers"
}
