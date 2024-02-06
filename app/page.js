"use client";

import { useEffect, useState } from "react";

const IndexPage = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const startListening = () => {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();
      recognition.lang = "ne-NP"; // Set the language

      recognition.onstart = () => {
        console.log("Listening...");
        setListening(true);
      };

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript.trim();
        console.log("Transcript:", transcript);

        if (transcript.toLowerCase() === "hello ram") {
          // Respond to the trigger phrase
          setResponse("Hello! How can I assist you today?");
          speakResponse("Hello! How can I assist you today?");
          // You can add more sophisticated response logic here based on what the user says
          // For example, you could analyze the transcript and respond differently to different commands
        } else if (transcript.toLowerCase() === "goodbye ram") {
          // If the user says "bye", end the conversation
          setResponse("Goodbye!");
          speakResponse("Goodbye!");
          recognition.stop();
        } else {
          const q = encodeURIComponent(transcript); // Assuming `transcript` contains the user's query
          const uri = "https://api.wit.ai/message?v=20230215&q=" + q;
          const auth = "Bearer " + "BKMJTH4R2Y4ZX5X2I76U5JUNWQFFCKNF"; // Make sure CLIENT_TOKEN contains your Wit.ai API token
          fetch(uri, { headers: { Authorization: auth } })
            .then((res) => res.json())
            .then((res) => {
              // Process the response from Wit.ai here
              console.log(res);

              // Example: Extract intent from Wit.ai response
              const intent =
                res.intents && res.intents.length > 0
                  ? res.intents[0].name
                  : null;
              console.log("Inte");
              // Example: Perform action based on intent
              if (intent === "Recommendation") {
                // Perform action to set an alarm
                speakResponse("Get Your New House Recommendation");
              } /* else if (intent === "Greetings") {
                speakResponse(
                  "Thanks for Greeting me, What do you want from me ?"
                );
              }  */ else if (intent === "ApplyForSchorship") {
                speakResponse(
                  "For scholarship you have to have family income of less than 2 lakhs and you have to be a student of 10th or 12th class."
                );
              } else {
                /* speakResponse(
                  "I am not able to understand you, Can you please repeat it again"
                ); */
              }
            })
            .catch((error) => {
              console.error("Error fetching data from Wit.ai:", error);
            });
        }

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

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[0];
    synth.speak(utterance);
  };

  return (
    <div>
      <p>{response}</p>
      {listening && <p>Listening...</p>}
    </div>
  );
};

export default IndexPage;
