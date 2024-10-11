'use server'

import { AD } from '@/domain/entities/ad'
import { Agent } from '@/domain/entities/agent'
import { unstable_cache } from 'next/cache'

export const loadAdsFromBusinessId = unstable_cache(
  async (input: { business: { id: string } }, options?: { source: "server" | "mock" }): Promise<AD[]> => {
    if(options?.source === "mock") {
      return [
        {
          id: "valid1",
          name: "Valid Ad",
          sourceId: "123",
          leads: Math.floor(Math.random() * 100)
        },
        {
          id: "valid2",
          name: "Valid Ad 2",
          sourceId: "456",
          leads: Math.floor(Math.random() * 100)
        },
        {
          id: "invalid1",
          name: "Invalid Ad",
          sourceId: "789",
          leads: Math.floor(Math.random() * 100)
        },
      ]
    }
    return await fetch(process.env.BACKEND_URL?.concat("/client").concat(`/${input.business.id}`)!, {
      method: "GET",
    }).then(response => response.json()).then(response => response.response as AD[])
  },
  ['ads'],
  { 
    revalidate: 60 * 2, // 60 seconds
    tags: ['ads'] 
  }
)