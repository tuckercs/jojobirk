import groq from 'groq'

import { getSanityClient } from '@lib/sanity'
import * as queries from './queries'

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && wasDeleted != true && isDraft != true]{ "slug": slug.current }`
  )
  return data
}

// Fetch a static page with our global data
export async function getStaticPage(pageData, preview) {
  const query = `
  {
    "page": ${pageData},
    ${queries.site}
  }
  `

  const data = await getSanityClient(preview).fetch(query)

  return data
}

export async function getPageSection(filter, auth) {
  const query = groq`
    *[${filter}] | order(_updatedAt desc)[0].sections[]{
      "type": select(_type == 'reference' => @->section[0]._type, _type),
      "isReference": _type == 'reference'
    }
  `

  const sections = await getSanityClient(auth).fetch(query)

  const uniqueModules = sections?.filter((value, index, self) => {
    return (
      self.findIndex(
        (v) => v.type === value.type && v.isReference === value.isReference
      ) === index
    )
  })

  return uniqueModules
}

export async function getPage({ filter, fields = null, auth }) {
  const sectionData = await getPageSection(filter, auth)
  const hasReferences = sectionData?.some((section) => section.isReference)
  const query = groq`
  {
    "page": *[${filter}] | order(_updatedAt desc)[0]{
      "id": _id,
      "slug": slug.current,
      title,
      seo,
      sections[] {
        ${
          hasReferences
            ? `defined(_ref) => {...@->section[0] {
            ${queries.sections.global},
            ${sectionData
              ?.filter((section) => section.isReference)
              .map(({ type }) => queries.sections[type])
              .join(',')}
          }},`
            : ''
        }
        !defined(_ref)=>{
          ${queries.sections.global},
          ${sectionData
            ?.filter((section) => !section.isReference)
            .map(({ type }) => queries.sections[type])
            .join(',')},
        }
      },
      ${fields ?? ''}
    },
    ${queries.site}
  }
  `

  const pageData = await getSanityClient({ auth }).fetch(query)

  return pageData
}

export { queries }
