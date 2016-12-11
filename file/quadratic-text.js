///<reference path="../typings/index.d.ts" />
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (p) {
        return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
    };
    return Point;
}());
var QuadraticText = (function () {
    function QuadraticText(options) {
        this.options = {
            canvas: 'canvas',
            curveStart: new Point(20, 50),
            curveEnd: new Point(280, 50),
            control: new Point(150, 150),
            text: 'Hello Quadratic Text!',
            font: '24px Arial',
            textColor: 'black',
            curveColor: 'transparent',
            align: 'left'
        };
        $.extend(this.options, options);
        this.canvas = $(this.options.canvas);
        this.context = this.canvas.get(0).getContext("2d");
        this.drawCurve();
        this.drawText();
    }
    QuadraticText.prototype.setText = function (text) {
        this.options.text = text;
        this.redrawText();
    };
    QuadraticText.prototype.addText = function (text) {
        this.options.text = text;
        this.drawText();
    };
    QuadraticText.prototype.redrawText = function () {
        this.context.clearRect(0, 0, 500, 500);
        this.drawCurve();
        this.drawText();
    };
    QuadraticText.prototype.drawCurve = function () {
        this.context.beginPath();
        this.context.moveTo(this.options.curveStart.x, this.options.curveStart.y);
        this.context.quadraticCurveTo(this.options.control.x, this.options.control.y, this.options.curveEnd.x, this.options.curveEnd.y);
        this.context.strokeStyle = this.options.curveColor;
        this.context.fillStyle = this.options.textColor;
        this.context.font = this.options.font;
        this.context.textBaseline = 'bottom';
        this.context.stroke();
        this.points = [];
        for (var i = 0; i < 500; i++) {
            var point = this.getPoint(.002 * i);
            this.points.push(point);
        }
    };
    QuadraticText.prototype.getPoint = function (t) {
        var x = (1 - t) * (1 - t) * this.options.curveStart.x + 2 * (1 - t) * t * this.options.control.x + t * t * this.options.curveEnd.x;
        var y = (1 - t) * (1 - t) * this.options.curveStart.y + 2 * (1 - t) * t * this.options.control.y + t * t * this.options.curveEnd.y;
        return new Point(x, y);
    };
    QuadraticText.prototype.getNextPoint = function (point, charWidth) {
        var i = this.points.indexOf(point);
        while (i < this.points.length) {
            var distance = this.points[i].distance(point);
            if (distance >= charWidth) {
                return this.points[i - 1];
            }
            i++;
        }
        return null;
    };
    QuadraticText.prototype.alignCenter = function () {
        var curveLength = this.getCurveLength();
        var textLength = this.context.measureText(this.options.text).width;
        var point = this.points[0];
        if (curveLength <= textLength)
            return point;
        point = this.getNextPoint(point, (curveLength - textLength) / 2);
        return point;
    };
    QuadraticText.prototype.drawText = function () {
        var textLen = this.options.text.length;
        var point = this.points[0];
        if (this.options.align == 'center')
            point = this.alignCenter();
        for (var i = 0; i < textLen; i++) {
            point = this.drawRotatedChar(this.options.text[i], point);
            if (point == null)
                return;
        }
    };
    QuadraticText.prototype.drawRotatedChar = function (char, point) {
        if (point) {
            var point1 = point;
            var point2 = this.getNextPoint(point, this.context.measureText(char).width);
            if (point2) {
                var alpha = -this.getAlpha(point1, point2);
                if (point1.x > point2.x) {
                    alpha = Math.PI - alpha;
                }
                this.context.save();
                this.context.translate(point1.x, point1.y);
                this.context.rotate(alpha);
                this.context.fillText(char, 0, 0);
                this.context.restore();
                return point2;
            }
        }
        return null;
    };
    QuadraticText.prototype.getAlpha = function (point1, point2) {
        if (point2 == null) {
            console.log('l:', point1);
        }
        var a = point1.y - point2.y;
        var b = point1.x - point2.x;
        var alpha = Math.asin(a / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
        return alpha;
    };
    //thx tunght13488, https://gist.github.com/tunght13488/6744e77c242cc7a94859 
    QuadraticText.prototype.getCurveLength = function () {
        var a = new Point(this.options.curveStart.x - 2 * this.options.control.x + this.options.curveEnd.x, this.options.curveStart.y - 2 * this.options.control.y + this.options.curveEnd.y);
        var b = new Point(2 * this.options.control.x - 2 * this.options.curveStart.x, 2 * this.options.control.y - 2 * this.options.curveStart.y);
        var A = 4 * (a.x * a.x + a.y * a.y);
        var B = 4 * (a.x * b.x + a.y * b.y);
        var C = b.x * b.x + b.y * b.y;
        var Sabc = 2 * Math.sqrt(A + B + C);
        var A_2 = Math.sqrt(A);
        var A_32 = 2 * A * A_2;
        var C_2 = 2 * Math.sqrt(C);
        var BA = B / A_2;
        return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
    };
    return QuadraticText;
}());

//# sourceMappingURL=quadratic-text.js.map
