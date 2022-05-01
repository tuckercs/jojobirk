import groq from 'groq'

// Construct our "home" and "error" page GROQ
export const homeID = `*[_type=="generalSettings"][0].home->_id`
export const errorID = `*[_type=="generalSettings"][0].error->_id`

// Construct our "image meta" GROQ
export const imageMeta = groq`
  "alt": coalesce(alt, asset->altText),
  asset,
  crop,
  customRatio,
  clipPath,
  hotspot,
  "id": asset->assetId,
  "type": asset->mimeType,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "lqip": asset->metadata.lqip
`
// Construct our "portable text content" GROQ
export const ptContent = groq`
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
    }
  },
  _type == "photo" => {
    ${imageMeta}
  }
`

// Construct our "page" GROQ
export const page = groq`
  _type == 'page' => {
    "type": _type,
    "slug": slug.current,
    pageTitle,
    seo,
  }

`

// Construct our content "sections" GROQ
export const sections = {
  global: groq`
  _type,
  _key,
  "id": _key,
  title
  `,
  blockText: groq`
  _type == 'blockText' => {
    content[]{
      ${ptContent}
    },
  }
  `,
  dividerImage: groq`
  _type == 'dividerImage' => {
    image{
      ${imageMeta}
    },
  }
  `,
}

// Construct our "site" GROQ
export const site = groq`
  "site": {
    "title": *[_type == "generalSettings"][0].siteTitle,
    "rootDomain": *[_type == "generalSettings"][0].siteURL,
    "seo": *[_type == "seoSettings"][0]{
      metaTitle,
      metaDesc,
      shareTitle,
      shareDesc,
      shareGraphic,
      "favicon": favicon.asset->url,
      "faviconLegacy": faviconLegacy.asset->url,
      touchIcon
    },
  }
`
