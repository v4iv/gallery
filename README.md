# GALLERY

MindPeers Take Home Project

## Deployment
Can be deployed like a standard React Project, bootstrapped with Create React App

### Environment Variables

- REACT_APP_FLICKR_API_KEY - Flickr API Key
- REACT_APP_FLICKR_API_URL - Flickr API URL
- REACT_APP_URL - App's URL

### Technical Details/Features
- React
- Redux
- Gestalt
- Typescript
- React Hooks
- Axios
- React Router DOM
- Virtualized Infinite Scroller
- Typeahead Search

## Requirements

1. Default - By default, show the images from
   https://www.flickr.com/services/api/flickr.photos.getRecent.html
2. Search - A Search bar should be placed in the header. When a user is typing, display
   results from https://www.flickr.com/services/api/flickr.photos.search.html
3. Infinite Scroll - As you scroll down to the bottom of the page, display more results if
   there are more results.
4. Suggestions - Save their search queries(in the browser itself) so that the next time
   they come back, you can suggest search queries (like as a list/tags near the search
   bar).
5. Preview - Clicking on a photo in the results will bring the photo up in a modal.

## Bonus
- Make the search as efficient as possible with edge cases(0 results, More than x results )
- Use any UI framework e.g. bootstrap or material or antd (ant-design)
- Showing proper loaders and placeholders
- Page should be responsive
- Feel free to any open-source libraries
- The search bar section should be fixed on top of the page results as you scroll down on the
  page
