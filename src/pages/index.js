import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

import Img from 'gatsby-image'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    console.log(this.props.data)

    return (
      <div>
        <Helmet title={siteTitle} />
        <Bio />
        <Img sizes={this.props.data.imageOne.sizes} />

        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}

        <Img sizes={this.props.data.imageTwo.sizes} />
        <Img sizes={this.props.data.imageThree.sizes} />

      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
    imageOne: imageSharp(id: { regex: "/one.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
    imageTwo: imageSharp(id: { regex: "/two.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
    imageThree: imageSharp(id: { regex: "/three.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
