///<reference path="../typings/index.d.ts" />


class Point {
  constructor(public x: number, public y: number) {
  }

  public distance(p: Point) {
    return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
  }
}

interface QuadraticTextOptions {
  canvas?: string;
  curveStart?: Point;
  curveEnd?: Point;
  control?: Point;
  text?: string;
  font?: string;
  textColor?: string;
  curveColor?: string;
  align?: string;
  spacing?: number;
}

class QuadraticText {
  private canvas;
  private context;
  private points: Array<Point>;

  private options: QuadraticTextOptions = {
    canvas: 'canvas',
    curveStart: new Point(20, 50),
    curveEnd: new Point(280, 50),
    control: new Point(150, 150),
    text: 'Hello Quadratic Text!',
    font: '24px Arial',
    textColor: 'black',
    curveColor: 'transparent',
    align: 'left',
    spacing: 1
  };

  constructor(options: QuadraticTextOptions) {
    $.extend(this.options, options);
    this.canvas = $(this.options.canvas);
    this.context = this.canvas.get(0).getContext("2d");
    this.drawCurve();
    this.drawText();
  }

  public setText(text: string) {
    this.options.text = text;
    this.redrawText();
  }

  public addText(text: string) {
    this.options.text = text;
    this.drawText();
  }


  private redrawText() {
    this.context.clearRect(0, 0, 500, 500);
    this.drawCurve();
    this.drawText();
  }


  private drawCurve() {
    this.context.beginPath();
    this.context.moveTo(this.options.curveStart.x, this.options.curveStart.y);
    this.context.quadraticCurveTo(this.options.control.x, this.options.control.y, this.options.curveEnd.x, this.options.curveEnd.y);
    this.context.strokeStyle = this.options.curveColor;
    this.context.fillStyle = this.options.textColor;
    this.context.textBaseline = 'bottom';
    this.context.stroke();
    this.points = [];
    for (let i = 0; i < 500; i++) {
      let point = this.getPoint(.002 * i);
      this.points.push(point);
    }
  }

  private getPoint(t: number) {
    let x = (1 - t) * (1 - t) * this.options.curveStart.x + 2 * (1 - t) * t * this.options.control.x + t * t * this.options.curveEnd.x;
    let y = (1 - t) * (1 - t) * this.options.curveStart.y + 2 * (1 - t) * t * this.options.control.y + t * t * this.options.curveEnd.y;
    return new Point(x, y);
  }

  private getNextPoint(point, charWidth) {
    let i = this.points.indexOf(point);
    while (i < this.points.length) {
      let distance = this.points[i].distance(point);
      if (distance >= charWidth) {
        return this.points[i - 1];
      }
      i++;
    }
    return null;
  }

  private alignCenter() {
    let curveLength = this.getCurveLength();
    let textLength = this.context.measureText(this.options.text).width + (this.options.text.length - 1) * this.options.spacing;
    let point = this.points[0];
    if (curveLength <= textLength)
      return point;
    point = this.getNextPoint(point, (curveLength - textLength) / 2);
    return point;
  }

  private drawText() {
    let textLen = this.options.text.length;
    this.context.font = this.options.font;
    let point = this.points[0];
    if (this.options.align == 'center')
      point = this.alignCenter();
    for (let i = 0; i < textLen; i++) {
      point = this.drawRotatedChar(this.options.text[i], point);
      if (point == null)
        return;
    }
  }

  private drawRotatedChar(char, point) {
    if (point) {
      let point1 = point;
      let point2 = this.getNextPoint(point, this.context.measureText(char).width + this.options.spacing);
      if (point2) {
        let alpha = -this.getAlpha(point1, point2);
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
  }

  private getAlpha(point1: Point, point2: Point) {
    if (point2 == null) {
      console.log('l:', point1)
    }
    let a = point1.y - point2.y;
    let b = point1.x - point2.x;
    let alpha = Math.asin(a / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
    return alpha;
  }

  //thx tunght13488, https://gist.github.com/tunght13488/6744e77c242cc7a94859 
  private getCurveLength() {
    let a = new Point(
      this.options.curveStart.x - 2 * this.options.control.x + this.options.curveEnd.x,
      this.options.curveStart.y - 2 * this.options.control.y + this.options.curveEnd.y
    );
    let b = new Point(
      2 * this.options.control.x - 2 * this.options.curveStart.x,
      2 * this.options.control.y - 2 * this.options.curveStart.y
    );
    let A = 4 * (a.x * a.x + a.y * a.y);
    let B = 4 * (a.x * b.x + a.y * b.y);
    let C = b.x * b.x + b.y * b.y;

    let Sabc = 2 * Math.sqrt(A + B + C);
    let A_2 = Math.sqrt(A);
    let A_32 = 2 * A * A_2;
    let C_2 = 2 * Math.sqrt(C);
    let BA = B / A_2;

    return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
  }


}
