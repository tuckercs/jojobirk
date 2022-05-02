import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import {
  Gear,
  NavigationArrow,
  AnchorSimple,
  Cookie,
  FlagBanner,
  GlobeSimple,
  Shuffle
} from 'phosphor-react'

export const settingsMenu = S.listItem()
  .title('Settings')
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('General')
          .child(
            S.editor()
              .id('generalSettings')
              .schemaType('generalSettings')
              .documentId('generalSettings')
          )
          .icon(() => <Gear weight="duotone" />),
        S.divider(),
        S.listItem()
          .title('Default SEO / Share')
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          )
          .icon(() => <GlobeSimple weight="duotone" />)
      ])
  )
  .icon(() => <Gear weight="duotone" />)
