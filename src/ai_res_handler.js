class AIResponseHandler {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.deepseekAPI = "https://api.deepseek.com/v1/chat/completions";
    this.chatgptAPI = "https://api.openai.com/v1/chat/completions";
    this.geminiAPI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;
  }

  async generateDeepseekResponse(prompt) {
    const data = {
      model: "deepseek-coder",
      messages: [
        { role: "system", content: "You are a helpful terminal assistant. You have to return terminal commands only when user give prompt, no explanation, just return command in response, if user ask any irrelevant questions or query which are not related to terminal or terminal commands then ignore it, for eg: how to get path of current directory: pwd and Also return response in plain text format, not in markdowns, etc. No any explanation of commands" },
        { role: "user", content: prompt }
      ]
    };

    return this._fetchAndProcessResponse(this.deepseekAPI, data, this.apiKey);
  }
  
  async generateChatgptResponse(prompt) {
    const data = {
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "You are a helpful terminal assistant. You have to return terminal commands only when user give prompt, no explanation, just return command in response, if user ask any irrelevant questions or query which are not related to terminal or terminal commands then ignore it, for eg: how to get path of current directory: pwd and Also return response in plain text format, not in markdowns, etc" },
        { role: "user", content: prompt }
      ]
    };

    return this._fetchAndProcessResponse(this.chatgptAPI, data, this.apiKey);
  }

  async generateGeminiResponse(prompt) {
    const promptTemplate = `You are a helpful terminal assistant. You have to return terminal commands only for my prompt, no explanation, just return command in response, if i ask any irrelevant questions or query which are not related to terminal or terminal commands then ignore it, for eg: if i ask path of current directory then : pwd and Also return response in plain text format, not in markdowns, etc. My query: ${prompt}`;
    const data = {
      contents: [
        {
          parts: [{ text: promptTemplate }]
        }
      ]
    };

    return this._fetchAndProcessResponse(this.geminiAPI, data, null);
  }

  async _fetchAndProcessResponse(url, data, apiKey) {
    try {
      const headers = {
        "Content-Type": "application/json"
      };
      if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
      }
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        // Process and return the response data
        return { response: responseData };
      } else {
        throw new Error(responseData.detail ? responseData.detail : responseData.error.message || "Failed to fetch response");
      }
    } catch (error) {
      return { error: error.message };
    }
  }

}

export default AIResponseHandler;