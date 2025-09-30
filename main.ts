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