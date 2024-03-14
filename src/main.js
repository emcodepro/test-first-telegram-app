import {Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import config from 'config';
import {Loader} from './loader.js';
import {ChatGPT} from './chatgpt.js';

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
    handlerTimeout: Infinity,
});


bot.command('start', ctx => {
    ctx.reply('Welcome, Send me test message with tasks.')
});


bot.on(message('text'), async ctx => {
console.log(ctx);
    const loader = new Loader(ctx);

    await loader.show();

    await ChatGPT('test');
    ctx.reply('test');
    await loader.hide();
})

bot.launch();