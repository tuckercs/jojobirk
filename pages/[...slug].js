import React from 'react'

import { getPage, getAllDocSlugs } from '@data'

import Layout from '@components/layout'
import { Section } from '@components/sections'

const Page = ({ data }) => {
  return (
    <Layout site={data.site} page={data.page}>
      {data.page.sections?.map((section, key) => (
        <Section key={key} index={key} section={section} />
      ))}
    </Layout>
  )
}

export async function getStaticProps({ params, preview, previewData }) {
  const slug = params.slug.join('/')
  const slugs = [`/${slug}`, slug, `/${slug}/`]

  const pageData = await getPage({
    filter: `_type == 'page' && slug.current in ${JSON.stringify(slugs)}`,
    auth: {
      active: preview,
      token: previewData?.token,
    },
  })

  return {
    props: {
      data: pageData,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllDocSlugs('page')

  return {
    paths:
      allPages?.map((page) => {
        const slugs = page.slug.split('/').filter(Boolean)

        return {
          params: {
            slug: slugs,
          },
        }
      }) || [],
    fallback: false,
  }
}

export default Page
