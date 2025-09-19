// tests go here; this will not be compiled when this package is used as an extension.
const d = new UI.Display()

const vs = new UI.VerticalStack(new Vector2(80, 60))
    .setPositionMethod(UI.PositionMethod.CENTER)
    .setSpacing(5)

const plus = new UI.DepthStack(Vector2.zero)
    .setPositionMethod(UI.PositionMethod.CENTER)
new UI.Circle(Vector2.zero, 6)
    .setBorder(true)
    .setBorderWidth(1)
    .setBorderColor(game.Color.Black)
    .setColor(game.Color.Green)
    .setOnClick((position: Vector2) => {
        if (vs.children.length > 1) {
            vs.children.insertAt(1, new UI.Circle(Vector2.zero, 4, game.Color.Pink))
        } else {
            let minus = new UI.DepthStack(Vector2.zero)
                .setPositionMethod(UI.PositionMethod.CENTER)
            new UI.Circle(Vector2.zero, 6)
                .setBorder(true)
                .setBorderWidth(1)
                .setBorderColor(game.Color.Black)
                .setColor(game.Color.Red)
                .setOnClick((position: Vector2) => {
                    vs.children.removeAt(1)
                })
                .setParent(minus)
            new UI.ImageElement(Vector2.zero, assets.image`minus_icon`)
                .setParent(minus)
            vs.addChild(minus)
        }
    })
    .setParent(plus)
new UI.ImageElement(Vector2.zero, assets.image`plus_icon`)
    .setParent(plus)

const minus = new UI.DepthStack(Vector2.zero)
    .setPositionMethod(UI.PositionMethod.CENTER)
new UI.Circle(Vector2.zero, 6)
    .setBorder(true)
    .setBorderWidth(1)
    .setBorderColor(game.Color.Black)
    .setColor(game.Color.Red)
    .setOnClick((position: Vector2) => {
        vs.children.removeAt(1)
    })
    .setParent(minus)
new UI.ImageElement(Vector2.zero, assets.image`minus_icon`)
    .setParent(minus)

vs.addChild(plus).update()
vs.addChild(minus).update()
vs.setShape(
    new UI.RoundedBox(vs.position, vs.size, 10, game.Color.LightBlue)
        .setBorder(true)
        .setBorderColor(game.Color.Purple)
        .setBorderWidth(2)
)
// d.elements.push(vs)

const ds = new UI.DepthStack(new Vector2(80, 60))
    .setSpacing(2)

ds.setShape(
    new UI.RoundedBox(Vector2.zero, ds.size, 5, game.Color.Red)
)
new UI.TextElement(Vector2.zero, "Hi there,\nWorld!", game.Color.White)
    .setTextAlignMode(UI.TextAlignMode.Center)
    .setParent(ds)

d.elements.push(ds)

browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x: number, y: number) {
    d.clicked(new Vector2(x, y))
})

game.onUpdate(() => {
    d.clear()
    d.draw()
    d.show()
})