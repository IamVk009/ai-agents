import { Agent, run } from "@openai/agents";
import 'dotenv/config';

const agent = new Agent({
    name: "Agent X",
    instructions: "You are a helpful assistant that can answer questions and help with tasks."
})

// const response = await run(
//     agent,
//     "When is Ashes 2025 Starting ?"
// )

run(agent, "When is Ashes 2025 Starting ?").then((response) => {
    console.log(response.finalOutput);
});

// console.log(response.finalOutput)