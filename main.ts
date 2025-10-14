/**
 * Provides an easy to use UI system
 */
//% color=190 weight=80 icon="\uf150" block="User Interface"
//% groups=["Shapes", "Containers", "Contained Elements", "Display", "Properties", "others"]
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
    //% inlineInputMode=inline
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
    //% weight=100
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
    //% blockSetVariable=contained
    //% element.shadow=variables_get
    //% element.defl=element
    //% container.shadow=variables_get
    //% container.defl=container
    //% group="Contained Elements"
    //% weight=100
    export function AddToContainer(element: Element, container: Container): ContainedElement {
        const contained = new ContainedElement(element)
        container.addChild(contained)
        return contained
    }

    //% blockId=ui_set_shape block="$container set shape to $shape"
    //% shape.shadow=variables_get
    //% shape.defl=shape
    //% container.shadow=variables_get
    //% container.defl=container
    //% group=Containers
    //% weight=50
    export function SetShape(shape: Clickable, container: Container) {
        container.setShape(shape)
    }

    //% blockId=ui_add_to_screen block="add $element to the screen"
    //% element.shadow=variables_get
    //% element.defl=element
    //% group=Display
    //% weight=90
    export function AddToScreen(element: Element) {
        display.addElement(element)
    }

    //% blockId=ui_center_element block="center $element"
    //% element.shadow=variables_get
    //% element.defl=element
    //% group=Properties
    //% weight=95
    export function CenterElement(element: Element) {
        element.setPosition(Display.center)
    }

    //% blockId=ui_position_element block="position $element at x $x y $y"
    //% element.shadow=variables_get
    //% element.defl=element
    //% group=Properties
    //% weight=90
    export function PositionElement(element: Element, x: number, y: number) {
        element.setPosition(new Vector2(x, y))
    }

    //% blockId=ui_set_border block="set $element border $on"
    //% element.shadow=variables_get
    //% element.defl=element
    //% on.shadow=toggleOnOff
    //% on.defl=true
    //% group=Properties
    //% weight=85
    export function SetBorder<T extends Border>(element: T, on: boolean) {
        element.setBorder(on)
    }

    //% blockId=ui_set_border_thickness block="set $element border thickness $thickness"
    //% element.shadow=variables_get
    //% element.defl=element
    //% thickness.defl=1
    //% group=Properties
    //% weight=84
    export function SetBorderThickness<T extends Border>(element: T, thickness: number) {
        element.setBorderWidth(thickness)
    }

    //% blockId=ui_set_border_color block="set $element border $color"
    //% element.shadow=variables_get
    //% element.defl=element
    //% group="Properties"
    //% weight=83
    export function SetBorderColor<T extends Border>(element: T, color: game.Color) {
        element.setBorderColor(color)
    }

    //% blockId=ui_set_all_padding block="set $element all padding $padding"
    //% element.shadow=variables_get
    //% element.defl=contained
    //% padding.defl=2
    //% group="Contained Elements"
    //% weight=90
    export function SetAllPadding(element: ContainedElement, padding: number) {
        element.setPadding(padding)
    }

    //% blockId=ui_set_h_padding block="set $element horizontal padding $padding"
    //% element.shadow=variables_get
    //% element.defl=contained
    //% padding.defl=2
    //% group="Contained Elements"
    //% weight=89
    export function SetHPadding(element: ContainedElement, padding: number) {
        element.setPadH(padding)
    }

    //% blockId=ui_set_v_padding block="set $element vertical padding $padding"
    //% element.shadow=variables_get
    //% element.defl=contained
    //% padding.defl=2
    //% group="Contained Elements"
    //% weight=88
    export function SetVPadding(element: ContainedElement, padding: number) {
        element.setPadV(padding)
    }

    //% blockId=ui_set_padding block="set $element padding top $top bottom $bottom left $left right $right"
    //% inlineInputMode=inline
    //% element.shadow=variables_get
    //% element.defl=contained
    //% top.defl=2
    //% bottom.defl=2
    //% left.defl=2
    //% right.defl=2
    //% group="Contained Elements"
    //% weight=87
    export function SetPadding(element: ContainedElement, top: number, bottom: number, left: number, right: number) {
        element.setPadTop(top)
        element.setPadBottom(bottom)
        element.setPadLeft(left)
        element.setPadRight(right)
    }

    //% blockId=ui_set_v_align block="set $element alignment horizontal $horizontal vertical $vertical"
    //% element.shadow=variables_get
    //% element.defl=contained
    //% group="Contained Elements"
    //% weight=80
    export function SetAlignment(element: ContainedElement, horizontal: AlignmentMethodH, vertical: AlignmentMethodV) {
        element.setAlignH(horizontal)
        element.setAlignV(vertical)
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