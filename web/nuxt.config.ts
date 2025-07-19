import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{slate.50}",
      100: "{slate.100}",
      200: "{slate.200}",
      300: "{slate.300}",
      400: "{slate.400}",
      500: "{slate.500}",
      600: "{slate.600}",
      700: "{slate.700}",
      800: "{slate.800}",
      900: "{slate.900}",
      950: "{slate.950}",
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/icon", "@primevue/nuxt-module", "@nuxt/content"],
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          prefix: "p",
          darkModeSelector: ".my-app-dark",
          cssLayer: false,
        },
      },
      ripple: true,
    },
    directives: {
      include: ['Ripple', 'Tooltip'],
    }
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            "js", 
            "ts",
            "html",
            "css",
            "vue",
            "json",
            "csv",
            "shell",
            "md",
            "yaml",
            "mdc",
            "python",
            "py"
          ]
        },
        toc: {
          depth: 2
        }
      }
    },
    renderer: {
      anchorLinks: false
    }
  },

  ssr: true,

  $development: {
    app: {
      baseURL: "/"
    }
  },

  $production: {
    app: {
      baseURL: "/Project/",
    },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "CMPT 353 | Supplementary Report Material | Group DBS",

      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/Project/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/Project/favicon.svg" },
        { rel: "shortcut icon", href: "/Project/favicon.ico" },
      ],
    },
  },

  nitro: {
    preset: "github-pages",
  }
});
