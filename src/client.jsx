import { createClient } from '@sanity/client'
// CORRECCIÓN: Usamos la importación con llaves { }
import { createImageUrlBuilder } from '@sanity/image-url' 

export const client = createClient({
  projectId: 'vpjbifnb', // <--- ¡IMPORTANTE! Pon tu ID real aquí (k4j5l6...)
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2024-01-01',
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}