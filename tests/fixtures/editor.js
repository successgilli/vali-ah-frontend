export const editorOutput = {
  time: 1550476186479,
  blocks: [
    {
      type: 'image',
      data: {
        caption: 'A young man',
        file: {
          url: 'http://res.cloudinary.com/vali-1kbdeas/image/upload/v1568535998/1KBIdeas%20Articles/lr8xgykcn0o2fytr25ny.jpg'
        },
        stretched: true,
        withBackground: false,
        withBorder: false
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'The example of text that was written in <b>one of popular</b> text editors.'
      }
    },
    {
      type: 'header',
      data: {
        text: 'With the header of course',
        level: 2
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'So what do we have?'
      }
    },
    {
      type: 'embed',
      data: {
        service: 'coub',
        source: 'https://coub.com/view/1czcdf',
        embed: 'https://coub.com/embed/1czcdf',
        width: 580,
        height: 320,
        caption: 'My Life'
      }
    }
  ],
  version: '2.8.1'
};

export const convertedBlock = `<div class="ce-block">
  <div class="ce-block__content">
    <div class="ce-paragraph cdx-block">
      <img src="http://res.cloudinary.com/vali-1kbdeas/image/upload/v1568535998/1KBIdeas%20Articles/lr8xgykcn0o2fytr25ny.jpg" alt="A young man" />
      <div class="text-center">
        <i>A young man</i>
      </div>
    </div>
  </div>
</div>

<div class="ce-block">
  <div class="ce-block__content">
    <div class="ce-paragraph cdx-block">
      <p>The example of text that was written in <b>one of popular</b> text editors.</p>
    </div>
  </div>
</div>

<div class="ce-block">
  <div class="ce-block__content">
    <div class="ce-paragraph cdx-block">
      <h2>With the header of course</h2>
    </div>
  </div>
</div>

<div class="ce-block">
  <div class="ce-block__content">
    <div class="ce-paragraph cdx-block">
      <p>So what do we have?</p>
    </div>
  </div>
</div>`;
