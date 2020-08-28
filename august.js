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
