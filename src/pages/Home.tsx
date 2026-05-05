import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useApiStatus } from '../context/ApiStatusContext';

export default function Home() {
    const navigate = useNavigate();
    const apiReady = useApiStatus();
    useEffect(() => {
        if(!apiReady){
            navigate(`/practice-page/demo-123`)
        }
    }, [apiReady, navigate]);

    return (
        <>
            <h1>Koffes studiestöd</h1>
            <p>Välkommen till en liten app som kan hjälpa dig att träna in olika fakta du vill lära dig
                och som hjälper mig att bli bättre på React och TypeScript.</p>
            <p>För närvarande finns möjlighet att skapa en modell över ett objekt, t ex ett djur med några fakta
                såsom artnamn, vikt, längd och så vidare. Sedan används detta för att skapa en övning med flera
                djur enligt den modellen. Därefter skriver du i rätt svar på alla djur, eller vad objektet nu är.
                Sedan kan du kan testa dig på om du minns rätt svar för alla djur.</p>
            <p>Den här appen pratar med ett api som kanske kallstartar. Jag har försökt ge den ett litet
                väckningssamtal, men det kan hända att sidan börjar långsamt, behöver omladdas eller att du behöver
                trycka på någon av knapparna
                för att sidan ska komma igång ordentligt.</p>
        </>
    )
}

