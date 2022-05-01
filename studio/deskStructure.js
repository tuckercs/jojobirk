import S from '@sanity/desk-tool/structure-builder'

import { settingsMenu } from './desk/settings'
import { pagesMenu } from './desk/pages'

const hiddenDocTypes = listItem =>
  ![
    'page',
    'section',

    'generalSettings',
    'headerSettings',
    'footerSettings',
    'cookieSettings',
    'promoSettings',
    'seoSettings',

    'menu',
    'siteSettings',
    'redirect',
    'media.tag' // for media plugin
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Website')
    .items([
      pagesMenu,
      S.divider(),
      settingsMenu,

      // Filter out docs already defined above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
