/**
 * Provides an easy to use UI system
 */
//% color=190 weight=80 icon="\uf150" block="User Interface"
//% groups=["Shapes", "Containers", "Display", "Properties", "others"]
namespace UI {
    //% blockId=ui_create_circle block="create circle radius $radius color $color"
    //% blockSetVariable=circle
    //% group=Shapes
    //% weight=30
    export function CreateCircle(radius: number, color: game.Color): Circle {
        return new Circle(radius, color);
    }

    //% blockId=ui_create_box block="create box width $width height $height color $color"
    //% blockSetVariable=box
    //% group=Shapes
    //% weight=20
    export function CreateBox(width: number, height: number, color: game.Color): Box {
        return new Box(new Vector2(width, height), color)
    }

    //% blockId=ui_create_rounded_box block="create rounded box width $width height $height radius $radius color $color"
    //% inlineInputMode = inline
    //% blockSetVariable=rounded_box
    //% group=Shapes
    //% weight=10
    export function CreateRoundedBox(width: number, height: number, radius: number, color: game.Color): RoundedBox {
        return new RoundedBox(new Vector2(width, height), radius, color)
    }

    export enum StackKind {
        Depth,
        Horizontal,
        Vertical
    }

    //% blockId=ui_create_stack block="create %kind stack"
    //% blockSetVariable=stack
    //% group=Containers
    //% weight=50
    export function CreateStack(kind: StackKind): DepthStack | HorizontalStack | VerticalStack {
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

    //% blockId=ui_add_to_container block="add $element to $container"
    //% element.shadow=variables_get
    //% element.defl=element
    //% container.shadow=variables_get
    //% container.defl=container
    //% group=Containers
    //% weight=20
    export function AddToContainer(element: Element, container: Container) {
        container.addChild(new ContainedElement(element))
    }

    //% blockId=ui_set_shape block="$container set shape to $shape"
    //% shape.shadow=variables_get
    //% shape.defl=shape
    //% container.shadow=variables_get
    //% container.defl=container
    //% group=Containers
    //% weight=10
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

    let display: Display = null

    //% blockId=ui_initialize block="initialize ui"
    //% group=Display
    //% weight=100
    export function Initialize() {
        display = new Display()
    }

    game.onUpdate(() => {
        if (display != null) {
            display.clear()
            display.draw()
            display.show()
        }
    })
}