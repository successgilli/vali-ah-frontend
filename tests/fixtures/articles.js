export const createdArticle = {
  title: 'Great men',
  body: '<div class="ce-block">\n  <div class="ce-block__content">\n    <div class="ce-paragraph cdx-block">\n      <img src="http://res.cloudinary.com/vali-1kbdeas/image/upload/v1568535998/1KBIdeas%20Articles/lr8xgykcn0o2fytr25ny.jpg" alt="A young man" />\n      <div class="text-center">\n        <i>A young man</i>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class="ce-block">\n  <div class="ce-block__content">\n    <div class="ce-paragraph cdx-block">\n      <p>This is the story of a young black man in the 80\'s who grew up in America. He had dreams to one day become the president of the country but it never happened. But i\'ll tell you what did happen.</p>\n    </div>\n  </div>\n</div>',
  status: 'draft',
  id: 'cff5712e-252e-4ca6-bef1-0f4de637dafa',
  authorId: '66d0d11b-5a54-4556-8e31-75f3a944bfab',
  coverImageUrl: null,
  summary: '<div class="ce-block',
  slug: 'great-men-cff5712e-252e-4ca6-bef1-0f4de637dafa',
  updatedAt: '2019-09-15T08:28:39.017Z',
  createdAt: '2019-09-15T08:28:39.017Z',
  followUpId: null,
  suspended: false,
  tags: []
};

export const articles = {
  createdArticle,
  error: null
};

export const createArticlePayload = {
  title: 'Great men',
  body: [{
    type: 'image',
    data: {
      file: { url: 'http://res.cloudinary.com/vali-1kbdeas/image/upload/v1568535998/1KBIdeas%20Articles/lr8xgykcn0o2fytr25ny.jpg' }, caption: 'A young man', withBorder: false, stretched: true, withBackground: false
    }
  }, { type: 'paragraph', data: { text: 'This is the story of a young black man in the 80\'s who grew up in America. He had dreams to one day become the president of the country but it never happened. But i\'ll tell you what did happen.' } }],
  status: 'published'
};
