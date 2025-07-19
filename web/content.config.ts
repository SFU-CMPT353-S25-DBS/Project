import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        languages: z.array(z.string()).optional(),
        sequence: z.number().optional(),
      })
    })
  }
})