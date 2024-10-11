'use server'

import { Agent } from '@/domain/entities/agent'
import { unstable_cache } from 'next/cache'

export const loadAgentsFromBusinessId = unstable_cache(
  async (input: { business: { id: string } }, options?: { source: "server" | "mock" }): Promise<Agent[]> => {
    if(options?.source === "mock") {
      return [
        {
          id: "valid1",
          name: "Valid Agent",
          jid: "123",
          leads: Math.floor(Math.random() * 100),
          checkbox: false,
        },
        {
          id: "valid2",
          name: "Valid Agent 2",
          jid: "456",
          leads: Math.floor(Math.random() * 100),
          checkbox: false
        },
        {
          id: "invalid1",
          name: "Invalid Agent",
          jid: "789",
          leads: Math.floor(Math.random() * 100),
          checkbox: false
        }
      ]
    }
    return await fetch(process.env.BACKEND_URL?.concat("/client").concat(`/${input.business.id}`)!, {
      method: "GET",
    }).then(response => response.json()).then(response => response.response as Agent[])
  },
  ['agents'],
  { 
    revalidate: 60 * 2, // 60 seconds
    tags: ['agents'] 
  }
)

export const loadAgentsFromAds = unstable_cache(
  async (input: { ad: { id: string } }, options?: { source: "server" | "mock" }): Promise<Agent[]> => {
    if(options?.source === "mock") {
      return [
        {
          id: "valid1",
          name: "Valid Agent | Ad: ".concat(input.ad.id),
          jid: "123",
          leads: Math.floor(Math.random() * 100),
          checkbox: false
        },
        {
          id: "valid2",
          name: "Valid Agent 2 | Ad: ".concat(input.ad.id),
          jid: "456",
          leads: Math.floor(Math.random() * 100),
          checkbox: false

        },
        {
          id: "invalid1",
          name: "Invalid Agent | Ad: ".concat(input.ad.id),
          jid: "789",
          leads: Math.floor(Math.random() * 100),
          checkbox: false
        }
      ]
    }
    return await fetch(process.env.BACKEND_URL?.concat("/client").concat(`/${input.ad.id}`)!, {
      method: "GET",
    }).then(response => response.json()).then(response => response.response as Agent[])
  },
  ['agentsAd'],
  { 
    revalidate: 60 * 2, // 60 seconds
    tags: ['agentsAd'] 
  }
)

