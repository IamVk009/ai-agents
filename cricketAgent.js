import { Agent, run } from "@openai/agents"
import { z } from "zod";

const statistics = z.object({
    name: z.string(),
    country: z.string().describe("Contry for which player belongs to"),
    IPL_franchise: z.string().describe("The team for which player plays for in IPL"),
    total_Internatinal_Matches: z.number().describe("Total number of international matches played by player including all three formats"),
    total_International_runs: z.number().describe("Total runs scored by player in international cricket combined in all three formats"),
    average: z.number().describe("Total combined average of a player in all three formats"),
    latest_updated_date: z.string().describe("The latest date till which this data that you are showing is updated.")
})

const cricketAgent = new Agent({
    name: "cricket-agent",
    instructions: "You are Expert in providing statistics about any International Cricket Player asked by user.",
    outputType: statistics 
});

export async function runStatAgent(prompt) {
    try {
        const response = await run(cricketAgent, prompt);
        console.log("--------------------- StatAgent ---------------------------------");
        console.log(response.finalOutput);
    } catch (error) {
        console.error("Error while running the stat agent ", error);
        throw error;
    }
} 