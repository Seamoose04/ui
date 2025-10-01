/**
 * Provides an easy to use UI system
 */
//% color=190 weight=80 icon="\uf150" block="User Interface"
//% groups=["Shapes", "Containers", "Display", "Properties", "others"]
namespace UI {
    //% block = "create circle radius $radius color $color"
    //% blockSetVariable=circle
    export function CreateCircle(radius: number, color: game.Color): Circle {
        return new Circle(radius, color);
    }

    //% block = "create box width $width height $height color $color"
    //% blockSetVariable=box
    export function CreateBox(width: number, height: number, color: game.Color): Box {
        return new Box(new Vector2(width, height), color)
    }

    //% block = "create rounded box width $width height $height radius $radius color $color"
    //% inlineInputMode = inline
    //% blockSetVariable=rounded_box
    export function CreateRoundedBox(width: number, height: number, radius: number, color: game.Color): RoundedBox {
        return new RoundedBox(new Vector2(width, height), radius, color)
    }

    let display: Display = null

    //% block = "Initialize UI"
    export function InitializeUI() {
        display = new Display()
    }

    export enum StackKind {
        Depth,
        Horizontal,
        Vertical
    }

    //% block = "create %kind stack"
    //% blockSetVariable=stack
    export function CreateDepthStack(kind: StackKind): DepthStack | HorizontalStack | VerticalStack {
        switch (kind) {
            case StackKind.Depth: {
                return new DepthStack()
            }
            case StackKind.Horizontal: {
                return new HorizontalStack()
            }
            case StackKind.Vertical: {
                return new VerticalStack()
            }
        }
    }

    export function AddToContainer(element: Element, container: Container) {
        const contained = new ContainedElement(element)
        container.addChild(contained)
        // return contained
    }

    export function SetShape(shape: Clickable, container: Container) {
        container.setShape(shape)
    }

    export function AddToScreen(element: Element) {
        display.addElement(element)
    }

    export function CenterElement(element: Element) {
        element.setPosition(Display.center)
    }

    export function PositionElement(element: Element, x: number, y: number) {
        element.setPosition(new Vector2(x, y))
    }

    game.onUpdate(() => {
        if (display != null) {
            display.clear()
            display.draw()
            display.show()
        }
    })
}