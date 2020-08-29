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

