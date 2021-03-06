# QuadraticText
Library for drawing text to HTML5 canvas along a quadratic curve path. 
<br><br>
<img src="doc/quadratic-text.png">

<a href="http://codepen.io/lemurx/full/NbYVPZ/" target="_blank">Demo 1</a><br>
<a href="http://codepen.io/lemurx/full/JbLzYw/" target="_blank">Demo 2</a>
<h3>Usage</h3>
<ol>
<li>Add jquery and quadratic-text.js to your page.
<br><br>
<pre>
<code>&lt;script src="jquery.js"&gt;&lt;/script&gt;
&lt;script src="quadratic-text.js"&gt;&lt;/script&gt;</code>
</pre>
</li>
<li>Create a canvas element..<br>
<br>
<pre>
<code>&lt;canvas id="canvas-1" width="500" height="500"&gt;&lt;/canvas&gt;</code>
</pre>
</li>
<li>
Create a QuadraticText instance.<br><br>
<pre>
<code>let options: QuadraticTextOptions = {
    canvas: '#canvas-1',
    font: '30px Verdana',
    textColor: 'gold',
    curveColor: 'transparent',
    curveStart: new Point(50, 290),
    curveEnd: new Point(450, 290),
    control: new Point(250, 650),
    align: 'center',
    spacing: 2,
    text: "Hello"
};

let qt = new QuadraticText(options);</code>
</pre>
</li>
</ol>
<h3>Dependencies</h3>
JQuery
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
Font settings in the format of <a href="http://www.w3schools.com/tags/canvas_font.asp" target="_blank">the canvas font property</a>. (i.e. 'italic small-caps bold 12px arial')<br>
<br>
<em>
Note: Drawing the text on the canvas may happen before the font is completely loaded (depending on font loading time). In these cases creating the QuadraticText instance or calling the setText method has to be delayed for a few milliseconds.
</em>
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
The start point of the curve on the canvas. <br><br>
<em>
Note: the Point class is defined in the library.
</em>
</li>
<li>
<h4>curveEnd</h4>
<em>default: new Point(280, 50)</em>
<br>
The end point of the curve on the canvas.  <br><br>
<em>
Note: the Point class is defined in the library.
</em>
</li>
<li>
<h4>control</h4>
<em>default: new Point(150, 150)</em>
<br>
The control point of the curve on the canvas.  <br><br>
<em>
Note: the Point class is defined in the library.
</em>
<br>
<br>
<img src="doc/quadratic.png">
</li>
<li>
<h4>align</h4>
<em>default: 'left'</em>
<br>
The alignment of the text. Either 'left' or 'center' (right alignment is not implemented).
</li>
<li>
<h4>spacing</h4>
<em>default: '1'</em>
<br>
The spacing between characters in pixels.
</li>
</ol>
<h3>Methods</h3>
<ol>
<li>
<h4>setText(text)</h4>
Clears the canvas and draws the text passed to the method on it.
<br><br>
<pre>
<code>let qt = new QuadraticText(options);
qt.setText ("hello");</code></pre>
</li>
<li>
<h4>addText(text)</h4>
Draws the text passed to the method on the canvas without clearing the canvas.
<br><br>
<pre>
<code>let qt = new QuadraticText(options);
qt.addText("Hello");</code></pre>
</li>
</ol>

