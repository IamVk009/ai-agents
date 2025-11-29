import { Agent, tool, run } from "@openai/agents";
import { z } from "zod";
import axios from "axios"

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

const weatherAgent = new Agent({
    name: "WeatherAgent",
    instructions: `You are a helpful agent that provides weather information for any geographical location.`,
    tools: [getWeather]
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