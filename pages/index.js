import React from 'react'

import { getPage, queries } from '@data'

import Layout from '@components/layout'
import Icon from '@components/icon'
import Content from '@components/block-content'
import Image from '@components/image'

const Home = ({ data }) => {
  const { page, site } = data

  const colors = [
    {
      name: 'white',
      bgHex: '#ffffff',
      textHex: '#000000',
    },
    {
      name: 'blue',
      bgHex: '#0000ff',
      textHex: '#ff0000',
    },
    {
      name: 'red',
      bgHex: '#ff0000',
      textHex: '#ffffff',
    },
    {
      name: 'green',
      bgHex: '#00FF00',
      textHex: '#FF5733',
    },
  ]

  const handleClick = (e) => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = e.bgHex
      document.body.style.color = e.textHex
    }
  }

  return (
    <Layout site={site} page={page}>
      <div
        style={{ gridTemplateRows: 'auto 1fr' }}
        className="grid grid-cols-12 gap-x-16 h-dvh items-start"
      >
        <div className="col-span-full p-10">
          <Icon name="Name" viewBox="0 0 675 73" />
        </div>

        <div className="col-span-4 pt-10 pl-10">
          <Content blocks={page.content} />
        </div>
        <div className="col-span-4 p-10">
          <Content blocks={page.content} />
        </div>

        <div className="col-span-3 col-start-10 pt-10 pr-10">
          <div className="">
            <Image src={page.portrait} />
          </div>
        </div>
        <div className="fixed w-screen h-50 bottom-0">
          <div className="bg-black text-white h-full text-right text-22 px-10 flex items-center justify-between">
            <div className="w-25">
              <Icon name="Twitter" viewBox="0 0 256 256" color="#fff" />
            </div>

            <div className="flex">
              {colors.map((c, i) => {
                return (
                  <div
                    key={i}
                    style={{ backgroundColor: c.bgHex }}
                    onClick={() => handleClick(c)}
                    className="rounded-full cursor-pointer w-20 h-20 mr-4 scale-100 hover:scale-110 transition-scale"
                  />
                )
              })}
            </div>
            <span>2022</span>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getPage({
    filter: `_type == 'page' && _id == ${queries.homeID}`,
    fields: `
    content[]{
      ${queries.ptContent}
    },
    portrait{
      ${queries.imageMeta}
    }
  `,
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

export default Home
