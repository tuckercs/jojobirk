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
      bgHex: '#5561C7',
      textHex: '#DAF3E1',
    },
    {
      name: 'green',
      bgHex: '#5D9061',
      textHex: '#FAAA78',
    },
    {
      name: 'red',
      bgHex: '#D26A51',
      textHex: '#ffffff',
    },
    {
      name: 'yellow',
      bgHex: '#FFCD4C',
      textHex: '#FF5733',
    },
    {
      name: 'lilac',
      bgHex: '#7771C7',
      textHex: '#C7C31F',
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
        style={{ gridTemplateRows: ' 1fr' }}
        className="grid grid-cols-12 gap-x-16 h-dvh items-start"
      >
        <div className="col-span-full sm:col-span-8 pt-10 pl-10 z-2">
          <Content blocks={page.content} />
        </div>

        <div className="absolute w-3/4 sm:w-1/3 z-0 top-0 right-0">
          <div className="w-full h-full bg-black z-10 absolute opacity-50 sm:opacity-20" />
          <Image src={page.portrait} />
        </div>

        <div className="col-span-full p-10 z-1 mb-30 sm:mb-0">
          <Icon name="Name" viewBox="0 0 675 73" />
        </div>
        <div className="fixed w-screen h-50 bottom-0 z-2">
          <div className="bg-black text-white h-full text-right text-22 px-10 flex items-center justify-between">
            <div className="flex">
              <div className="w-25 mr-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/jordan-birkhead-764603154/"
                >
                  <Icon name="linkedin" viewBox="0 0 256 256" color="#fff" />
                </a>
              </div>
              <div className="w-25">
                <a href="mailto:birkheadjordan@gmail.com">
                  <Icon name="mail" viewBox="0 0 256 256" color="#fff" />
                </a>
              </div>
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
