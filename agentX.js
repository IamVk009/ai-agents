import { Agent, run } from "@openai/agents";
import 'dotenv/config';

const agent = new Agent({
    name: "Agent X",
    instructions: "You are a helpful assistant that can answer questions and help with tasks."
})

export async function runAgentX(prompt) {
    try {
        const response = await run(agent, prompt);
        console.log("------------------------- Agent X -------------------------");
        console.log(response.finalOutput)
    } catch (error) {
        console.error("Error while running AgentX : ", error);
        throw error;
    }
}