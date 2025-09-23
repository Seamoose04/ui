// tests go here; this will not be compiled when this package is used as an extension.
const d = new UI.Display()

// --------------------------------

// const vs = new UI.VerticalStack(UI.Display.center)
//     .setPositionMethod(UI.PositionMethod.CENTER)
//     .setSpacing(5)

// const plus = new UI.DepthStack(Vector2.zero)
//     .setPositionMethod(UI.PositionMethod.CENTER)
// new UI.Circle(Vector2.zero, 6)
//     .setBorder(true)
//     .setBorderWidth(1)
//     .setBorderColor(game.Color.Black)
//     .setColor(game.Color.Green)
//     .setOnClick((position: Vector2) => {
//         if (vs.children.length > 1) {
//             vs.children.insertAt(1, new UI.Circle(Vector2.zero, 4, game.Color.Pink))
//         } else {
//             let minus = new UI.DepthStack(Vector2.zero)
//                 .setPositionMethod(UI.PositionMethod.CENTER)
//             new UI.Circle(Vector2.zero, 6)
//                 .setBorder(true)
//                 .setBorderWidth(1)
//                 .setBorderColor(game.Color.Black)
//                 .setColor(game.Color.Red)
//                 .setOnClick((position: Vector2) => {
//                     vs.children.removeAt(1)
//                 })
//                 .setParent(minus)
//             new UI.ImageElement(Vector2.zero, assets.image`minus_icon`)
//                 .setParent(minus)
//             vs.addChild(minus)
//         }
//     })
//     .setParent(plus)
// new UI.ImageElement(Vector2.zero, assets.image`plus_icon`)
//     .setParent(plus)

// const minus = new UI.DepthStack(Vector2.zero)
//     .setPositionMethod(UI.PositionMethod.CENTER)
// new UI.Circle(Vector2.zero, 6)
//     .setBorder(true)
//     .setBorderWidth(1)
//     .setBorderColor(game.Color.Black)
//     .setColor(game.Color.Red)
//     .setOnClick((position: Vector2) => {
//         vs.children.removeAt(1)
//     })
//     .setParent(minus)
// new UI.ImageElement(Vector2.zero, assets.image`minus_icon`)
//     .setParent(minus)

// vs.addChild(plus).update()
// vs.addChild(minus).update()
// vs.setShape(
//     new UI.RoundedBox(vs.position, vs.size, 10, game.Color.LightBlue)
//         .setBorder(true)
//         .setBorderColor(game.Color.Purple)
//         .setBorderWidth(2)
// )
// d.elements.push(vs)

// --------------------------------

// const ds = new UI.DepthStack(new Vector2(80, 60))
//     .setSpacing(2)

// ds.setShape(
//     new UI.RoundedBox(Vector2.zero, ds.size, 5, game.Color.Red)
// )
// new UI.TextElement(Vector2.zero, "Hi there,\nWorld!", game.Color.White)
//     .setTextAlignMode(UI.TextAlignMode.Center)
//     .setTextSize(UI.FontSize.Medium)
//     .setParent(ds)

// d.elements.push(ds)

// --------------------------------

// const shapeHolder = new UI.DepthStack(UI.Display.center)
//     .setSpacing(2)
//     .setShape(
//         new UI.RoundedBox(Vector2.zero, Vector2.zero, 15, game.Color.Yellow)
//             .setBorderColor(game.Color.Green)
//             .setBorderWidth(2)
//     )

// const row1 = new UI.HorizontalStack(Vector2.zero)
//     .setSpacing(3)
//     .setAlignmentMethod(UI.AlignmentMethodV.BOTTOM)
//     .addChild(new UI.Circle(Vector2.zero, 15))
//     .addChild(new UI.Circle(Vector2.zero, 10))
//     .addChild(new UI.Circle(Vector2.zero, 20))

// const row2 = new UI.HorizontalStack(Vector2.zero)
//     .setSpacing(3)
//     .setAlignmentMethod(UI.AlignmentMethodV.TOP)
//     .addChild(new UI.Circle(Vector2.zero, 5))
//     .addChild(new UI.Circle(Vector2.zero, 10))
//     .addChild(new UI.Circle(Vector2.zero, 20))

// const shapes = new UI.VerticalStack(Vector2.zero, [row1, row2])
//     .setSpacing(5)
//     .setAlignmentMethod(UI.AlignmentMethodH.CENTER)

// shapeHolder.addChild(shapes)

// d.addElement(shapeHolder)

// const shop = new UI.DepthStack(new Vector2(80, 60))
//     .setSpacing(2)
//     .setShape(
//         new UI.RoundedBox(Vector2.zero, Vector2.zero, 8, game.Color.Teal)
//             .setBorderColor(game.Color.LightBlue)
//             .setBorderWidth(2)
//     )

// shop.addChild(
//     new UI.VerticalStack(Vector2.zero)
//         .setSpacing(3)
//         .addChild(
//             new UI.DepthStack(Vector2.zero)
//                 .setSpacing(1)
//                 .addChild(
//                     new UI.HorizontalStack(Vector2.zero)
//                         .setSpacing(3)
//                         .addChild(
//                             new UI.TextElement(
//                                 Vector2.zero,
//                                 "Ninja Star: "
//                             )
//                                 .setTextAlignMode(UI.TextAlignMode.Center)
//                         )
//                         .addChild(
//                             new UI.ImageElement(Vector2.zero, assets.image`star`)
//                         )
//                 )
//                 .setShape(
//                     new UI.RoundedBox(Vector2.zero, Vector2.zero, 5, game.Color.LightBlue)
//                 )
//         )
//         .addChild(
//             new UI.TextElement(
//                 Vector2.zero,
//                 "  This ninja star belonged to the ancient senseis... Who used their power to defeat the evil guys, or something...",
//             )
//                 .setWidth(100)
//                 .setTextSize(UI.FontSize.Small)
//         )
// )

// d.addElement(shop)

// --------------------------------

// const container = new UI.VerticalStack(UI.Display.center)

// const starContainer = new UI.DepthStack(Vector2.zero)
// const circle = new UI.Circle(Vector2.zero, 10, game.Color.Tan)
//     .setBorderColor(game.Color.Green)
// const star = new UI.ImageElement(Vector2.zero, assets.image`star`)
// const t = new UI.TextElement(Vector2.zero, "Hello, this is a star. Here for an adventure!", game.Color.Purple)
//     .setWidth(120)
// starContainer.addChild(star)
// starContainer.setShape(circle)

// container.addChild(starContainer)
// container.addChild(t)
// container.setShape(
//     new UI.Box(Vector2.zero, Vector2.zero, game.Color.LightBlue)
// )
// container.setSpacing(5)

// d.addElement(container)

// --------------------------------

const shopContainer = new UI.VerticalStack(
    UI.Display.center
).setShape(
    new UI.RoundedBox(
        Vector2.zero,
        Vector2.zero,
        10, game.Color.LightBlue
    ).setBorderColor(
        game.Color.Blue
    ).setBorderWidth(
        2
    )
)

interface upgrade {
    name: string,
    icon: Image,
    description: string,
    price: number
}

const upgrades: upgrade[] = [
    {
        name: "Clicker",
        icon: assets.image`IconClicker`,
        description: "makes a click worth more",
        price: 10
    },
    {
        name: "Grandma",
        icon: assets.image`IconGrandma`,
        description: "produces 0.1 cookies/s",
        price: 5
    },
    {
        name: "Bakery",
        icon: assets.image`IconBakery`,
        description: "produces 1 cookie/s",
        price: 20
    }
]

for (let up of upgrades) {
    shopContainer.addChild(
        new UI.HorizontalStack(
            Vector2.zero
        ).setShape(
            new UI.RoundedBox(
                Vector2.zero,
                Vector2.zero,
                5    
            )
        ).setSpacing(
            2
        ).addChild(
            new UI.VerticalStack(
                Vector2.zero
            ).addChild(
                new UI.TextElement(
                    Vector2.zero,
                    up.name
                )
            ).addChild(
                new UI.TextElement(
                    Vector2.zero,
                    up.description
                ).setTextSize(
                    UI.FontSize.Small
                ).setWidth(
                    80
                )
            )
        ).addChild(
            new UI.VerticalStack(
                Vector2.zero
            )
            .setSpacing(
                2
            ).setShape(
                new UI.Box(
                    Vector2.zero,
                    Vector2.zero,
                    game.Color.Brown
                )
            ).addChild(
                new UI.DepthStack(
                    Vector2.zero
                ).addChild(
                    new UI.ImageElement(
                        Vector2.zero,
                        up.icon
                    )
                ).setShape(
                    new UI.RoundedBox(
                        Vector2.zero,
                        Vector2.zero,
                        5
                    ).setColor(
                        game.Color.White
                    ).setBorderColor(
                        game.Color.Tan
                    )
                ).setSpacing(
                    2
                )
            ).addChild(
                new UI.TextElement(
                    Vector2.zero,
                    "$".concat(up.price.toString())
                )
            )
        )
    )
}

d.addElement(shopContainer)

browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x: number, y: number) {
    d.clicked(new Vector2(x, y))
})

game.onUpdate(() => {
    d.clear()
    d.draw()
    d.show()
})