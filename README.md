# Discord OpenAI Integration
Discord bot named "bob" that integrates with the OpenAI API, allowing the use of GPT-3, GPT-4, and DALL-E.<br/> Users can configure daily limits and customize a command with a unique personality.<br/> In this instance, "Bob" refers to the animated character known as "Bob der Baumeister."

## Usage
Type "bob-help" to view all available commands.

## Installation
1. Create two environment variables for your API Tokens:
    ```
    DISCORD_TOKEN=***
    OPENAI_API_KEY=***
    ```

2. Adjust the settings inside the `config.json` file to your preferences. Modify `bobPersonality` to customize the behavior of the "bob" command, and set daily limits for GPT-3, GPT-4, and DALL-E:
    ```json
    {
      "bobPersonality" : "Du bist Bob der Baumeister...",
      "dailyLimits": {
        "gpt3": 50,
        "gpt4": 10,
        "dallE": 4
      } 
    }
    ```

3. Install dependencies and start the bot:
    ```
    npm i
    npm run start
    ```

## Installation with Docker
1. Setup your API Tokens inside the .env-example file and rename it to .env
    ```
    DISCORD_TOKEN=<Your Discord Bot Token>
    OPENAI_API_KEY=<Your OpenAI Token>
    ```

2. Adjust the settings inside the `config.json` file to your preferences. Modify `bobPersonality` to customize the behavior of the "bob" command, and set daily limits for GPT-3, GPT-4, and DALL-E:
    ```json
    {
      "bobPersonality" : "Du bist Bob der Baumeister...",
      "dailyLimits": {
        "gpt3": 50,
        "gpt4": 10,
        "dallE": 4
      } 
    }
    ```

3. Start the bot with
    ```
    docker compose --env-file ./.env up 
    ```

## **License**
This project is licensed under **All Rights Reserved**. No part of this project may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the author.
