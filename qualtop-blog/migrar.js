import { createClient } from '@sanity/client';
import { htmlToPortableText } from '@portabletext/html';
import { JSDOM } from 'jsdom';

const client = createClient({
  projectId: 'vpjbifnb', 
  dataset: 'production',
  useCdn: false,
  token: 'skwFiduKPa5bSdfXj8zUtBgiKt9xoJjJpvaNmdEY8sdf80DtUamqYXAM3fGB5w5r94hG4IljCyJlx3QbEkUb78FGwBnMVZTo46SV1QW7skBdlnRKXfOva4qrcJoCZiSk0K8YPZYDpqmbWe4WhreWH6Ui7AM3Ol3vdxmrFC7EttQhuGEkwo2I', // <-- Pega tu token aquí
  apiVersion: '2024-03-12',
});

async function migrarTodo() {
  console.log('🚀 Iniciando Migración Maestra (Texto + Imágenes + Autores)...');

  try {
    let allPosts = [];
    let page = 1;

  
    while (true) {
      console.log(`📡 Descargando página ${page} de WordPress...`);
      const res = await fetch(`https://qualtop.com/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`);
      
      if (!res.ok) break; 
      
      const posts = await res.json();
      if (posts.length === 0) break;
      
      allPosts = allPosts.concat(posts);
      page++;
    }

    console.log(`📥 ¡Éxito! Se descargaron ${allPosts.length} posts en total.\n`);


    for (const wp of allPosts) {
      console.log(`⏳ Procesando: ${wp.title.rendered}`);


      const blocks = htmlToPortableText(wp.content.rendered, {
        parseHtml: (html) => new JSDOM(html).window.document
      });

      let imageAsset = null;
      if (wp.featured_media && wp._embedded && wp._embedded['wp:featuredmedia']) {
        try {
          const imageUrl = wp._embedded['wp:featuredmedia'][0].source_url;
          console.log(`   🖼️ Descargando imagen: ${imageUrl}`);
          
          const imageRes = await fetch(imageUrl);
          const buffer = await imageRes.arrayBuffer();
          
          // Subimos la imagen a tu Sanity
          imageAsset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: imageUrl.split('/').pop() // Le sacamos el nombre original al archivo
          });
        } catch (imgError) {
          console.log(`   ⚠️ No se pudo descargar la imagen, el post se subirá sin foto.`);
        }
      }

  
      const newPost = {
        _type: 'post',
        title: wp.title.rendered,
        slug: {
          _type: 'slug',
          current: wp.slug
        },
        publishedAt: wp.date,
        body: blocks,

        author: {
          _type: 'reference',
          _ref: 'd42cedf6-994f-4eb9-8fd4-2a1037a33d47'
        },
      };

      if (imageAsset) {
        newPost.mainImage = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        };
      }

      const result = await client.create(newPost);
      console.log(`✅ ¡Completado! ID: ${result._id}\n`);
    }

    console.log('🎉🎉 ¡MIGRACIÓN TOTAL TERMINADA! 🎉🎉');
    console.log('revisar Sanity Studio y el Frontend.');

  } catch (error) {
    console.error('❌ Error fatal en la migración:', error);
  }
}

migrarTodo();