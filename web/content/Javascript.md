---
title: Javascript
sequence: 3
description: On the history of Javascript, the surrounding ecosystem, and practical applications to this project
languages:
  - javascript
  - typescript
---

# Background

You probably have a fairly solid understanding of how websites generally work. You go to a website and it sends back HTML and that's what you see. But, if you ever do any work in web dev, you'll quickly realize that there's only so much you can do (easily) with plain HTML and CSS. 

In my own words, HTML was really just meant to be "the word document" of the internet. 

## Introducing Javascript

Javascript is a "lightweight" language that was originally created to add interactivity to websites. Although it shares it's name with Java, comparing the two is like comparing cars to carpets. Yes, the syntax is *sort of* similar, but that's about it.

After the browser receives HTML, Javascript contained within `<script>` tags is executed. It can manipulate the DOM (the HTML structure of the page) and extend functionality with event listeners (such as mouse or keyboard clicks), animations and more. It's important to remember here that Javascript was designed to **extend** HTML, not replace. But who cares about intent?

Internet purists will tell you that Javascript is a plague that has no place in modern web development, but most others will look at those people and go "why are you stuck in 1997?" Of course, Javascript does deserve to be criticized (as all popular languages do), but it denying its usefulness is a tinfoil hat argument.

You might have heard of a library called jQuery. It was created during a time when Javascript was still a bit of a mess and didn't have internal support for many of the things that we take for granted now. jQuery (and other libraries like it) are much of the reason why Javascript managed to turn itself into a fairly decent language over time, but people who had to *deal* with Javascript before things were standardized have pretty good reason to still be skeptical.

Despite that, Javascript is now widely adopted and has grown beyond the tiny in-browser niche. Projects like [Node.js](https://nodejs.org/en) allow you to use Javascript as a backend (server) language and [npm](https://www.npmjs.com/) — Javascript's equivalent of pip — allows you to install third-party libraries and packages to extend functionality. This entire website is powered using Javascript (and it's surrounding ecosystem of libraries and tools). As for jQuery? You probably don't need it anymore.

Check out https://deno.com/blog/history-of-javascript for a more comprehensive history, though note that the author is biased towards advertising a JS project called "Deno".

## Quirks
Like all languages, Javascript has some very weird quirks. It's just the nature of a long-lived language that "tried to do it all", and got a lot of things wrong in the process which can now never be fixed. Probably the biggest quirk (that you'll actually run into) is the fact that Javascript is **loosely typed**. As opposed to a language like C (or even Python), this allows you to do some crazy things involving **type coercion**. For example, `1 + "2"`{lang="javascript"} (the number 1 and the string "2") will return the string "12". Conversely, `1 - "2"`{lang="javascript"} will return the number -1, and even more confusingly, `+'12'`{lang="javascript"} (nothing plus '12') equals the number 12 but `'12'+'12'`{lang="javascript"} equals the string "1212". 

I'm not going to get into why these examples are so (it's something you just learn/learn to avoid), but you do need to know that JS doesn't have very many safeguards to prevent these kind of things from happening accidentally. 

One of the few safeguards is Javascript's fairly unique concept of the **triple equal sign (===)**. This is because originally the language only had the normal (`==`) equality operator, which would return true if it was possible to coerce the two values into something equal. As a result, `1 == "1"`{lang="javascript"} would return true. Naturally, this was problematic in certain circumstances, so the triple equal sign was later added which only returns true if the values are equal in both type *and* value. So `1 === "1"`{lang="javascript"} would return false.

## Typescript
At this point, you might be thinking that Javascript seems kind of crazy and unsafe. And honestly, yeah, it is. Microsoft thought so too, so a while back they created a [Typescript](https://www.typescriptlang.org/). Typescript is an extension of Javascript that allows you to define and enforce static typing and detect errors. With it, bugs stemming from type coercion are much less likely to occur, because Typescript strongly encourages you to be very explicit about what types you are using. However, Typescript is not a replacement for Javascript. In fact, Typescript code isn't even runnable. It is a **static analyser**, checking for type-safety at **compile-time only**. 

Before running, a **transpiler** is used to convert Typescript code into plain Javascript code. Although that means that type safety isn't guaranteed at runtime, so long as you acknowledge and fix errors before compiling, it tends be fairly safe, and much safer than plain JS regardless. **Typescript made it possible to write safe Javascript code that scales incredibly well even at the industry level.**

### Learning Typescript
If you're making your first ever website, I'm a strong advocate for using plain-old HTML, CSS and JS without any plugins or frameworks or anything like that. Learn the basics and **learn why the frameworks exist and what problems they solve**.

If you're making a Node.js project without a frontend component (like a [Discord bot](https://discord.js.org/)), you can start in TS. But you should probably use JS for at least a day just to learn how much TS does for you.


The rest of this article is going to skip over a lot of details and nuances on what we take for granted in modern JS. If you are interested, these are additional some topics you can look into:
  - TSC (Typescript Compiler)
  - Bundlers (Webpack, etc.) and Transpilers (Babel)
  - ES6 (ECMAScript) vs CommonJS
  - CDN vs local libraries

These are things I have a subconscious understanding of because I have been working with JS for years. When in doubt, start small and research things as you come across them.

**You do not need to know everything now.**


# The (Modern) Javascript Ecosystem

At this point, we have Javascript, and we have Typescript. So what can we do with them? The answer is: a lot. The Javascript ecosystem is massive both on frontend and backend projects and there are libraries that can do just about anything you need. But let's jump back into web development for a second, and the problems of HTML.


## The Problem with HTML
The reality is, HTML is hard. It's cumbersome, it requires artistic talent (which I don't have), and attempting to manage large sites with it is a nightmare as there is no real way to containerize parts of the website. Programming languages, however, are designed to be containerized through functions and files and whatnot. So what if we combined the niceties of a programming language with the power of HTML? That's where **frameworks** come in. come in.

## Reactive Frameworks
Reactive frameworks are a type of Javascript library that allow you to build websites entirely in Javascript. They let you create reusable components that can be imported in multiple places on your site, or you can use pre-made components from open-source libraries on npm. 

> (If you follow any web development news, you might have heard of something called [Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)) which also let you create reusable web components without a framework. I'm pretending those don't exist because they aren't widely supported yet and have some problematic quirks.

Frameworks also simplify the process of changing state and visibility on a site (think a sidebar or a stylized dropdown). Of course, these benefits come with the con of decreased website performance, so it's on you to decide if the hours (or even months) of devtime saved using a reactive framework are worth the decrease in performace in your particular use case.

Reasons to not use reactive frameworks:
  - Your company banned the use of Javascript
  - Something will explode if your website doesn't load in 0.001 seconds
  - You like contributing to the tin foil hat industry
  - You have a genuinely good reason to not use it (e.g. learning purposes, extremely simple websites, memory constraints such as on microcontrollers, etc.)
  - You hit crippling performance issues using a framework and, after exhausting all other possible options, you concluded that the only way to make things work is to go framework-less (VSCode did this, for example).

The most popular reactive framework is [React](https://react.dev/). You should definitely learn it if you want to work in any web dev position because it's used everywhere. I'm not a particularly big fan of React, though. The designing principle was that "it's just Javascript", but honestly that's more a curse than a blessing in my opinion, and it comes with a much higher learning curve. Also, it's not just Javascript. It's way worse than "Just Javascript".

Anyways, I often recommend [Vue.js](https://vuejs.org/). It's what I use for all my projects (including this website) and I find it a lot more intuitive than React. It's also much more HTML-adjacent than other options.

Because React is, well... React, and Vue is Vue, "framework code" can't natively display in your web browser. Instead, a transpiler is used to convert the code into HTML, CSS and (a lot of) Javascript. It also uses a **Bundler** to combine all your files into a single file which is important for performance and storage size. Honestly, a lot of this is still magic to me, so maybe just take this for granted. Research when necessary.

## Backend Frameworks
If you're using Javascript on the backend (no UI), you'll probably end up making an Web API at some point. Express.js is very popular (and well-established) for this purpose. You'll end up using a lot of npm packages for backend work. For example, I learned a lot about JS through developing a Discord bot using [Discord.js](https://discord.js.org/). 

By the way, you don't need to use Typescript for any of this, focus on getting it working before getting it right!

## Fullstack Frameworks
A fairly new trend in web development is the rise of so-called **fullstack frameworks**. These are frameworks (in Javascript) that provide both a frontend and backend solution. This means UI and API in the same repository. This website uses a fullstack framework called [Nuxt](https://nuxtjs.org/) which is uses Vue.js for the frontend and plain Typescript for the backend. Again, research when necessary, take it for granted now.

> *Sidenote:*
> 
> Since we made our project, Nuxt 4 was released. The updated included some fairly major file structure changes, so keep that in mind if you're trying to match things to the docs. This website will work in the latest version of Nuxt 3.x, where x means "latest release of version 3".

# Conclusion
Describing Javascript is really, really hard. So, if you're interested in making a project with it, here's some recommendations:

1) If you're making a website using JS, **don't use a reactive framework** for your first project. In fact, **don't use any libraries at all**. Make something simple and get an understanding of what Javascript can do. This doesn't have to be a big project, just "something".

2) If you're making something on the backend, start with this template.
    - Create a file called `main.js`
    - Put Javascript code in there
    - Use `node main.js`{lang="shell"} to run it

3) Once you have the basics, move to Typescript and npm modules.

4) Make a project that solves a problem you have. Solving an existing problem is best, but you can make up a problem if you need to. Just make sure that the end product is something you can and would use.
    - Discord bot
    - Web API to get pictures of cats
    - Personal website
    - Website that uses your cat API to display pictures of cats
5) Research when necessary, but focus on practical knowledge. Theory is very complex and textbook-esque readings are never going to be as useful as trying things and learning from mistakes.