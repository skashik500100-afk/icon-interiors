import { AI_PRESETS } from "../data/designsData";

const GEMINI_KEY_STORAGE = "icon_gemini_api_key";
const UNSPLASH_KEY_STORAGE = "icon_unsplash_api_key";

export function getStoredGeminiKey() {
  return localStorage.getItem(GEMINI_KEY_STORAGE) || "";
}

export function saveStoredGeminiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem(GEMINI_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(GEMINI_KEY_STORAGE);
  }
}

export function getStoredUnsplashKey() {
  return localStorage.getItem(UNSPLASH_KEY_STORAGE) || "";
}

export function saveStoredUnsplashKey(key) {
  if (key && key.trim()) {
    localStorage.setItem(UNSPLASH_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(UNSPLASH_KEY_STORAGE);
  }
}

/**
 * Generate Interior Concept using Google Gemini API
 */
export async function generateInteriorConcept({ room, style, budget, sqft, userPrompt, apiKey }) {
  const activeKey = apiKey || getStoredGeminiKey();

  // If no API key is provided, use our smart AI preset simulator or return demo preset
  if (!activeKey) {
    // Artificial small delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    const matchingPreset = AI_PRESETS.find(
      (p) => p.room.toLowerCase() === room.toLowerCase() || p.style.toLowerCase() === style.toLowerCase()
    ) || AI_PRESETS[0];

    return {
      isDemo: true,
      data: {
        ...matchingPreset,
        room,
        style,
        concept: `${style} ${matchingPreset.concept}`,
        prompt: userPrompt || matchingPreset.prompt
      }
    };
  }

  // Real Gemini API Call
  const systemInstruction = `You are a world-class Principal Interior Architect and Luxury Home Designer at ICON INTERIORS.
Your task is to create a bespoke, high-end interior architecture concept based on the client's specifications.
Return ONLY valid raw JSON without any markdown formatting, backticks, or other text.
The JSON must strictly conform to this schema:
{
  "concept": "Unique Luxury Title for the Concept",
  "summary": "2 to 3 sentences describing the architectural mood, space planning, and ambiance",
  "palette": [
    {"name": "Color Name 1", "hex": "#HEX"},
    {"name": "Color Name 2", "hex": "#HEX"},
    {"name": "Color Name 3", "hex": "#HEX"},
    {"name": "Color Name 4", "hex": "#HEX"},
    {"name": "Color Name 5", "hex": "#HEX"}
  ],
  "materials": [
    "Specific wall finish or wood veneer",
    "Flooring or stone specification",
    "Fabric / upholstery material",
    "Hardware / metal accent"
  ],
  "lighting": "Detailed lighting layer plan (cove, magnetic track, decorative pendant, Kelvin rating)",
  "budgetRange": "Estimated cost in Indian Rupees (e.g. ₹4.5L - ₹7.0L)",
  "tips": "One expert insider design tip for maximizing luxury and functionality"
}`;

  const promptContent = `Client Request:
Room Type: ${room}
Design Style: ${style}
Area Size: ${sqft || "350 sq.ft"}
Budget Preference: ${budget || "Signature Elegance"}
Custom Vision / Special Requests: ${userPrompt || "Focus on warmth, concealed lighting, and timeless architectural luxury."}`;

  // Try Gemini 2.5 Flash, then fallback to 1.5 Flash if needed
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: systemInstruction },
                  { text: promptContent }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Gemini API Error (${response.status})`);
      }

      const jsonResult = await response.json();
      const rawText = jsonResult.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("No response generated from Gemini API");
      }

      // Clean up in case Gemini wrapped in markdown code fence
      const cleanJson = rawText.replace(/```json\n?|\n?```/g, "").trim();
      const parsedData = JSON.parse(cleanJson);

      return {
        isDemo: false,
        modelUsed: model,
        data: {
          ...parsedData,
          room,
          style,
          prompt: userPrompt || `${style} ${room} Concept`
        }
      };
    } catch (err) {
      console.warn(`Failed with model ${model}:`, err);
      // If it's the last model, rethrow or return error
      if (model === models[models.length - 1]) {
        throw err;
      }
    }
  }
}

/**
 * Search live Unsplash Photos for Home Designs using user's Unsplash API Key
 */
export async function searchUnsplashDesigns(query, page = 1) {
  const activeKey = getStoredUnsplashKey();
  if (!activeKey) return null;

  try {
    const searchQuery = `${query} interior design modern luxury architecture`;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        searchQuery
      )}&per_page=12&page=${page}&orientation=landscape&client_id=${activeKey}`
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map((photo) => ({
      id: `unsplash-${photo.id}`,
      title: photo.description || photo.alt_description || `Bespoke ${query} Design`,
      roomType: query.includes("Kitchen") ? "Modular Kitchen" : query.includes("Bed") ? "Master Bedroom" : "Living Room",
      style: "Modern Luxury",
      image: photo.urls.regular,
      sqft: "350 - 600 sq.ft",
      budget: "₹5.0L - ₹8.5L",
      duration: "20 - 30 Days",
      location: photo.user?.location || "Icon Interiors Project",
      featured: false,
      description: photo.alt_description || "Custom high-end architectural finish with refined materials and ambient lighting.",
      materials: ["Architectural Elements", "Custom Joinery", "Ambient Lighting"],
      palette: ["#D4AF37", "#1E1E1E", "#ECE6DC", "#544A3D", "#8C7B65"],
      authorName: photo.user?.name,
      authorUrl: photo.user?.links?.html
    }));
  } catch (error) {
    console.error("Unsplash Search Error:", error);
    throw error;
  }
}
