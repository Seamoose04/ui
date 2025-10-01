/**
 * Provides an easy to use UI system
 */
//% color=190 weight=80 icon="\uf150" block="User Interface"
//% groups=['Shapes', 'Containers', 'Display', 'Properties', 'others']
namespace UI {
    //% blockId = create_circle
    //% block = "create circle radius $radius color $color"
    //% blockSetVariable=circle
    export function CreateCircle(radius: number, color: game.Color): Circle {
        return new Circle(radius, color);
    }

    //% block
    export function CreateBox(width: number, height: number, color: game.Color): Box {
        return new Box(new Vector2(width, height), color)
    }

    //% block
    export function CreateRoundedBox(width: number, height: number, radius: number, color: game.Color): RoundedBox {
        return new RoundedBox(new Vector2(width, height), radius, color)
    }

    let display: Display = null

    //% block
    export function InitializeUI() {
        display = new Display()
    }

    //% block
    export function CreateDepthStack(): DepthStack {
        return new DepthStack()
    }
    
    //% block
    export function CreateVerticalStack(): VerticalStack {
        return new VerticalStack()
    }

    //% block
    export function CreateHorizontalStack(): HorizontalStack {
        return new HorizontalStack()
    }

    export type Container = DepthStack | VerticalStack | HorizontalStack
    export type Clickable = Circle | Box | RoundedBox
    export type Element = Clickable | Container

    //% block
    export function AddToContainer(element: Element, container: Container) {
        const contained = new ContainedElement(element)
        container.addChild(contained)
        // return contained
    }

    //% block
    export function SetShape(shape: Clickable, container: Container) {
        container.setShape(shape)
    }

    //% block
    export function AddToScreen(element: Element) {
        display.addElement(element)
    }

    //% block
    export function CenterElement(element: Element) {
        element.setPosition(Display.center)
    }

    //% block
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