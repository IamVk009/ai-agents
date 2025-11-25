import {runAgentX} from './agentX.js';
import {runWeatherAgent} from './weatherAgent.js';

try {
    await runAgentX("Hey There!");
    await runWeatherAgent("How is the weather of Delhi");
} catch (error) {
    console.error("Error while calling Agents in index.js : ", error);
    process.exit(1);
}