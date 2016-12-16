
let options: QuadraticTextOptions = {
    canvas: '#canvas-1',
    font: '45px Amatic SC',
    textColor: 'red',
    curveColor: 'white',
    curveStart: new Point(50, 490),
    curveEnd: new Point(450, 490),
    control: new Point(430, 50)
};

let options2: QuadraticTextOptions = {
    canvas: '#canvas-2',
    font: '30px Mountains of Christmas',
    textColor: 'gold',
    curveStart: new Point(50, 290),
    curveEnd: new Point(450, 290),
    control: new Point(250, 650),
    align: 'center',
    text: "Hello",
    spacing: 3
};

let qt1 = new QuadraticText(options);
let qt2 = new QuadraticText(options2);

$(document).on('input', 'input#curvedText', function () {
    qt1.setText($(this).val());
    qt2.setText($(this).val())
});
$('input#curvedText').val('Lórum ipse ébrető, a dörtestély végtelen');
setTimeout(function () {
    $('input#curvedText').trigger('input');
}, 500);