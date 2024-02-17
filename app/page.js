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
      recognition.lang = "en-EN"; // Set the language

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
          const auth = "Bearer " + "5XOI7ZDMVLYIEMSVHLTXEYJ2GLGLLEUF"; // Make sure CLIENT_TOKEN contains your Wit.ai API token
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
              console.log("Intent : " + intent);
              // Example: Perform action based on intent
              if (intent === "Alive_Verification") {
                speakResponse(
                  "To verify your existence, please provide your current contact information and any official identification documents."
                );
              } else if (intent === "Business_Closure_Request") {
                speakResponse(
                  "To proceed with your business closure request, we need details about your business, including its registration number and the reason for closure."
                );
              } else if (intent === "Business_Registration") {
                speakResponse(
                  "To register your business, please provide the necessary documents such as your business plan, proof of address, and identification."
                );
              } else if (intent === "Business_Relocation_Request") {
                speakResponse(
                  "For relocating your business, we require details about the new location and the reasons for relocation."
                );
              } else if (intent === "Chhopaya_Request") {
                speakResponse(
                  "To process your chhopaya request, please provide details about the incident and any supporting documents."
                );
              } else if (
                intent === "Citizenship_Certificate_Request_New_Renew"
              ) {
                speakResponse(
                  "To apply for a new or renewed citizenship certificate, you need to submit the necessary documents and complete the application form."
                );
              } else if (intent === "Court_Proceeding_Request") {
                speakResponse(
                  "For initiating court proceedings, please provide details about the case and any relevant documentation."
                );
              } else if (intent === "Dhara_Nam_Sari") {
                speakResponse(
                  "To proceed with your Dhara Nam Sari request, we require details about the land and any supporting documents."
                );
              } else if (intent === "Disability_Application") {
                speakResponse(
                  "To apply for disability benefits, please provide medical documentation and information about your condition."
                );
              } else if (intent === "Electricity_Connection_New_House") {
                speakResponse(
                  "For a new electricity connection, you need to provide proof of ownership or tenancy for the property and identification documents."
                );
              } else if (intent === "Electricity_Connection_Old_House") {
                speakResponse(
                  "To apply for an electricity connection for an old house, please provide proof of ownership or tenancy and identification documents."
                );
              } else if (intent === "Electricity_Meter_Registration_Transfer") {
                speakResponse(
                  "To transfer electricity meter registration, please provide details about the current and new owners and relevant documentation."
                );
              } else if (intent === "Free_Health_Treatment_Application") {
                speakResponse(
                  "To apply for free health treatment, please provide details about your medical condition and financial situation."
                );
              } else if (intent === "Guardian_Application") {
                speakResponse(
                  "To apply for legal guardianship, please provide details about the ward and the reason for seeking guardianship."
                );
              } else if (intent === "House_Demolition_Verification") {
                speakResponse(
                  "To verify the need for house demolition, please provide details about the property and the reason for demolition."
                );
              } else if (intent === "House_Land_Name_Transfer_Request") {
                speakResponse(
                  "To request the transfer of house or land name, please provide the necessary documents and details about the transfer."
                );
              } else if (intent === "In_English_Application") {
                speakResponse(
                  "Please provide your application details in English for processing."
                );
              } else if (intent === "Indigenous_Certification") {
                speakResponse(
                  "To certify indigenous status, please provide relevant documentation and information about your ancestry."
                );
              } else if (intent === "Inheritance_Rights_Verification") {
                speakResponse(
                  "To verify inheritance rights, please provide details about the property and any legal documents."
                );
              } else if (intent === "Land_Registration_Request") {
                speakResponse(
                  "To register land, please provide the necessary documents including land ownership proof and identification."
                );
              } else if (intent === "Lost_Land_Certificate_Replacement") {
                speakResponse(
                  "To replace a lost land certificate, please provide details about the lost certificate and any relevant documentation."
                );
              } else if (intent === "Lost_Land_Certificate") {
                speakResponse(
                  "To report a lost land certificate, please provide details about the lost certificate and any relevant information."
                );
              } else if (intent === "Medical_Treatment_Expenses") {
                speakResponse(
                  "To apply for coverage of medical treatment expenses, please provide details about the treatment and your financial situation."
                );
              } else if (intent === "Minors_Application_Request") {
                speakResponse(
                  "To apply on behalf of a minor, please provide details about the minor and the reason for the application."
                );
              } else if (intent === "Mohi_Lease_Acquisition_Transfer") {
                speakResponse(
                  "To transfer Mohi lease acquisition, please provide details about the current and new leaseholders and relevant documentation."
                );
              } else if (intent === "Mohi_Lease_Acquisition") {
                speakResponse(
                  "To apply for Mohi lease acquisition, please provide details about the property and the reason for acquisition."
                );
              } else if (intent === "Name_Standardization") {
                speakResponse(
                  "To standardize your name, please provide details about the variations and any supporting documents."
                );
              } else if (intent === "Organization_Registration_Request") {
                speakResponse(
                  "To register your organization, please provide the necessary documents such as the organization's charter and identification."
                );
              } else if (intent === "Permanent_Residence") {
                speakResponse(
                  "To apply for permanent residence, please provide details about your residency status and any relevant documentation."
                );
              } else if (intent === "Pipeline_Installation") {
                speakResponse(
                  "For pipeline installation, please provide details about the location and purpose of installation."
                );
              } else if (intent === "Property_Valuation") {
                speakResponse(
                  "To request property valuation, please provide details about the property and its characteristics."
                );
              } else if (intent === "Rental_Agreement_Application") {
                speakResponse(
                  "To apply for a rental agreement, please provide details about the property and the terms of the agreement."
                );
              } else if (intent === "Road_Area_Validation") {
                speakResponse(
                  "To validate road area, please provide details about the location and the purpose of validation."
                );
              } else if (intent === "Road_Maintenance_Proposal") {
                speakResponse(
                  "To propose road maintenance, please provide details about the road condition and the proposed maintenance plan."
                );
              } else if (intent === "Room_Opening_Request") {
                speakResponse(
                  "To request room opening, please provide details about the property and the reason for opening the room."
                );
              } else if (intent === "Scholarship_Application") {
                speakResponse(
                  "To determine your eligibility for the scholarship, we need information about your academic achievements, extracurricular activities, and family income. Can you provide these details?"
                );
              } else if (intent === "School_Address_Change_Request") {
                speakResponse(
                  "To request a school address change, please provide details about the current and new address and any relevant documentation."
                );
              } else if (
                intent === "School_Operations_Class_Expansion_Request"
              ) {
                speakResponse(
                  "To request expansion of school operations or classes, please provide details about the proposed expansion and its justification."
                );
              } else if (intent === "Social_Security_Allowance_Registration") {
                speakResponse(
                  "To register for social security allowance, please provide details about your eligibility and any supporting documents."
                );
              } else if (intent === "Surveying_Road_No_Road_Field") {
                speakResponse(
                  "To survey road or no-road field, please provide details about the area to be surveyed and the purpose of the survey."
                );
              } else if (intent === "Temporary_Property_Tax_Exemption") {
                speakResponse(
                  "To apply for temporary property tax exemption, please provide details about the property and the reason for exemption."
                );
              } else if (intent === "Temporary_Residence") {
                speakResponse(
                  "To apply for temporary residence, please provide details about your residency status and the duration of stay."
                );
              } else if (
                intent === "Transfer_Photo_Land_Ownership_Certificate"
              ) {
                speakResponse(
                  "To transfer photo land ownership certificate, please provide details about the transfer and relevant documentation."
                );
              } else if (intent === "Unmarried_Status_Verification") {
                speakResponse(
                  "To verify your unmarried status, please provide relevant documents such as your birth certificate and identification."
                );
              } else if (intent === "Verifying_Birth_Date") {
                speakResponse(
                  "To verify your birth date, please provide a copy of your birth certificate or any official identification documents."
                );
              } else if (intent === "Verifying_Death_Status") {
                speakResponse(
                  "To verify death status, please provide relevant documentation such as the death certificate."
                );
              } else if (intent === "Verifying_House_Land_Boundaries") {
                speakResponse(
                  "To verify house or land boundaries, please provide details about the property and any relevant documentation."
                );
              } else if (intent === "Verifying_Marriage") {
                speakResponse(
                  "To verify marriage, please provide relevant documentation such as the marriage certificate."
                );
              } else if (intent === "Weak_Economic_Condition") {
                speakResponse(
                  "To determine eligibility based on weak economic condition, we need details about your financial situation and any supporting documents."
                );
              } else {
                /* speakResponse("I am not able to understand you, Can you please repeat it again"); */
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
