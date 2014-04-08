function doGet(e) {
  // check parameter
  var sourceText = ''
  if (e.parameter.q){
    sourceText = e.parameter.q;
  }

  // set langage code
  // available langage code -> https://developers.google.com/translate/v2/using_rest#language-params
  var sourceLang = 'en';
  if (e.parameter.source){
    sourceLang = e.parameter.source;
  }
  var targetLang = 'ja';
  if (e.parameter.target){
    targetLang = e.parameter.target;
  }

  // translate text
  translatedText = LanguageApp.translate(sourceText, sourceLang, targetLang)
  var json = {
    'sourceText' : sourceText,
    'translatedText' : translatedText
    };
  
  // set JSONP callback
  var callback = 'callback';
  if(e.parameter.callback){
    callback = e.parameter.callback
  }
  
  // return JSONP
  return ContentService.createTextOutput(callback + '(' + JSON.stringify(json) + ')').setMimeType(ContentService.MimeType.JSON);
}