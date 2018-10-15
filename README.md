react-scrollable-url
=====================

[![npm version](https://img.shields.io/npm/v/react-scrollable-url.svg?style=flat-square)](https://www.npmjs.com/package/react-scrollable-url)

Lightweight library for smooth scrolling ulrls and anchors in React.

* Land on correct anchor when page is loaded, based on URL hash value or full url path.
* Scroll smoothly to anchors when in-page URL changes.
* URL updates automatically to reflect section in view.
* Option to record history on hash changes.

```js
npm install --save react-scrollable-url
```

## Examples

[Live Demo](https://pvoznyuk.github.io/react-scrollable-url) or [Source](https://github.com/pvoznyuk/react-scrollable-url/tree/master/example/src/components)

To run examples locally, `npm run example`, then open your
browser to localhost:3210.

## Usage

### 1. Creating a scrollable anchor

Use the `ScrollableSection` tag to wrap any React element(s), making it a scrollable anchor.
Use the `ScrollableLink` to wrpar a link to the corresponding section.
You may also set a `title` attribute if you want to update a document title.

```js
import React, { Component } from 'react';
import ScrollableSection, { ScrollableLink } from 'react-scrollable-url';

export default class Page extends Component {
  render() {
    return (
      <div>
        <ScrollableLink href="/section1">
          <a> Go to section 1 </a>
        </ScrollableLink> 
        
        <ScrollableLink href="/section2">
          <a> Go to section 2 </a>
        </ScrollableLink> 

        <ScrollableSection name={'section1'} title="Section 1">
          <div> Hello World </div>
        </ScrollableSection>
        
        <ScrollableSection name={'section2'} title="Section 2">
          <div> How are you world? </div>
        </ScrollableSection>
      </div>
    )
  }
}
```

In this case the address will be changed to `/section1` and `/section2`.

You can also use hashes or combine path and hash updates:

```html
<ScrollableLink href="#panel1">
  <a> Go to panel 1 </a>
</ScrollableLink> 

<ScrollableLink href="#panel2">
  <a> Go to panel 2 </a>
</ScrollableLink> 

<ScrollableSection hash={'panel1'}>
  <div> Panel 1 </div>
</ScrollableSection>

<ScrollableSection hash={'panel2'}>
  <div> Panel 2 </div>
</ScrollableSection>
```

```html
<ScrollableLink href="/section1#surprise">
  <a> Go to section 1, section #surprise</a>
</ScrollableLink> 

<ScrollableLink href="/section1#nothing">
  <a> Go to section 1, section #nothing </a>
</ScrollableLink> 

<ScrollableSection name={'section1'} hash={'surprise'}>
  <div> Surprise </div>
</ScrollableSection>

<ScrollableSection name={'section1'} hash={'nothing'}>
  <div> Nothing </div>
</ScrollableSection>
```    

You can also use `exact` prop if you want ot replace whole path with the given name/anchor.

```html 
<ScrollableSection name={'section1'} exact>
  <div> Content </div>
</ScrollableSection>
```

### 2. Configure

Access configureAnchors to customize scrolling and anchors.

##### Offset all scrollable anchors by a fixed amount

```js
import { configureAnchors } from 'react-scrollable-url'

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({offset: -60})
```

##### Options:

| option                | default          |
| --------------------  | ---------------- |
| `offset`              | `0`              |
| `keepLastAnchorHash`  | `false`          |

### 3. Utilities

A small toolkit of scrolling utilies for use with anchors

##### Jump to top of page in a way that plays nicely with scrollable anchors

```js
import { goToTop } from 'react-scrollable-url'

// scroll to top of the page
goToTop()
```

## Issues and feature requests

Please open issues on [Github](https://github.com/pvoznyuk/react-scrollable-url/issues). Issues are easier to address if you include context and code samples.

## Contributing

Please contribute!
