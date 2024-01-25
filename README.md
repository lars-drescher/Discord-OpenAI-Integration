# Discord OpenAI Integration
Discord bot named "bob" that integrates with the OpenAI API, allowing the use of GPT-3, GPT-4, and DALL-E.<br/> Users can configure daily limits and customize a command with a unique personality.<br/> In this instance, "Bob" refers to the animated character known as "Bob der Baumeister."

## Usage
Type "bob-help" to view all available commands.

## Installation and Setup
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

5. **License**: This project is licensed under **All Rights Reserved**. No part of this project may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the author.
