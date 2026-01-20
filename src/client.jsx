import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'vpjbifnb', // Lo encuentras en sanity.json o en manage.sanity.io
  dataset: 'production',
  useCdn: false, // true para lectura rápida (cacheada)
  apiVersion: '2023-05-03', // usa la fecha de hoy
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return builder.image(source)
}