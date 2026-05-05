export type DemoResult = {
    perFactObjects: DemoFactObjectResult[];
}

export type DemoFactObjectResult = {
    id: string;
    name: string;
    perFacts: DemoFactResult[];
}

export type DemoFactResult = {
    id: string;
    factObjectId: string;
    givenAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    factName: string
}

export const demoLandscapeData = {
    name: "Hårdkodad demoövning: Svenska landskap",
    id: "demo-123",
    factObjects: [
        {
            name: "Västmanland",
            id: "Västmanland",
            exerciseId: "demo-123",
            facts: [
                {
                    id: "Västmanland 1",
                    factObjectId: "Västmanland",
                    factName: "Största stad",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Västmanland 2",
                    factObjectId: "Västmanland",
                    factName: "Största vattendrag",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Västmanland 3",
                    factObjectId: "Västmanland",
                    factName: "Antal invånare",
                    factType: "string",
                    factValue: ""
                }
            ]
        },
        {
            name: "Dalarna",
            id: "Dalarna",
            exerciseId: "demo-123",
            facts: [
                {
                    id: "Dalarna 1",
                    factObjectId: "Dalarna",
                    factName: "Största stad",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Dalarna 2",
                    factObjectId: "Dalarna",
                    factName: "Största vattendrag",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Dalarna 3",
                    factObjectId: "Dalarna",
                    factName: "Antal invånare",
                    factType: "string",
                    factValue: ""
                }
            ]
        },
        {
            name: "Skåne",
            id: "Skåne",
            exerciseId: "demo-123",
            facts: [
                {
                    id: "Skåne 1",
                    factObjectId: "Skåne",
                    factName: "Största stad",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Skåne 2",
                    factObjectId: "Skåne",
                    factName: "Största vattendrag",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Skåne 3",
                    factObjectId: "Skåne",
                    factName: "Antal invånare",
                    factType: "string",
                    factValue: ""
                }
            ]
        },
        {
            name: "Norrbotten",
            id: "Norrbotten",
            exerciseId: "demo-123",
            facts: [
                {
                    id: "Norrbotten 1",
                    factObjectId: "Norrbotten",
                    factName: "Största stad",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Norrbotten 2",
                    factObjectId: "Norrbotten",
                    factName: "Största vattendrag",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Norrbotten 3",
                    factObjectId: "Norrbotten",
                    factName: "Antal invånare",
                    factType: "string",
                    factValue: ""
                }
            ]
        },
        {
            name: "Småland",
            id: "Småland",
            exerciseId: "demo-123",
            facts: [
                {
                    id: "Småland 1",
                    factObjectId: "Småland",
                    factName: "Största stad",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Småland 2",
                    factObjectId: "Småland",
                    factName: "Största vattendrag",
                    factType: "string",
                    factValue: ""
                },
                {
                    id: "Småland 3",
                    factObjectId: "Småland",
                    factName: "Antal invånare",
                    factType: "string",
                    factValue: ""
                }
            ]
        }
    ]
};

export const demoLandscapeAnswersKey: DemoResult = {
    perFactObjects: [
        {
            id: "Västmanland",
            name: "Västmanland",
            perFacts: [
                {
                    id: "Västmanland 1",
                    factObjectId: "Västmanland",
                    givenAnswer: "",
                    correctAnswer: "Västerås",
                    isCorrect: false,
                    factName: "Största stad"
                },
                {
                    id: "Västmanland 2",
                    factObjectId: "Västmanland",
                    givenAnswer: "",
                    correctAnswer: "Svartån",
                    isCorrect: false,
                    factName: "Största vattendrag"
                },
                {
                    id: "Västmanland 3",
                    factObjectId: "Västmanland",
                    givenAnswer: "",
                    correctAnswer: "ca 275 000",
                    isCorrect: false,
                    factName: "Antal invånare"
                }
            ]
        },
        {
            id: "Dalarna",
            name: "Dalarna",
            perFacts: [
                {
                    id: "Dalarna 1",
                    factObjectId: "Dalarna",
                    givenAnswer: "",
                    correctAnswer: "Falun",
                    isCorrect: false,
                    factName: "Största stad"
                },
                {
                    id: "Dalarna 2",
                    factObjectId: "Dalarna",
                    givenAnswer: "",
                    correctAnswer: "Dalälven",
                    isCorrect: false,
                    factName: "Största vattendrag"
                },
                {
                    id: "Dalarna 3",
                    factObjectId: "Dalarna",
                    givenAnswer: "",
                    correctAnswer: "ca 285 000",
                    isCorrect: false,
                    factName: "Antal invånare"
                }
            ]
        },
        {
            id: "Skåne",
            name: "Skåne",
            perFacts: [
                {
                    id: "Skåne 1",
                    factObjectId: "Skåne",
                    givenAnswer: "",
                    correctAnswer: "Malmö",
                    isCorrect: false,
                    factName: "Största stad"
                },
                {
                    id: "Skåne 2",
                    factObjectId: "Skåne",
                    givenAnswer: "",
                    correctAnswer: "Helge å",
                    isCorrect: false,
                    factName: "Största vattendrag"
                },
                {
                    id: "Skåne 3",
                    factObjectId: "Skåne",
                    givenAnswer: "",
                    correctAnswer: "ca 1 400 000",
                    isCorrect: false,
                    factName: "Antal invånare"
                }
            ]
        },
        {
            id: "Norrbotten",
            name: "Norrbotten",
            perFacts: [
                {
                    id: "Norrbotten 1",
                    factObjectId: "Norrbotten",
                    givenAnswer: "",
                    correctAnswer: "Luleå",
                    isCorrect: false,
                    factName: "Största stad"
                },
                {
                    id: "Norrbotten 2",
                    factObjectId: "Norrbotten",
                    givenAnswer: "",
                    correctAnswer: "Luleälven",
                    isCorrect: false,
                    factName: "Största vattendrag"
                },
                {
                    id: "Norrbotten 3",
                    factObjectId: "Norrbotten",
                    givenAnswer: "",
                    correctAnswer: "ca 250 000",
                    isCorrect: false,
                    factName: "Antal invånare"
                }
            ]
        },
        {
            id: "Småland",
            name: "Småland",
            perFacts: [
                {
                    id: "Småland 1",
                    factObjectId: "Småland",
                    givenAnswer: "",
                    correctAnswer: "Jönköping",
                    isCorrect: false,
                    factName: "Största stad"
                },
                {
                    id: "Småland 2",
                    factObjectId: "Småland",
                    givenAnswer: "",
                    correctAnswer: "Mörrumsån",
                    isCorrect: false,
                    factName: "Största vattendrag"
                },
                {
                    id: "Småland 3",
                    factObjectId: "Småland",
                    givenAnswer: "",
                    correctAnswer: "ca 770 000",
                    isCorrect: false,
                    factName: "Antal invånare"
                }
            ]
        }
    ]
};