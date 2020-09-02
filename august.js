// Example 1- Create an interceptor that loads any existing attributes
const LoadAttributesRequestInterceptor = {
  async process(handlerInput) {
    const {attributesManager, requestEnvelope} = handlerInput;
    if(Alexa.isNewSession(requestEnvelope)) {             // if new session
      const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
      attributesManager.setSessionAttributes(persistentAttributes); // copy attributes
    }
  }
} // also need an interceptor that saves the attributes

// Example 2- Using Reminder Service API 
  // check for previous reminder, delete if exists
const previousReminder = sessionAttributes["reminderId"];
if (previousReminder) {
  try {
    if (remindersList.totalCount !== "0") {
      await reminderServiceClient.deleteReminder(previousReminder);
      delete sessionAttributes["reminderId"];
    }
  }
  catch (error) {
    console.log("failed to delete " + {previousReminder} 
      + " with error " + JSON.stringify(error));
  }
}
  // create new reminder
  const reminder = logic.createBirthdayReminder(
    birthdayData.daysUntilBirthday,
    timezone, 
    Alexa.getLocale(requestEnvelope),
    message )

// Example 3- Hitting an external API
function fetchBirthdays(day, month, limit) { // limit is max # entries returned
  const endpoint = 'https://query.wikidata.org/sparql'; // list of actors
  const sparqlQuery = // the 'wd and wdt are search params for humans' 
    `SELECT DISTINCT ?human ?humanLabel ?picture ?date_of_birth WHERE {
     ?human wdt:P31 wd:Q5;  
     wdt:18 ?picture.
     FILTER((DATATYPE(?date_of_birth) = xsd:dateTime)
     FILTER((MONTH(?date_of_birth)) = ${month})
     SERVICE wikibase:label { bd:serviceParam wikibase: language "en". }
     OPTIONAL { ?human wdt:P569 ?date_of_birth.}
    } LIMIT ${limit}`; 
  const url = endpoint + '?query' + encodeURIComponent(sparqlQuery);
  console.log(url);

  var config = {
    timeout: 6500, // timeout call b4 Alexa's 8 sec one (or use axios.default)
    headers: {'Accept': 'application/sparql-results+json'}
  };

  async function getJsonResponse(url, config) {
    const res = await axios.get(url, config);
    return res.data;
  }

  return getJsonResponse(url, config).then((result) => {
    return result;
  }).catch((error) => null);
 } 
}
