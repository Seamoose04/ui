/**
 * Provides an easy to use UI system
 */
//% color=190 weight=100 icon="\uf5fd" block="User Interface"
namespace UI {
    //% block
    export function CreateCircle(radius: number): Circle {
        return new Circle(radius)
    }

    //% block
    export function CreateBox(width: number, height: number): Box {
        return new Box(new Vector2(width, height))
    }

    //% block
    export function CreateRoundedBox(width: number, height: number, radius: number): RoundedBox {
        return new RoundedBox(new Vector2(width, height), radius)
    }

    let display: Display = null

    //% block
    export function InitializeUI() {
        display = new Display()
    }

    //% block
    export function AddToScreen(element: Element) {
        display.addElement(element)
    }

    game.onUpdate(() => {
        if (display != null) {
            display.clear()
            display.draw()
            display.show()
        }
    })
}