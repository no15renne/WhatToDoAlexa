import Alexa from 'alexa-sdk';
import TodoComponent from '../entity/todo_component';

const APP_ID = undefined;

const HELP_MESSAGE = 'わからん';
const HELP_REPROMPT = 'もっかい';
const STOP_MESSAGE = 'ほなまた';

const getSlots = function (event) {
  const { request } = event
  if (!request) return {}
  const { intent } = request
  if (!intent) return {}
  const { slots } = intent
  return slots
}

const getSlotByName = function (event, name) {
  const slots = getSlots(event)
  if (!slots[name]) return {};
  return slots[name]
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const speechOutput = HELP_MESSAGE;
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'response': function() {
        const firstNameValue = getSlotByName(this.event, 'name').value;

        const todoList = [new TodoComponent('洗濯'), new TodoComponent('掃除'), new TodoComponent('イカ')];
        const randomTodo = todoList[Math.floor(Math.random() * todoList.length)];

        if (firstNameValue !== undefined) {
            this.response.speak(`${firstNameValue}さん、ハローなのです。${randomTodo.title}をやりましょう。`);
        } else {
            this.response.speak(`ハローなのです。${randomTodo.title}をやりましょう。`);
        }
        this.emit(':responseReady');
    },
};

export function handler(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
