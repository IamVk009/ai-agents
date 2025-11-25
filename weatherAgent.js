import { Agent, run } from "@openai/agents";
import 'dotenv/config';

const weatherAgent = new Agent({
    name: "weatherAgent",
    instructions: `You are a helpful agent that provides weather information for any geographical location.
    Before giving the weather details, you must always state the date and the day
    for which the weather information applies.`
})

export async function runWeatherAgent(prompt) {
    try {
        const response = await run(weatherAgent, prompt);
        console.log("------------------------- Weather Agent -------------------------");
        console.log(response.finalOutput)
    } catch (error) {
        console.error("Error while running Weather Agent : ", error);
        throw error;
    }
}