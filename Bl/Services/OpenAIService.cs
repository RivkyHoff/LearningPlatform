using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http;

namespace Bl.Services
{

    public class OpenAiService
    {
        private readonly HttpClient _httpClient;

        private readonly string _apiKey;

        public OpenAiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["OpenAI:ApiKey"];
        }

        public async Task<string> GetLessonFromOpenAiAsync(string category, string subCategory)
        {
            var prompt = $"Return only the lesson, without any explanation or additional response. Return an interesting lesson on the topic of {category} with a focus on {subCategory}.";
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://api.openai.com/v1/chat/completions"),
                Content = new StringContent(JsonSerializer.Serialize(new
                {
                    model = "gpt-4",
                    messages = new[]
                    {
                new { role = "system", content = "You are a teacher who explains the lesson in a friendly manner." },
                new { role = "user", content = prompt }
            },
                    temperature = 0.7
                }), Encoding.UTF8, "application/json")
            };

            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.SendAsync(request);
            var body = await response.Content.ReadAsStringAsync();          
            Console.WriteLine("OpenAI Response: " + body);
            response.EnsureSuccessStatusCode();
            using var doc = JsonDocument.Parse(body);
            var result = doc.RootElement
                            .GetProperty("choices")[0]
                            .GetProperty("message")
                            .GetProperty("content")
                            .GetString();

            return result!;
        }
    }


}
