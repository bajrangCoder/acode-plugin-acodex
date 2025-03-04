import { Ollama } from "ollama/browser";

class AIResponseHandler {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.deepseekAPI = "https://api.deepseek.com/v1/chat/completions";
    this.chatgptAPI = "https://api.openai.com/v1/chat/completions";
    this.geminiAPI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${this.apiKey}`;

    if (!apiKey) {
      // check local storage, if user want to provide custom host for ollama
      const host =
        localStorage.getItem("Ollama-Host") || "http://localhost:11434";
      this.ollama = new Ollama({ host });
    }
  }

  getSystemPrompt() {
    return `You are a terminal command assistant designed to help users with command-line tasks. Only respond with the exact command(s) needed, with no explanations or markdown formatting. Examples:
    - 'Show current directory': pwd
    - 'List all files': ls -la
    - 'Create new folder docs': mkdir docs
    If a query is not related to terminal commands, do not respond. Multiple commands should be separated by semicolons. Keep responses minimal and focused only on valid terminal commands.`;
  }

  async generateDeepseekResponse(prompt) {
    const data = {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: this.getSystemPrompt(),
        },
        { role: "user", content: prompt },
      ],
    };

    return this._fetchAndProcessResponse(this.deepseekAPI, data, this.apiKey);
  }

  async generateChatgptResponse(prompt) {
    const data = {
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: this.getSystemPrompt(),
        },
        { role: "user", content: prompt },
      ],
    };

    return this._fetchAndProcessResponse(this.chatgptAPI, data, this.apiKey);
  }

  async generateGeminiResponse(prompt) {
    const promptTemplate = `${this.getSystemPrompt()} My query: ${prompt}`;
    const data = {
      contents: [
        {
          parts: [{ text: promptTemplate }],
        },
      ],
    };

    return this._fetchAndProcessResponse(this.geminiAPI, data, null);
  }

  async getListOfOllamaModels() {
    try {
      const list = await this.ollama.list();
      const modelList = list.models.map((item) => item.model);
      return modelList;
    } catch (err) {
      return err;
    }
  }

  async generateOllamaResponse(model, prompt) {
    try {
      const res = await this.ollama.generate({
        model,
        system: this.getSystemPrompt(),
        prompt,
      });
      return res;
    } catch (err) {
      return err;
    }
  }

  async _fetchAndProcessResponse(url, data, apiKey) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
      }
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Process and return the response data
        return { response: responseData };
      }
      throw new Error(
        responseData.detail
          ? responseData.detail
          : responseData.error.message || "Failed to fetch response",
      );
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default AIResponseHandler;
