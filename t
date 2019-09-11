<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div class="article-content">
    <h1>A Guide to Solving Web Development Problems</h1>

<p>This is mainly about how to solve technical problems that arise from using front or back end technologies to make web pages or web apps but some of these steps will be applicable to solving technical problems in general.</p>

<p>Half the technical problems in web development are caused by something trivial like forgetting a semi-colon somewhere and are usually easily solvable if you've had your coffee but for all the problems past this level, you'll probably need to do some structured thinking.</p>

<h2> The Web Development Troubleshooting Steps Summary</h2>

<p>1. Define the problem that you're trying to solve. If you're not asking exactly the right question then you're not going to get exactly the right answer.</p>

<p>2. Verify the problem exists. Make sure it's really a problem by replicating the error on more than one machine.</p>

<p>3. Gather additional information about the problem. Use a javascript debugger, fiddler or any other common tool to get additional clues about the nature of the problem.</p>

<p>4. Back-up your work before making even a single teeny tiny little change. Don't make things worse when trying to fix the problem. Keep a back-up so you can roll back if you have to.</p>

<p>5. Review your past experiences versus the present situation. Have you encountered a similar problem in the past, if so then test to see if your past approach will fix the problem at hand.</p>

<p>6. Search for people who've been in similar situations and how they solved the problem. You have all the information you need so start using a search engine to find possible solutions.</p>

<p>7. Make one change at a time (and then test it). Proceed methodically. If you make multiple changes at the same time then you often can't tell what worked or didn't work.</p>

<p>8. Break the silo if necessary. If you haven't solved the issue by this point then it's time to turn to your technical savvy friends or relevant message boards.</p>

<p>Here's a list of steps that outline a basic thought process you can go through to solve problems especially if you're relatively new to web development. The Troubleshooting Steps 1. Define the problem you're trying to solve.</p>

<p>If you're trying to answer a question then you must make sure you're asking the right question - not just asking a question that's sort of in the right ballpark but the exact question that needs to be asked.</p>

<p>Example: A form that submitted customer leads wasn't working. My first question was &quot;How come the forms aren't working&quot; - which was not defined enough to start solving the problem. So I sent a test copy of the form live and that copy worked so the question became &quot;how come the lead generating forms aren't working on the preview server&quot;. Just the slight change in the question completely changed how I tackled the problem.</p>

<p>I know most of the time people assume you can skip this step but seriously take a few minutes to see if you can better define the question and ultimately the problem itself. 2. Verify the problem exists</p>

<p>Things like rendering problems are very common in the web dev business and they can sometimes be caused by something temporal like a network issue or similar.</p>

<p>So one of the first things to do is to ask the person bringing up the problem is whether or not this has occurred on more than one computer.</p>

<p>If not then you'll need to verify it on another computer. If it proves impossible to replicate then you often don't have a real error and the problem will take care of itself.</p>


  </div>
</body>
<style>
  div::after {
    clear: both;
  }
</style>


<script>
  const inlineHighlight = () => {
    if(window.se)
    if (doc.selection && doc.selection.createRange) {
            // Clone the TextRange and collapse
            range = doc.selection.createRange().duplicate();
            range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            markerEl = doc.getElementById(markerId);
        } else if (win.getSelection) {
            sel = win.getSelection();
            const contentHighlighted = sel.getRangeAt(0).extractContents();
            console.log(sel.getRangeAt(0).cloneContents());
            const modifiedContent = `<span>${contentHighlighted}</span>`

            const cloneRange = sel.getRangeAt(0).cloneRange();
            cloneRange.collapse();

            const spanNode = doc.createElement('div');
            spanNode.appendChild(contentHighlighted)
            spanNode.style.cssText='background-color:red';

            cloneRange.insertNode(spanNode);

            // console.log(contentHighlighted);
            range = sel.getRangeAt(0).cloneRange();
            // console.log(range.insertNode(doc.createElement('i')));
            // console.log(range.startOffset, range.endOffset);
            const highlightedText = range.cloneContents();
            // console.log(range.cloneContents())
            range.collapse(false);


            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = doc.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( doc.createTextNode(markerTextChar) );
            // range.insertNode(markerEl);
        }
  }
  var markSelection = (function() {
    var markerTextChar = "\ufeff";
    var markerTextCharEntity = "&#xfeff;";

    var markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

    var selectionEl;

    return function(win) {
        win = win || window;
        var doc = win.document;
        var sel, range;
        // Branch for IE <= 8 
        if (doc.selection && doc.selection.createRange) {
            // Clone the TextRange and collapse
            range = doc.selection.createRange().duplicate();
            range.collapse(false);

            // Create the marker element containing a single invisible character by creating literal HTML and insert it
            range.pasteHTML('<span id="' + markerId + '" style="position: relative;">' + markerTextCharEntity + '</span>');
            markerEl = doc.getElementById(markerId);
        } else if (win.getSelection) {
            sel = win.getSelection();
            const contentHighlighted = sel.getRangeAt(0).extractContents();
            console.log(sel.getRangeAt(0).cloneContents());
            const modifiedContent = `<span>${contentHighlighted}</span>`

            const cloneRange = sel.getRangeAt(0).cloneRange();
            cloneRange.collapse();

            const spanNode = doc.createElement('div');
            spanNode.appendChild(contentHighlighted)
            spanNode.style.cssText='background-color:red';

            cloneRange.insertNode(spanNode);

            // console.log(contentHighlighted);
            range = sel.getRangeAt(0).cloneRange();
            // console.log(range.insertNode(doc.createElement('i')));
            // console.log(range.startOffset, range.endOffset);
            const highlightedText = range.cloneContents();
            // console.log(range.cloneContents())
            range.collapse(false);


            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = doc.createElement("span");
            markerEl.id = markerId;
            markerEl.appendChild( doc.createTextNode(markerTextChar) );
            // range.insertNode(markerEl);
        }
        // console.log(range.insertNode(doc.createElement('span')));
        // range.innerHTML = "highlighted";

        if (markerEl) {
            // Lazily create element to be placed next to the selection
            if (!selectionEl) {
                selectionEl = doc.createElement("div");
                selectionEl.style.border = "solid darkblue 1px";
                selectionEl.style.backgroundColor = "lightgoldenrodyellow";
                selectionEl.innerHTML = "&lt;- selection";
                selectionEl.style.position = "absolute";

                // doc.body.appendChild(selectionEl);
            }

            // Find markerEl position http://www.quirksmode.org/js/findpos.html
        var obj = markerEl;
        var left = 0, top = 0;
        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);

            // Move the button into place.
            // Substitute your jQuery stuff in here
            selectionEl.style.left = left + "px";
            selectionEl.style.top = top + "px";

            // markerEl.parentNode.removeChild(markerEl);
        }
    };
})();

  const getHighlightPosition = (element) => {
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect(),
    offset   = elemRect.top - bodyRect.top;

    onsole.log('Element is ' + offset + ' vertical pixels from <body>');

    var rect = element.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
  }
var t = '';
function gText(e) {
  console.log(e)
   t = (document.all) ? document.selection.createRange().text : document.getSelection();
  //  console.log(t);
  //  console.log(e.index);
  //  console.log(window.getSelection());
   markSelection()


}
document.onmouseup = gText;
if (!document.all) document.captureEvents(Event.MOUSEUP);


</script>
</html>