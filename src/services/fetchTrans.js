async function translateText(text) {
   const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_KEY;
    // const apiKey = 'AIzaSyDDlASUrheN1t7t7ObiB10B178_EnyNPa4'; 
  
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'ro',
        format: 'text',
      }),
    });
  
    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error.message);
    }
    console.log('fetchTrans', data.data.translations)
    return data.data.translations[0].translatedText;
}

export default translateText;