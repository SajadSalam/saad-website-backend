'use strict';

/**
 *  tran controller
 */
const TelegramBot = require("node-telegram-bot-api");
const token = "1798483416:AAGs9pr5S9447icLfbAR1kUce1g5bdo9Ukk";
const bot = new TelegramBot(token);
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tran.tran', ({ strapi }) => ({
    async create(ctx) {
        let res = await super.create(ctx);
        let body = ctx.request.body;
        
        let path = `${__dirname}\\..\\..\\..\\..\\..\\public${body.data.path.replace(/\//g, "\\")}`;
        
        strapi.log.info(path);
        await bot.sendDocument(872819018, path, {
            caption: `*عملية تحويل جديدة*
            - الاسم الثلاثي : \`${body.data.name}\`
            - رقم الحساب الارباح : \`${body.data.invest_number}\`
            - البريد الالكتروني : \`${body.data.email}\`
            - رقم الهاتف : \`${body.data.phone}\`
            - اسم المرسل : \`${body.data.send_name}\``,
            parse_mode: 'Markdown'
        });
        // sendDocument from file
        // await bot.sendDocument(872819018, 'https://localhost:1337' + body.data.path);
        return res;
    }
}));
