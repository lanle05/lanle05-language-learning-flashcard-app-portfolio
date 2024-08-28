import axios from "axios";

// Google Translate API key
const GOOGLE_API_KEY = "AIzaSyD9iiGOvgpJqvxsbXrgLo21IWohJh3ckfA";

// Function to translate a word using Google Translate API
export const translateWord = async (word, targetLanguage) => {
  try {
    const response = await axios.get(
      "https://translation.googleapis.com/language/translate/v2",
      {
        params: {
          q: word,
          target: targetLanguage,
          key: GOOGLE_API_KEY,
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error translating word:", error);
    return null;
  }
};

// Random Word Generator API key (if required, replace with actual key)
const RANDOM_WORD_API_URL = "https://random-word-api.herokuapp.com/word";

// Function to get a random word using a random word generator API
export const getRandomWord = async () => {
  try {
    const response = await axios.get(RANDOM_WORD_API_URL, {
      params: {
        number: 1, // Number of words to generate
      },
    });
    return response.data[0];
  } catch (error) {
    console.error("Error fetching random word:", error);
    return null;
  }
};

// Example function to generate a random word and then translate it
export const generateAndTranslateWord = async (targetLanguage) => {
  try {
    // Step 1: Get a random word
    const randomWord = await getRandomWord();
    if (!randomWord) {
      throw new Error("Failed to generate a random word");
    }

    // Step 2: Translate the random word
    const translatedWord = await translateWord(randomWord, targetLanguage);
    if (!translatedWord) {
      throw new Error("Failed to translate the word");
    }

    return {
      baseWord: randomWord,
      translatedWord,
    };
  } catch (error) {
    console.error("Error in generating and translating word:", error);
    return null;
  }
};
