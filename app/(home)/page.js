"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState("सारथीलाई बोलाउनुहोस्");
  const router = useRouter();

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices().filter((voice) => voice.lang === "hi-IN");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[0];
    synth.speak(utterance);
  };

  useEffect(() => {
    const startListening = () => {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();
      recognition.lang = "ne-NP";

      recognition.onstart = () => {
        console.log("Listening...");
        setListening(true);
      };

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript.trim();
        console.log("Transcript:", transcript);
        const nepaliSarathiRegex = /सारथी|सरथी|सारथि|सारथे|सारथ|सरथि|शारथि/;

        if (nepaliSarathiRegex.test(transcript)) {
          setResponse(transcript);
          console.log("Sarathi found");
          speakResponse(
            "सारथी तपाईंको सेवामा हाजिर छे। तपाईँलाई वडा सम्बन्धी केही काममा समस्या परेमा कृपया आफ्नो समस्या सुनाइदिनुहोला|"
          );
          console.log("Sarathi founded");
          setTimeout(() => {
            router.push("/listen");
          }, 15000);
        }

        setResponse(transcript);

        // Continue listening after processing the response
        setTimeout(() => {
          setListening(true);
        }, 1000); // Add a delay before restarting to avoid triggering immediately
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended.");
        setListening(false);
      };

      // Start listening
      recognition.start();

      // Cleanup on component unmount
      return () => {
        recognition.stop();
      };
    };

    if (!listening) {
      startListening();
    }
  }, [listening]);
  return (
    <>
      <div className="container">
        <img src="/topp.png" alt="toppar" className="img-fluid" />
      </div>
      <div className="container mt-3">
        <h5 className="fw-bold text-center fs-1">
          {response === "सारथीलाई बोलाउनुहोस्"
            ? "सारथीलाई बोलाउनुहोस्"
            : `You said : ${response}`}
        </h5>
      </div>
      <div className="main">
        <img src="/waves.png" alt="waves" className="img-fluid" />
        <div className="speak-section">
          <p>Click the button below to start</p>
          <button className="btn btn-speak">Press to Start Speaking</button>
        </div>
      </div>
      <div className="row row-cols-3">
        <div className="col"></div>
        <div className="col">
          <img src="/wardko.png" alt="toppar" className="img-fluid" />
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}
