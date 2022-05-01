import React from 'react'
import NextLink from 'next/link'

import { getRoute } from '@lib/routes'
import { ConditionalWrapper } from '@lib/helpers'

const Link = ({ href, external = false, children, ...rest }) => {
  const hrefPath = typeof href === 'object' ? getRoute(href) : href
  const hrefAttribute = external ? { href: hrefPath } : {}

  return (
    <ConditionalWrapper
      condition={!external}
      wrapper={(children) => (
        <NextLink href={hrefPath} scroll={false}>
          {children}
        </NextLink>
      )}
    >
      <a
        {...hrefAttribute}
        target={external && !hrefPath.match('^mailto:|^tel:') ? '_blank' : null}
        rel={external ? 'noopener noreferrer' : null}
        {...rest}
      >
        {children}
      </a>
    </ConditionalWrapper>
  )
}

export default Link

{
  /* SAMPLE USES */
}

{
  /* <Link href="/relative-string">Relative Link (string)</Link>
    
<Link href="mailto:hello@spaghetti.com">Mailto Link</Link>

<Link href="tel:800-311-0932">Tel Link</Link>

<Link href={{
  type: 'page',
  slug: 'spaghetti',
  hash: 'parmesan',
  query: {
    noodles: 'linguine',
    sauce: 'bolognese'
  }
}}>Relative Link (object)</Link> */
}
