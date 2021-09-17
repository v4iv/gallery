import React from "react"
import { Helmet } from "react-helmet"

interface IProps {
  title: string
  url: string
  description: string
  image: string
}

const SEO: React.FunctionComponent<IProps> = (props) => {
  const { title, url, description, image } = props

  return (
    <Helmet>
      <title>{title} &middot; Gallery</title>

      <meta name="description" content={description} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />

      <meta name="twitter:site" content={url} />

      <meta
        name="twitter:title"
        content={`${title} | Gallery`}
      />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />

      <meta
        property="og:title"
        content={`${title} | Gallery`}
      />

      <meta property="og:author" content="Gallery" />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />
    </Helmet>
  )
}

export default SEO
