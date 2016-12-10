# QuadraticText
Library for drawing text to HTML5 canvas along a quadratic curve path. 

<a href="http://codepen.io/lemurx/full/NbYVPZ/" target="_blank">Demo 1</a><br>
<a href="http://codepen.io/lemurx/full/JbLzYw/" target="_blank">Demo 2</a>
<h3>Usage</h3>
<ol>
<li>Add quadratic-text.js to your project.</li>
<li>Add a canvas element to your page.<br>
<code>
&lt;canvas id="canvas-1" width="500" height="500"&gt;&lt;/canvas&gt;
</code>
</li>
<li>
Create a QuadraticText instance.<br>
<pre>
<code>
let options: QuadraticTextOptions = {
    canvas: '#canvas-1',
    font: '30px Verdana',
    textColor: 'gold',
    curveColor: 'transparent',
    curveStart: new Point(50, 290),
    curveEnd: new Point(450, 290),
    control: new Point(250, 650),
    align: 'center',
    text: "Hello"
};

let qt = new QuadraticText(options);
</code>
</pre>
</li>
</ol>
<h3>Options</h3>
<ol>
<li>
<h4>canvas</h4>
<em>Default: 'canvas'</em>
<br>
The selector of the canvas element.
</li>
</ol>

