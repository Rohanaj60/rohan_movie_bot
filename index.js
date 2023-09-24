///
// const { Telegraf } = require("telegraf");
import { Telegraf } from "telegraf";
import express from "express";
// const { message } = require("telegraf/filters");
import {message} from "telegraf/filters"
const bot = new Telegraf("6549325436:AAEhDYSIByN6OjGV4DDOcrNSCSAst3x0MEs");
// const express = require("express");
// const fetch = require("node-fetch");
import fetch from "node-fetch";
const app = express();
app.get('/',async (req,res)=>{
  bot.command("start", async (ctx) => {
    // Explicit usage
    await ctx.reply(
      "This bot is created by Rohan, Just search the name and u will get the streaming link"
    );
  
    // Using context shortcut
  });
  bot.command("quit", async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id);
  
    // Using context shortcut
    await ctx.leaveChat();
  });
  
  bot.on(message("text"), async (ctx) => {
    const message = ctx.message.text.toLowerCase().trim();
    ctx.reply('Working naa......')
  return;
  
    const url = `https://api.themoviedb.org/3/search/movie?query=${message}&include_adult=false&language=en-US&page=1`;
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDAzNTA1YjM2NDRmZTM4MmE4ZGFkOTExNWEwYWM0ZCIsInN1YiI6IjVlOGE4ODk5NGQwZThkMDAxMmUwZGZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5JIWtrIjQx_34-MOSp_qRPbVQatqg9uzAuwzmT6moaE'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        if(json.results.length>0){
          ctx.reply('Wait Fetching......')
      json.results.map((result,index)=>{
          ctx.replyWithPhoto({ url: 'https://image.tmdb.org/t/p/w500'+ result.poster_path }, { caption: generatOutput(result.title,`https://vidsrc.to/embed/movie/${result.id}`,`https://vidsrc.to/embed/movie/${result.id}`) });
      })
      }
      
      else{
          ctx.reply('Cant found movie , you can request movie using /request')}
      }
      
      )
      .catch(err => console.error('error:' + err));
      
  
  });
  
  bot.on("callback_query", async (ctx) => {
    // Explicit usage
    await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);
  
    // Using context shortcut
    await ctx.answerCbQuery();
  });
  
  bot.on("inline_query", async (ctx) => {
    const result = [];
    // Explicit usage
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);
  
    // Using context shortcut
    await ctx.answerInlineQuery(result);
  });
  
  bot.launch(() => {
    console.log("Bot is running");
  });
  
  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
  
  
  // functionssss
  function generatOutput(movieName,link1,link2){
    const template=`🔺 ${movieName}\n\n🔻🎀 Links:\n\n▪️Streaming Link:${link1}\n\n▪️Download Link:${link2}\n\n┏━━━━━━━━━━━━━━━━━┓\n▪️Follow also ->@rnzaj60\n┗━━━━━━━━━━━━━━━━━┛\n`
  
  return template
  }
  
res.send('rohan_movie_bot is working')

}
)
app.listen(3000,()=>{
  console.log('Server port no 3000 ma run vairaaxa')
})
