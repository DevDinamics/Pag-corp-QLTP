import { createClient } from '@sanity/client'

import { createImageUrlBuilder } from '@sanity/image-url' 

export const client = createClient({
  projectId: 'vpjbifnb', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2024-01-01',
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}