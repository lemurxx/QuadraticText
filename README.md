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
<em>default: 'canvas'</em>
<br>
The selector of the canvas element.
</li>
<li>
<h4>font</h4>
<em>default: '24px Arial'</em>
<br>
Font settings in the format <a href="http://www.w3schools.com/tags/canvas_font.asp" target="_blank">the canvas font property</a> can be set.  (i.e. 'italic small-caps bold 12px arial')
</li>
<li>
<h4>textColor</h4>
<em>default: 'black'</em>
<br>
The color of the text.
</li>
<li>
<h4>curveColor</h4>
<em>default: 'transparent'</em>
<br>
The color of the curve.
</li>
<li>
<h4>curveStart</h4>
<em>default: new Point(20, 50)</em>
<br>
The start point of the curve on the canvas. (note: the Point class is defined in the library)
</li>
<li>
<h4>curveEnd</h4>
<em>default: new Point(280, 50)</em>
<br>
The end point of the curve on the canvas. (note: the Point class is defined in the library.)
</li>
<li>
<h4>control</h4>
<em>default: new Point(150, 150)</em>
<br>
The control point of the curve on the canvas. (note: the Point class is defined in the library.)
</li>
<li>
<h4>align</h4>
<em>default: 'left'</em>
<br>
The alignment of the text. Either 'left' or 'center' (right alignment is not implemented).
</li>
</ol>
<h4>Methods</h4>
<ol>
<li>
<h5>setText(text)</h5>
Clears the canvas and draws the text passed on it.
</li>
<li>
<h5>addText(text)</h5>
Draws the text passed on the canvas without clearing it.
</li>
</ol>

