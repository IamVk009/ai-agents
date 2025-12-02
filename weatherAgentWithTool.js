import { Agent, tool, run } from "@openai/agents";
import { z } from "zod";
import axios from "axios"
import 'dotenv/config';
import { Resend } from "resend";

const getWeather = tool({
    name: "get_weather",
    description: "Return the weather of a given City.",
    parameters: z.object({
        city: z.string()
    }),
    async execute({city}) {
        const url = `https://wttr.in/${city.toLowerCase()}?format=%C+%t`;
        const weather = await axios.get(url, {responseType: 'text'});
        return `The weather of ${city} is ${weather.data}`;
    }
})

const sendEmail = tool({
    name: "Send_Email",
    description: "You are an agent that sends an email on the provided Email Id.",
    parameters: z.object({
        emailTo: z.string().describe("This is an Email Address"),
        subject: z.string().describe("This is mail subject"),
        body: z.string().describe("This is email body"),
        emailFrom: z.string().describe("This is sender's email")
    }),
    async execute({emailFrom, subject, body, emailTo}) {
        // ToDO : Add Resend API key to make this function work
        const resend = new Resend(process.env.RESEND_API_KEY);
        try {
            await resend.emails.send({
                from: emailFrom,
                to: emailTo,
                subject: subject,
                html: body
            });
        } catch (error) {
            console.error("Error while Sending Email", error);
            throw error;
        }
        return `Successfully sent an Email to ${emailTo}`;
    }
})

const weatherAgent = new Agent({
    name: "WeatherAgent",
    instructions: `You are a helpful agent that provides weather information for any geographical location.`,
    tools: [getWeather, sendEmail]
});

export async function runWeatherAgentWithTool(prompt) {
    try {
        const response = await run(weatherAgent, prompt);
        console.log("------------------------- Weather Agent with Tool -------------------------");
        console.log(response.finalOutput);
    } catch (error) {
        console.error("Error while calling Weather Agent with Tool : ", error);
        throw error;
    }
} 