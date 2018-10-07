const { Translate } = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'AIzaSyBN-bwtos8sKU6X84wkrdjtCF7uzng6kgQ';

// Instantiates a client
const googleTranslate = new Translate({
  projectId: projectId
});

export function translate(lang: string, text: string) {
  // Translates some text into Russian
  return googleTranslate
    .translate(lang, text)
    .then(results => {
      const translation = results[0];

      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}
