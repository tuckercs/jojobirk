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
          .title('Header')
          .child(
            S.editor()
              .id('headerSettings')
              .schemaType('headerSettings')
              .documentId('headerSettings')
          )
          .icon(() => <NavigationArrow weight="duotone" />),
        S.listItem()
          .title('Footer')
          .child(
            S.editor()
              .id('footerSettings')
              .schemaType('footerSettings')
              .documentId('footerSettings')
          )
          .icon(() => <AnchorSimple weight="duotone" />),
        S.divider(),
        S.listItem()
          .title('Cookie Consent')
          .child(
            S.editor()
              .id('cookieSettings')
              .schemaType('cookieSettings')
              .documentId('cookieSettings')
          )
          .icon(() => <Cookie weight="duotone" />),
        S.listItem()
          .title('Promo Bar')
          .child(
            S.editor()
              .id('promoSettings')
              .schemaType('promoSettings')
              .documentId('promoSettings')
          )
          .icon(() => <FlagBanner weight="duotone" />),
        S.divider(),
        S.listItem()
          .title('Default SEO / Share')
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          )
          .icon(() => <GlobeSimple weight="duotone" />),
        S.listItem()
          .title('Redirects')
          .child(S.documentTypeList('redirect').title('Redirects'))
          .icon(() => <Shuffle weight="duotone" />)
      ])
  )
  .icon(() => <Gear weight="duotone" />)
