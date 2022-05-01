import React from 'react'

import { getPage, queries } from '@data'

import Layout from '@components/layout'
import { Section } from '@components/sections'

const ErrorPage = ({ data }) => {
  return (
    <Layout site={data.site} page={data.page}>
      {data.page.sections?.map((section, key) => (
        <Section key={key} index={key} section={section} />
      ))}
    </Layout>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getPage({
    filter: `_type == 'page' && _id == ${queries.errorID}`,
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

export default ErrorPage
