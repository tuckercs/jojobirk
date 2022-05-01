import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Documents
import page from './documents/page'
import cookieSettings from './documents/settings-cookie'
import promoSettings from './documents/settings-promo'
import footerSettings from './documents/settings-footer'
import headerSettings from './documents/settings-header'
import generalSettings from './documents/settings-general'
import settingsSeo from './documents/settings-seo'
import section from './documents/section'
import redirect from './documents/redirect'

// Objects
import horizontalRule from './objects/horizontal-rule'
import seo from './objects/seo'

// Sections
import blockText from './sections/block-text'
import dividerImage from './sections/divider-image'

export default createSchema({
  // Create Schema
  name: 'content',

  // Then proceed to concatenate our schema types
  types: schemaTypes.concat([
    // Document types
    page,
    generalSettings,
    footerSettings,
    headerSettings,
    cookieSettings,
    promoSettings,
    settingsSeo,
    section,
    redirect,

    // Object types

    horizontalRule,
    seo,

    // Section types
    blockText,
    dividerImage
  ])
})
