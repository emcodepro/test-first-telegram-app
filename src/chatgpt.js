import OpenAI from 'openai';
import config from "config";

const CHATGPT_MODEL = 'gpt-3.5-turbo';
const ROLES = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user',
}

const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY'),
});


const getMessage = (message) => {

    return `
        Write tasks depended on emotional story: ${message}
        
        
        This Theses are about key moments of day.
        For example get story, which helps me to remember this day and after this i will talk about this to my friends.
        No Long text is needed, main is this it should me emotional and this should be subsequential  and with in frame of this context.
    `
}

export async function ChatGPT(message = '') {

    const messages = [
        {
            role: ROLES.SYSTEM,
            content: 'You are experienced copywriter, which writes good emotional Theses for social medias'
        },
        {
            role: ROLES.USER,
            content: getMessage(message),
        }
    ];

    try {
        const completion = await openai.chat.completions.create({
            messages,
            model: CHATGPT_MODEL,
        });

        console.log(completion.choices[0].message);

    } catch (e) {
        console.log('Error while completion chat gpt', e);
    }
}