import { runAgentX } from './agentX.js';
import { runWeatherAgent } from './weatherAgent.js';
import { runWeatherAgentWithTool } from './weatherAgentWithTool.js';
import { runStatAgent } from './cricketAgent.js';

try {
    // await runAgentX("Hey There!");
    // await runWeatherAgent("How is the weather of Delhi");
    // await runWeatherAgentWithTool("How ist the weather in San Fransisco and Delhi Today ?")
    // await runWeatherAgentWithTool("Send the weather report of Mumbai to the email id : test@gmail.com");
    await runStatAgent("Provide me the statistics of Sachin Tendulkar");
} catch (error) {
    console.error("Error while calling Agents in index.js : ", error);
    process.exit(1);
}