# QuadraticText
Library for drawing text to HTML5 canvas along a quadratic curve path. 

<a href="http://codepen.io/lemurx/full/NbYVPZ/">Demo 1</a><br>
<a href="http://codepen.io/lemurx/full/JbLzYw/">Demo 2</a>
<h3>Usage</h3>
<ol>
<li>Add quadratic-text.js to your project.</li>
<li>Add a canvas element to your page.
<code>
<canvas id="canvas-1" width="500" height="500"></canvas>
</code>
</li>
<li>
Create a QuadraticText instance.
<code>
let options: QuadraticTextOptions = {
    canvas: '#canvas-1',
    font: '30px Mountains of Christmas',
    textColor: 'gold',
    curveStart: new Point(50, 290),
    curveEnd: new Point(450, 290),
    control: new Point(250, 650),
    align: 'center',
    text: "Hello"
};

let qt1 = new QuadraticText(options);
</code>
</li>
</ol>

