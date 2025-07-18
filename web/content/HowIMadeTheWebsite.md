---
title: How I Made the Website
sequence: 4
description: A brief overview of how I made the website for our project, including the design requirements I had and the tools I used.
languages:
  - javascript
  - typescript
  - nuxt
  - vuejs
  - html
---

# Requirements
When I was designing the website, I had a few requirements in mind:
  1) It should be very simple. The bulk of our project grade isn't based on the website, so I didn't want to spend too much time on it.
  2) It should be fairly permanent. I don't have to worry about it breaking in the future due to updates or free trials or funds expiring.
  3) It should be easy to use both from the user perspective and the developer perspective (UX and DX respectively)
  4) Editing key parts of the website should be as simple as possible


So with those requirements in mind, here's what that turned into for me.

## Technologies
The core of the website is powered by Nuxt, a fullstack Javascript framework. Nuxt uses Vue.js for it's UI and frontend and Typescript/Node.js for the backend. I chose Nuxt for a few reasons:
  - I have a lots of experience with Vue and Nuxt. This is basically what I use for all my personal projects.
  - It does a lot for me. It lets me not worry about Bundling or Transpiling or any of the other annoyances of JS development and just lets me focus on content.
  - Using a Reactive Framework in the Frontend (Vue) means I can use existing component libraries to handle styling and layout. I'm not an artist, so this helps me make nice enough things quickly.

Initially, I didn't want to use Nuxt. I thought it was too overbuilt for what we needed, but after fighting with other solutions for a while, I realized that I was wasting too much time on things that don't matter, and using Nuxt would mean just getting things working and moving on.

## Nuxt
At the heart of every Javascript project is the `package.json` file. This is similar to a `requirements.txt` file you would see in Python, though it does a lot more than just handle dependency management. For nuxt, there's also the `nuxt.config.ts` file, which contains Nuxt-specific configuration. Pretty much any **"batteries-included"** framework (meaning it does a lot for you) will have some sort of configuration file.

Remember that the end goal of these frameworks is to simplify the process of building a website. At the end of the day, they take your code in whatever language it is in (Vue, React, Typescript, etc.) and turn it into a hodgepodge of HTML, CSS, and JS files which don't have a concept of a "framework". So, when you run `npm run build`{lang="shell"}, it looks for a `build` script in the `package.json` file, then hands it off to Nuxt to compile everything down into a single folder containing all those "de-nuxtified" files (`.output` in our case). We then can ship that folder off to a provider such as [GitHub Pages](https://pages.github.com/) and ta-da, we have a website.

### Understanding Vue & the Folder Structure
Nuxt uses a very specific folder structure to organize code. The `pages/` folder, for example, contains all the individual routes of the website (note, `index` is a web convention meaning "default". For example, https://google.com and https://google.com/index.html typically go to the same place).

Inside of `pages/index.vue` is the code for the homepage. This is a Vue component, meaning we'll be writing Vue code in here. [Vue components](https://vuejs.org/guide/scaling-up/sfc.html) (files) have three sections `<template>`, `<script>` and `<style>`.

### Template
The template section is where we define the visual layout of the file. Any HTML we write here will be rendered on the page.

Now here's the cool part, and the reason we use a reactive framework. You can directly reference any Javascript variable directly in your HTML code, either to display it, or conditionally show parts of the page using the `v-if` **directive**.

The official docs will do a better job at demonstrating this than I will, so go have a look at the link above.

### Sidenote
For the rest of the article, keep these notes in mind:

1. If you're having a look at the websites code using VSCode. Make sure to install the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.
2. All my file paths will be relative to the `web/` folder

Additionally, Nuxt does a lot of magic, and one of the things they do is called [Auto Imports](https://nuxt.com/docs/3.x/guide/concepts/auto-imports#auto-imported-components). I'm not a fan of Auto Imports because I find it harder to trace through component trees (components importing other components). C'est la vie.

As a simple tool for you, here's how you can find the source code for an Auto Imported component like: `<LazyVisualsVisualizationIFrame/>`{lang='vue'} 

> Note: A non-auto imported component will have a statement in the `<script>` section of the component that explicitely imports it

1. Ignore the "Lazy" prefix if there is one (it's just a [modifier](https://nuxt.com/docs/3.x/guide/directory-structure/components#delayed-or-lazy-hydration))
2. Go to the `components/` folder
3. The name of the component is the file path (in this case, we can find the component at `components/visuals/VisualizationIFrame.vue`)

## Displaying visualizations
I was very excited to discover that the visualization libaries we were using in Python had the option to export to html. That makes it super duper easy to import into a website.

1. The visualizations created by python are verbatum stored under `/public/rawVisuals`
2. I use an [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) to display that HTML in Vue without needing to convert anything. `<iframe>` isn't unique to Vue; it's a very old feature that allows websites to embed parts of websites in them.
3. I created a file called `assets/visualizations.ts` to tell Vue metadata information about each visualization file, and the order in which to render them
4. In `pages/index.vue`, that visualizations.ts file is loaded and each visualization is displayed using the `v-for` directive to iterate the array in a loop.

This way, you didn't need to edit any Vue code in order to add another visualization to the webiste (important for making it accessible to both of you). And, I only needed to create one Visualization component which could be reused every time (which means less work for me)

## The Visualization component
You can find the Vue component used for displaying the visuals at `components/visuals/VisualizationIFrame.vue` which (naturally) contains the `<iframe>` used to display the visualization, as well as the title, description and sources.

### Third-Party Component
(If you have the Vue extension installed) You might notice a couple of extra Green-coloured tags like `<Card>`{lang='vue'} and `<Panel>`{lang='vue'}. Those are components imported from a third-party UI library called [PrimeVue](https://primevue.org/). 

Again, this is a time-saving measure. Especially in this context, why put time and effort into making my own components when I can just use an existing component library and change the colours a little bit?

> Using third-party UI libraries is very common in the industry as well. At my workplace, we use a React component library called [FluentUI](https://developer.microsoft.com/en-us/fluentui#/).

### Component Controls
In the `<script>` tag of the component, you'll notice a line that says `defineProps()`{lang='ts'}. [Props](https://vuejs.org/guide/components/props) are Vue's way of letting you pass information from a Parent component to it's child. This let's you keep components more generic and reusable. 

For example, I use props to pass the path to the visualization HTML file that this instance of the component should render. That way I don't have to make a unique Component file for each visualization we want to display.

## Going Further
The last major fancy thing I did was when I went "Hey, it takes a minute for the main page with all the visualization to load. It would be cool if each visualization could also have it own dedicated sub-page as well". So I did that.

Under `pages/visuals` you'll see a file called `[...slug].vue`. This is another syntax unique to Nuxt. It basically says, "use this file for any URL that navigates to a path under the `visuals/` directory."

Using that, I can automagically generate a dedicated page for each visualization without any extra configuration. It's "source of truth" is the same `visualizations.ts` file from earlier.

To make sure not just any path, say `visuals/askl;jas;ldkj`, tries to resolve a visualization file, we use another "Nuxt-ity" called `definePageMeta()`{lang='ts'} to validate that the path is expected and known. Not found? 404 page.

This dedicated page also has a fancy feature I added to export visualizations to an image file. It an npm module I found called [`html-to-image`](https://www.npmjs.com/package/html-to-image).

## This blog
Content for this blog is under `pages/blog/`. notice it also has a `[...slug].vue` file.

I'm using a plugin for Nuxt called [Nuxt Content](https://content.nuxt.com/), which lets me write everything in Markdown files instead of Vue. Those markdown files are located under the `content/` folder.

## Preparing for GitHub Pages
So we have the website. But as of now, we can only see the website on our local computer. How do we let others see it?

For that, we use a hosting provider. I chose GitHub Pages because it's free, and can be linked to same repository our code is stored in.

First things first, we need to turn this into plain-old JS:

```sh
npm run build
```

Okay, easy enough. That created a new `.output/` folder which contains 100% organic Vue.js-free Javascript and HTML.

Now, we literally just have to upload that `.output/` folder to GitHub Pages and we have a website. I'm not simplifying at all there. It's actually that easy.

<br/>
<br/>
<p>......</p>
<br/>
<br/>
<br/>

### I lied, it's slightly more complicated
I don't want to have to do that *manually* every time someone makes a change. That would take *effort*. Let's automate it.

The dream scenario is this:

1) Anytime someone edits the website:
2) Run the `npm run build`{lang='sh'} command
3) Automatically upload to GitHub Pages

Suprise! GitHub has a product for that.

### GitHub Actions

[GitHub Actions](https://github.com/features/actions) lets you run certain operations based on events that happen in your repository (like editing the website). Actions a configured through files called *workflows*. You can see workflow for the action I wrote for this project under the project root in `.github/workflows/deployWeb.yaml`.

This is a very common use case for Actions, so it's fairly documented. In fact, I basically copied that file verbatim from [here](https://nuxt.com/deploy/github-pages)

I don't have much else to say about that. The action:
- Downloads our code
- Builds it
- Uploads it
- ✨Tada✨

## The end
That's a very light overview of the website and Nuxt. Let me know if you want me to go deeper into anything. 

Hope you both have (had? 😬) a great semester! Please reach say hi if you see me :)