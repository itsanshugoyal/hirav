import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import OpenAI from "openai";
// import axios from "axios";

const openai = new OpenAI({
  apiKey: import.meta.env.GPT_KEY,
  dangerouslyAllowBrowser: true,
});
const Card = ({ plan }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">{plan?.plan_name}</h2>
      <div className="overview mb-4">
        <p>
          <strong>Plant Species:</strong> {plan?.overview?.plant_species}
        </p>
        <p>
          <strong>Plantation Type:</strong> {plan?.overview.plantation_type}
        </p>
        <p>
          <strong>Capital:</strong> ₹{plan?.overview.capital}
        </p>
        <p>
          <strong>Plantation Size:</strong> {plan?.overview.plantation_size}
        </p>
        <p>
          <strong>Location:</strong> {plan?.overview.location}
        </p>
        <p>
          <strong>Water Management:</strong> {plan?.overview.water_management}
        </p>
      </div>
      <div className="estimated-roi mb-4">
        <h3 className="font-semibold">Estimated ROI</h3>
        <p>
          <strong>Yield per Acre:</strong> {plan?.estimated_roi.yield_per_acre}
        </p>
        <p>
          <strong>Market Price per Ton:</strong> ₹{plan?.estimated_roi.market_price_per_ton}
        </p>
        <p>
          <strong>Gross Income per Year:</strong> ₹{plan?.estimated_roi.gross_income_per_year}
        </p>
        <p>
          <strong>ROI:</strong> {plan?.estimated_roi.roi}
        </p>
      </div>
      <div className="green-credits-earned mb-4">
        <h3 className="font-semibold">Green Credits Earned</h3>
        <p>
          <strong>Trees per Acre:</strong> {plan?.green_credits_earned.trees_per_acre}
        </p>
        <p>
          <strong>Total Green Credits:</strong> {plan?.green_credits_earned.total_green_credits}
        </p>
      </div>
      <div className="recommended-actions mb-4">
        <h3 className="font-semibold">Recommended Actions</h3>
        <ul className="list-disc ml-5">
          {plan?.recommended_actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
      <div className="potential-risks-and-mitigations mb-4">
        <h3 className="font-semibold">Potential Risks and Mitigations</h3>
        <ul className="list-disc ml-5">
          {Object.entries(plan?.potential_risks_and_mitigations).map(([risk, mitigation], index) => (
            <li key={index}>
              <strong>{risk}:</strong> {mitigation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#efefef",
  headerFontColor: "#000",
  headerFontSize: "15px",
  botBubbleColor: "#000",
  botFontColor: "#fff",
  userBubbleColor: "#efefef",
  userFontColor: "#000",
};

const Review = ({ steps }) => {
  const { plantationType, capital, location, waterManagement } = steps;

  return (
    <div style={{ width: "100%" }}>
      <h3 className="text-xl font-bold mb-4">Summary</h3>
      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">Capital</td>
            <td className="py-2 px-4">{capital.value}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">Plantation Type</td>
            <td className="py-2 px-4">{plantationType.value}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">Location</td>
            <td className="py-2 px-4">{location.value}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">Water Management</td>
            <td className="py-2 px-4">{waterManagement.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Review.propTypes = {
  steps: PropTypes.object.isRequired,
};

const SendData = ({ steps, setResponse }) => {
  const { plantSpecies, plantationType, capital, plantationSize, location, waterManagement } = steps;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Act as the role of investment planner for Indian region. You will be provided with investment details, and your task is give 3 investment plans with the overview of the investment, estimated ROI, Green credits earned, recommended actions for optimal results, potential risks and mitigations, and additional resources or information needed.
              Below is an example of investment plan:
              
              {
                "investment_plans": [
                  {
                    "plan_name": "High-Density Mango Plantation",
                    "overview": {
                      "plant_species": "Mangoes",
                      "plantation_type": "High Density",
                      "capital": 500000,
                      "plantation_size": "5 acres",
                      "location": "Uttar Pradesh",
                      "water_management": "Drip Irrigation"
                    },
                    "estimated_roi": {
                      "yield_per_acre": "10-15 tons",
                      "market_price_per_ton": 75000,
                      "gross_income_per_year": "3750000-5625000",
                      "roi": "20-30%"
                    },
                    "green_credits_earned": {
                      "trees_per_acre": 1100,
                      "total_green_credits": 5500
                    },
                    "recommended_actions": [
                      "Soil Testing and Preparation",
                      "Quality Seedlings",
                      "Efficient Drip Irrigation Setup",
                      "Regular Maintenance",
                      "Market Research"
                    ],
                    "potential_risks_and_mitigations": {
                      "weather_variability": "Invest in weather monitoring systems",
                      "market_fluctuations": "Diversify sales channels",
                      "pest_and_disease_outbreaks": "Integrated pest management practices",
                      "initial_establishment_phase": "Financial planning for early years"
                    }
                  },
                  {
                    "plan_name": "Traditional Avocado Plantation",
                    "overview": {
                      "plant_species": "Avocados",
                      "plantation_type": "Traditional",
                      "capital": 750000,
                      "plantation_size": "10 acres",
                      "location": "Kerala",
                      "water_management": "Traditional Irrigation"
                    },
                    "estimated_roi": {
                      "yield_per_acre": "7-10 tons",
                      "market_price_per_ton": 90000,
                      "gross_income_per_year": "6300000-9000000",
                      "roi": "15-25%"
                    },
                    "green_credits_earned": {
                      "trees_per_acre": 110,
                      "total_green_credits": 1100
                    },
                    "recommended_actions": [
                      "Soil Testing and Preparation",
                      "Quality Seedlings",
                      "Efficient Irrigation Setup",
                      "Regular Maintenance",
                      "Market Research"
                    ],
                    "potential_risks_and_mitigations": {
                      "weather_variability": "Invest in weather monitoring systems",
                      "market_fluctuations": "Diversify sales channels",
                      "pest_and_disease_outbreaks": "Integrated pest management practices",
                      "initial_establishment_phase": "Financial planning for early years"
                    }
                  },
                  {
                    "plan_name": "Ultra-High-Density Olive Plantation",
                    "overview": {
                      "plant_species": "Olives",
                      "plantation_type": "Ultra High Density",
                      "capital": 1000000,
                      "plantation_size": "15 acres",
                      "location": "Rajasthan",
                      "water_management": "Drip Irrigation"
                    },
                    "estimated_roi": {
                      "yield_per_acre": "20-25 tons",
                      "market_price_per_ton": 68000,
                      "gross_income_per_year": "20400000-25500000",
                      "roi": "25-35%"
                    },
                    "green_credits_earned": {
                      "trees_per_acre": 2000,
                      "total_green_credits": 30000
                    },
                    "recommended_actions": [
                      "Soil Testing and Preparation",
                      "Quality Seedlings",
                      "Efficient Drip Irrigation Setup",
                      "Regular Maintenance",
                      "Market Research"
                    ],
                    "potential_risks_and_mitigations": {
                      "weather_variability": "Invest in weather monitoring systems",
                      "market_fluctuations": "Diversify sales channels",
                      "pest_and_disease_outbreaks": "Integrated pest management practices",
                      "initial_establishment_phase": "Financial planning for early years"
                    }
                  }
                ]
              }
                
              Only answer in the given JSON format. You can use the given example as a reference.`,
            },
            {
              role: "user",
              content: `Capital: ${capital.value}\nLocation: ${location.value}\n`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.5,
          max_tokens: 4000,
        });
        const response = JSON.parse(result.choices[0].message.content);

        setResponse(response.investment_plans);
        // console.log(response);
      } catch (e) {
        console.log(e);
        setResponse("Something is going wrong, Please try again.");
      }
    };
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    //       "x-user-key": "1cee4f47-d580-4d64-96c1-19e7fec7b1dd",
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       payload: {
    //         type: "text",
    //         text: `You will be provided with investment details, and your task is to summarize the investment plan as follows:\n\n-Overall summary of the investment\n-Estimated ROI (Return on Investment)\n-Recommended actions for optimal results\n-Any potential risks and mitigations\n-Additional resources or information needed.\nPlant Species: ${plantSpecies.value}\nPlantation Type: ${plantationType.value}\nCapital: ${capital.value}\nPlantation Size: ${plantationSize.value}\nLocation: ${location.value}\nWater Management: ${waterManagement.value}`,
    //       },
    //       conversationId: "hirav",
    //     }),
    //   };

    //   const fetchData = async () => {
    //     try {
    //       const res = await fetch(url, options);
    //       const json = await res.json();
    //       console.log(json);
    //       setResponse(json);
    //     } catch (err) {
    //       console.error("error:" + err);
    //       setResponse("Something is going wrong, Please try again.");
    //     }
    //   };

    fetchData();
  }, []);
};

SendData.propTypes = {
  steps: PropTypes.object.isRequired,
  setResponse: PropTypes.func.isRequired, // Add PropTypes for setResponse
};
const Header = () => {
  return (
    <div className="flex items-center flex-col justify-center gap-3 font-sans    ">
      <h2 className="text-3xl font-extrabold ">HIRAV</h2>
      {/* <h4 className="text-2xl font-extrabold">Experience seamless Investment Guidance with our AI Chatbot</h4> */}
      {/* <p className="text-gray-600"> */}{" "}
      {/* Get Instant Answers, Personalized recommendations, and insightful guidance with our advance AI-powered bot. */}
      {/* </p> */}
    </div>
  );
};

const InvestmentPlanner = () => {
  const [response, setResponse] = useState(null);
  const steps = [
    {
      id: "1",
      message: "Welcome to the Investment Planner! How much capital do you have available for this investment?",
      trigger: "capital",
    },
    {
      id: "capital",
      user: true,
      trigger: "3",
      validator: (value) => {
        if (isNaN(value)) {
          return "Value must be a number";
        } else if (value < 0) {
          return "Value must be positive";
        }

        return true;
      },
    },
    {
      id: "3",
      message: "Great ! What type of plantation are you considering?",
      trigger: "plantationType",
    },
    {
      id: "plantationType",
      options: [
        { value: "traditional", label: "Traditional", trigger: "9" },
        { value: "highDensity", label: "High Density", trigger: "9" },
        { value: "ultraHighDensity", label: "Ultra High Density", trigger: "9" },
      ],
    },

    {
      id: "9",
      message: "Where is the location of your plantation?",
      trigger: "location",
    },
    {
      id: "location",
      user: true,
      trigger: "11",
    },
    {
      id: "11",
      message: "How do you plan to manage water for your plantation?",
      trigger: "waterManagement",
    },
    {
      id: "waterManagement",
      options: [
        { value: "rainwaterHarvesting", label: "Rainwater Harvesting", trigger: "13" },
        { value: "dripIrrigation", label: "Drip Irrigation", trigger: "13" },
        { value: "traditionalIrrigation", label: "Traditional Irrigation", trigger: "13" },
      ],
    },
    {
      id: "13",
      message: "Great! Check out your summary",
      trigger: "review",
    },
    {
      id: "review",
      component: <Review />,
      asMessage: true,
      trigger: "update",
    },
    {
      id: "update",
      message: "Would you like to update any field?",
      trigger: "update-question",
    },
    {
      id: "update-question",
      options: [
        { value: "yes", label: "Yes", trigger: "update-yes" },
        { value: "no", label: "No", trigger: "send-data" }, // Change to send-data
      ],
    },
    {
      id: "update-yes",
      message: "Which field would you like to update?",
      trigger: "update-fields",
    },
    {
      id: "update-fields",
      options: [
        { value: "plantationType", label: "Plantation Type", trigger: "update-plantationType" },
        { value: "capital", label: "Capital", trigger: "update-capital" },
        { value: "location", label: "Location", trigger: "update-location" },
        { value: "waterManagement", label: "Water Management", trigger: "update-waterManagement" },
      ],
    },

    {
      id: "update-plantationType",
      update: "plantationType",
      trigger: "review", // Return to review step
    },
    {
      id: "update-capital",
      update: "capital",
      trigger: "review", // Return to review step
    },

    {
      id: "update-location",
      update: "location",
      trigger: "review", // Return to review step
    },
    {
      id: "update-waterManagement",
      update: "waterManagement",
      trigger: "review", // Return to review step
    },
    {
      id: "send-data",
      component: <SendData setResponse={setResponse} />,
      asMessage: true,
      trigger: "end-message",
    },
    {
      id: "end-message",
      message: "Thanks! Your data was submitted successfully!",
      end: true,
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="flex w-full m-auto justify-center items-center mt-20 pb-20 mb-5 flex-col">
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            width="1260px"
            headerComponent={<Header />}
            headerTitle="HIRAV"
            height="800px"
            footerStyle={{ width: "80%", margin: "auto" }}
            inputStyle={{ backgroundColor: "#efefef", borderRadius: "50px", padding: "20px" }}
          />
        </ThemeProvider>
      </div>
      {response && (
        <div className="response-cards">
          <h3 className="text-3xl text-center font-extrabold ">Investment Plan Summary</h3>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {response.map((plan, index) => (
                <Card plan={plan} key={index}></Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlanner;
