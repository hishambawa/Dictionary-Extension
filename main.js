chrome.contextMenus.create(
    {
        id : 'selectionGetter',
        title : 'Search',
        contexts : ['selection'],
    }
  );
  
chrome.contextMenus.onClicked.addListener(function (info,tab) 
{
    let text = info.selectionText;
    let word = text.split(' ')[0];
    let rootForm = lemmaChecker(word);
    
    let response = httpGet("https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/"+ rootForm);
    let definition = JSON.parse(response).results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
    
    alert(definition);
});

function httpGet(url)
{
  try 
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.setRequestHeader('app_id', '8259ea82');
    xmlHttp.setRequestHeader('app_key', '50b62a941cff9f698bc90cd029938fcb');
    xmlHttp.send( null );
  
    return xmlHttp.responseText;  
  } 
  
  catch (error)
  {
    alert("An error occurred while reaching the Oxford API. Please try again")
  }
  
}

function lemmaChecker(word)
{
  try
  {
    let response = httpGet("https://od-api.oxforddictionaries.com/api/v2/lemmas/en-gb/"+ word);
    let rootForm = JSON.parse(response).results[0].lexicalEntries[0].inflectionOf[0].text;
  
    return rootForm;
  }

  catch(error)
  {
    alert("An error occured in the Lemma Checker. Please try again later")
  }
  
}