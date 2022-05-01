import React from 'react'

import defaultResolve, {
  PublishAction,
  DiscardChangesAction,
  DeleteAction
} from 'part:@sanity/base/document-actions'

import { EyeOpenIcon } from 'phosphor-react'

const remoteURL = window.location.protocol + '//' + window.location.hostname
const localURL = 'http://localhost:3000'
const frontendURL =
  window.location.hostname === 'localhost' ? localURL : remoteURL

const singletons = [
  'generalSettings',
  'cookieSettings',
  'headerSettings',
  'footerSettings',
  'seoSettings',
  'page'
]

const editAndDelete = []

const previews = ['page', 'project']
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

const PreviewAction = props => {
  const slug = props.draft
    ? props.draft.slug?.current
    : props.published?.slug?.current

  return {
    label: 'Open Preview',
    icon: EyeOpenIcon,
    onHandle: async () => {
      const localURL = 'http://localhost:3000'
      const remoteURL = await sanityClient.fetch(
        '*[_type == "generalSettings"][0].siteURL'
      )

      const frontendURL =
        window.location.hostname === 'localhost' ? localURL : remoteURL

      window.open(
        `${frontendURL}/api/preview?secret=${previewSecret}&type=${
          props.type
        }&slug=${slug || ''}`
      )
    }
  }
}

export default function resolveDocumentActions(props) {
  const isSingle = singletons.indexOf(props.type) > -1
  const canEditDelete = editAndDelete.indexOf(props.type) > -1
  const canPreview = previews.indexOf(props.type) > -1

  if (isSingle) {
    return [
      PublishAction,
      DiscardChangesAction,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }

  if (canEditDelete) {
    return [
      PublishAction,
      DiscardChangesAction,
      DeleteAction,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }

  return [...defaultResolve(props), ...(canPreview ? [PreviewAction] : [])]
}
