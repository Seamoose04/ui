namespace UI {
    export enum AlignmentMethodH {
        CENTER,
        LEFT,
        RIGHT,
    }

    export enum AlignmentMethodV {
        CENTER,
        TOP,
        BOTTOM
    }

    export class Display {
        ctx: Image
        elements: Element[]
        constructor() {
            this.ctx = image.create(screen.width, screen.height)
            this.elements = []
        }
        static get center(): Vector2 {
            return new Vector2(scene.screenWidth() / 2, scene.screenHeight() / 2)
        }
        clear() {
            this.ctx.fill(game.Color.Black)
        }
        draw() {
            for (let element of this.elements) {
                element.draw(this.ctx)
            }
        }
        show() {
            scene.setBackgroundImage(this.ctx)
        }
        clicked(position: Vector2) {
            for (let element of this.elements) {
                this.clickedOn(element, position)
            }
        }
        addElement(element: Element) {
            this.elements.push(element)
        }
        private clickedOn(element: Element, position: Vector2) {
            if (element instanceof Container) {
                let container = element as Container
                for (let child of container.children) {
                    this.clickedOn(child.element, position)
                }
            }
            if (element instanceof Clickable) {
                let clickable = element as Clickable
                if (clickable.clickable && clickable.pointInside(position)) {
                    clickable.onClick(position)
                }
            }
        }
    }

    interface Border {
        border: boolean
        setBorder(on: boolean): Element
        borderColor: color
        setBorderColor(color: color): Element
        borderWidth: number
        setBorderWidth(width: number): Element
    }

    interface Position {
        position: Vector2
        setPosition(position: Vector2): Element
        size: Vector2
        setSize(size: Vector2): Element
    }

    interface Color {
        color: color
        setColor(color: color): Element
    }

    interface Click {
        clickable: boolean
        pointInside(position: Vector2): boolean
        onClick: (position: Vector2) => void
        setOnClick(onClick: (position: Vector2) => void): Element
    }

    class Element implements Position {
        parent: Container
        position: Vector2
        size: Vector2
        constructor(size: Vector2) {
            this.parent = null
            this.position = Vector2.zero
            this.size = size
        }

        draw(ctx: Image): void { }

        setPosition(position: Vector2): Element {
            this.position = position
            return this
        }

        setSize(size: Vector2): Element {
            this.size = size
            return this
        }
    }

    class Clickable extends Element implements Click {
        clickable: boolean
        onClick: (position: Vector2) => void

        constructor(size: Vector2) {
            super(size)
            this.clickable = false
        }

        pointInside(position: Vector2): boolean {
            return false
        }

        setOnClick(onClick: (position: Vector2) => void): Clickable {
            this.onClick = onClick
            this.clickable = true
            return this
        }
    }

    export enum FontSize {
        Small,
        Medium,
        Large
    }
    export enum TextAlignMode {
        Left,
        Center,
        Right
    }
    export class TextElement extends Element {
        text: string
        color: color
        fontSize: FontSize
        textAlign: TextAlignMode
        wrap: boolean
        
        constructor(text: string, color?: color) {
            super(Vector2.zero)
            this.color = color ? color : game.Color.Black
            this.fontSize = FontSize.Medium
            this.textAlign = TextAlignMode.Left
            this.setText(text)
            this.setSize(Vector2.multiply(TextElement.textGridSize(this.text), TextElement.sizeOfChar(this.fontSize)))
        }

        private get font(): image.Font {
            switch (this.fontSize) {
                case FontSize.Small: {
                    return image.font5
                    break
                }
                case FontSize.Medium: {
                    return image.font8
                    break
                }
                case FontSize.Large: {
                    return image.font12
                    break
                }
            }
        }

        private static textGridSize(text: string): Vector2 {
            let rows = text.split("\n")
            let maxRow = rows.reduce((max: number, current: string) => {
                return Math.max(max, current.length)
            }, 0)
            return new Vector2(maxRow, rows.length)
        }

        private static sizeOfChar(fontSize: FontSize): Vector2 {
            let gridSize = Vector2.zero
            switch (fontSize) {
                case FontSize.Small: {
                    gridSize.x = 6
                    gridSize.y = 6
                    break
                }
                case FontSize.Medium: {
                    gridSize.x = 6
                    gridSize.y = 8
                    break
                }
                case FontSize.Large: {
                    gridSize.x = 12
                    gridSize.y = 14
                    break
                }
            }
            return gridSize
        }

        draw(ctx: Image): void {
            const textGridSize = TextElement.textGridSize(this.text)

            let offset = Vector2.add(this.position, Vector2.scale(this.size, -1/2))

            const sizeOfChar = TextElement.sizeOfChar(this.fontSize)
            const splitText = this.text.split("\n")

            switch (this.textAlign) {
                case TextAlignMode.Left: {
                    for (let row = 0; row < textGridSize.y; row++) {
                        const pos = Vector2.add(offset, new Vector2(0, row * sizeOfChar.y))
                        ctx.print(splitText[row], pos.x, pos.y, this.color, this.font)
                    }
                    break
                }
                case TextAlignMode.Center: {
                    let width = textGridSize.x * sizeOfChar.x
                    for (let row = 0; row < textGridSize.y; row++) {
                        const rowWidth = splitText[row].length * sizeOfChar.x
                        const pos = Vector2.add(offset, new Vector2((width-rowWidth) / 2, row * sizeOfChar.y))
                        ctx.print(splitText[row], pos.x, pos.y, this.color, this.font)
                    }
                    break
                }
                case TextAlignMode.Right: {
                    let width = textGridSize.x * sizeOfChar.x
                    for (let row = 0; row < textGridSize.y; row++) {
                        const rowWidth = splitText[row].length * sizeOfChar.x
                        const pos = Vector2.add(offset, new Vector2(width - rowWidth, row * sizeOfChar.y))
                        ctx.print(splitText[row], pos.x, pos.y, this.color, this.font)
                    }
                    break
                }
            }
        }

        setText(text: string): TextElement {
            this.text = text
            this.setSize(Vector2.multiply(TextElement.textGridSize(this.text), TextElement.sizeOfChar(this.fontSize)))
            return this
        }

        setTextSize(size: FontSize): TextElement {
            this.fontSize = size
            this.setSize(Vector2.multiply(TextElement.textGridSize(this.text), TextElement.sizeOfChar(this.fontSize)))
            return this
        }

        setTextAlignMode(mode: TextAlignMode): TextElement {
            this.textAlign = mode
            return this
        }

        setWidth(width: number): TextElement {
            let lines: string[] = []
            let lastLine = this.text.split(" ").reduce((currentLine, word) => {
                if (currentLine.concat(word).length * TextElement.sizeOfChar(this.fontSize).x <= width) {
                    return currentLine.concat(`${word} `)
                } else {
                    lines.push(currentLine)
                    return word
                }
            }, "")
            this.setText(lines.join("\n").concat("\n").concat(lastLine))
            return this
        }

        setPosition(position: Vector2): TextElement {
            super.setPosition(position)
            return this
        }

        setSize(size: Vector2): TextElement {
            super.setSize(size)
            return this
        }
    }

    export class ImageElement extends Element {
        img: Image
        constructor(img: Image) {
            super(new Vector2(img.width, img.height))
            this.img = img
        }

        draw(ctx: Image): void {
            ctx.blit(
                this.position.x - this.size.x / 2,
                this.position.y - this.size.y / 2,
                this.size.x, this.size.y,
                this.img, 0, 0,
                this.size.x, this.size.y,
                true, false
            )
        }

        setPosition(position: Vector2): ImageElement {
            super.setPosition(position)
            return this
        }

        setSize(position: Vector2): ImageElement {
            return this
        }
    }

    export class Box extends Clickable implements Border, Color {
        color: color

        border: boolean
        borderColor: color
        borderWidth: number

        constructor(size: Vector2, color?: color) {
            super(size)

            this.color = color ? color : game.Color.Tan

            this.border = false
            this.borderWidth = 1
            this.borderColor = game.Color.Black
        }

        draw(ctx: Image): void {
            if (this.border) {
                ctx.fillRect(
                    this.position.x - this.size.x / 2, this.position.y - this.size.y / 2,
                    this.size.x, this.size.y,
                    this.borderColor
                )
                ctx.fillRect(
                    this.position.x - this.size.x / 2 + this.borderWidth,
                    this.position.y - this.size.y / 2 + this.borderWidth,
                    this.size.x - this.borderWidth * 2, this.size.y - this.borderWidth * 2,
                    this.color
                )
            } else {
                ctx.fillRect(
                    this.position.x - this.size.x / 2, this.position.y - this.size.y / 2,
                    this.size.x, this.size.y,
                    this.color
                )
            }
        }

        setPosition(position: Vector2): Box {
            super.setPosition(position)
            return this
        }

        setSize(size: Vector2): Box {
            super.setSize(size)
            return this
        }

        setColor(color: color): Box {
            this.color = color
            return this
        }

        setBorder(on: boolean): Box {
            this.border = on
            return this
        }

        setBorderColor(color: color): Box {
            this.setBorder(true)
            if (this.borderWidth <= 0) {
                this.setBorderWidth(1)
            }
            this.borderColor = color
            return this
        }

        setBorderWidth(width: number): Box {
            this.setBorder(true)
            this.borderWidth = width
            return this
        }

        pointInside(position: Vector2): boolean {
            let left, right, top, bottom
            left = this.position.x - this.size.x / 2
            right = this.position.x + this.size.x / 2
            top = this.position.y - this.size.y / 2
            bottom = this.position.y + this.size.y / 2
            return position.x >= left && position.x < right && position.y < bottom && position.y > top
        }

        setOnClick(onClick: (position: Vector2) => void): Box {
            this.onClick = onClick
            this.clickable = true
            return this
        }
    }

    export class Circle extends Clickable implements Border, Color {
        radius: number

        color: color

        border: boolean
        borderColor: color
        borderWidth: number

        constructor(radius: number, color?: color) {
            super(new Vector2(radius * 2, radius * 2))
            this.radius = radius

            this.color = color ? color : game.Color.Tan

            this.border = false
            this.borderColor = game.Color.Black
            this.borderWidth = 1
        }
        draw(ctx: Image): void {
            if (this.border) {
                this.singleCircle(ctx, this.position.x, this.position.y, this.radius, this.borderColor)
                this.singleCircle(ctx, this.position.x, this.position.y, this.radius - this.borderWidth, this.color)
            } else {
                this.singleCircle(ctx, this.position.x, this.position.y, this.radius, this.color)
            }
        }

        private singleCircle(ctx: Image, x: number, y: number, radius: number, color: number) {
            ctx.fillCircle(x - 1, y - 1, radius, color)
            ctx.fillCircle(x - 1, y, radius, color)
            ctx.fillCircle(x, y - 1, radius, color)
            ctx.fillCircle(x, y, radius, color)
        }

        setPosition(position: Vector2): Circle {
            super.setPosition(position)
            return this
        }

        setSize(size: Vector2): Circle {
            super.setSize(size)
            return this
        }

        setColor(color: color): Circle {
            this.color = color
            return this
        }

        setBorder(on: boolean): Circle {
            this.border = on
            return this
        }

        setBorderColor(color: color): Circle {
            this.setBorder(true)
            if (this.borderWidth <= 0) {
                this.setBorderWidth(1)
            }
            this.borderColor = color
            return this
        }

        setBorderWidth(width: number): Circle {
            this.setBorder(true)
            this.borderWidth = width
            return this
        }

        pointInside(position: Vector2): boolean {
            return Vector2.distance(this.position, position) < this.radius
        }

        setOnClick(onClick: (position: Vector2) => void): Circle {
            this.onClick = onClick
            this.clickable = true
            return this
        }
    }

    export class RoundedBox extends Box {
        cornerRadius: number
        constructor(size: Vector2, cornerRadius: number, color?: color) {
            super(size, color)
            this.cornerRadius = cornerRadius
        }
        draw(ctx: Image) {
            let cornerRadius = Math.min(this.cornerRadius, Math.round(Math.min(this.size.x, this.size.y) / 2))
            let left = this.position.x - this.size.x / 2 + cornerRadius - 1
            let right = this.position.x + this.size.x / 2 - cornerRadius
            let top = this.position.y - this.size.y / 2 + cornerRadius - 1
            let bottom = this.position.y + this.size.y / 2 - cornerRadius

            if (this.border) {
                ctx.fillCircle(left, top, cornerRadius, this.borderColor)
                ctx.fillCircle(right, top, cornerRadius, this.borderColor)
                ctx.fillCircle(left, bottom, cornerRadius, this.borderColor)
                ctx.fillCircle(right, bottom, cornerRadius, this.borderColor)

                ctx.fillRect(left, this.position.y - this.size.y / 2, right - left, this.size.y, this.borderColor)
                ctx.fillRect(this.position.x - this.size.x / 2, top, this.size.x, bottom - top, this.borderColor)

                ctx.fillCircle(left, top, cornerRadius - this.borderWidth, this.color)
                ctx.fillCircle(right, top, cornerRadius - this.borderWidth, this.color)
                ctx.fillCircle(left, bottom, cornerRadius - this.borderWidth, this.color)
                ctx.fillCircle(right, bottom, cornerRadius - this.borderWidth, this.color)

                ctx.fillRect(
                    left, this.position.y - this.size.y / 2 + this.borderWidth,
                    right - left, this.size.y - this.borderWidth * 2,
                    this.color
                )
                ctx.fillRect(
                    this.position.x + this.borderWidth - this.size.x / 2, top,
                    this.size.x - this.borderWidth * 2, bottom - top,
                    this.color
                )
            } else {
                ctx.fillCircle(left, top, cornerRadius, this.color)
                ctx.fillCircle(right, top, cornerRadius, this.color)
                ctx.fillCircle(left, bottom, cornerRadius, this.color)
                ctx.fillCircle(right, bottom, cornerRadius, this.color)

                ctx.fillRect(left, this.position.y - this.size.y / 2, right - left, this.size.y, this.color)
                ctx.fillRect(this.position.x - this.size.x / 2, top, this.size.x, bottom - top, this.color)
            }
        }

        setPosition(position: Vector2): RoundedBox {
            super.setPosition(position)
            return this
        }

        setSize(size: Vector2): RoundedBox {
            super.setSize(size)
            return this
        }

        setColor(color: color): RoundedBox {
            this.color = color
            return this
        }

        setBorder(on: boolean): RoundedBox {
            this.border = on
            return this
        }

        setBorderColor(color: color): RoundedBox {
            this.setBorder(true)
            if (this.borderWidth <= 0) {
                this.setBorderWidth(1)
            }
            this.borderColor = color
            return this
        }

        setBorderWidth(width: number): RoundedBox {
            this.setBorder(true)
            this.borderWidth = width
            return this
        }
    }

    interface Alignment {
        h: AlignmentMethodH
        v: AlignmentMethodV
    }

    interface Padding {
        left: number
        right: number
        top: number
        bottom: number
    }

    export class ContainedElement {
        element: Element
        align: Alignment
        pad: Padding
        constructor(element: Element) {
            this.element = element
            this.align = {
                h: AlignmentMethodH.CENTER,
                v: AlignmentMethodV.CENTER
            }
            this.pad = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
        setAlignH(align: AlignmentMethodH): ContainedElement {
            this.align.h = align
            return this
        }
        setAlignV(align: AlignmentMethodV): ContainedElement {
            this.align.v = align
            return this
        }
        setPadLeft(pad: number): ContainedElement {
            this.pad.left = pad
            return this
        }
        setPadRight(pad: number): ContainedElement {
            this.pad.right = pad
            return this
        }
        setPadTop(pad: number): ContainedElement {
            this.pad.top = pad
            return this
        }
        setPadBottom(pad: number): ContainedElement {
            this.pad.bottom = pad
            return this
        }
        setPadH(pad: number): ContainedElement {
            this.setPadLeft(pad)
            this.setPadRight(pad)
            return this
        }
        setPadV(pad: number): ContainedElement {
            this.setPadTop(pad)
            this.setPadBottom(pad)
            return this
        }
        setPadding(pad: number): ContainedElement {
            this.setPadH(pad)
            this.setPadV(pad)
            return this
        }
    }

    class Container extends Element {
        children: ContainedElement[]
        shape: Clickable
        constructor() {
            super(Vector2.zero)
            this.children = []
        }

        update() {
            for (let child of this.children) {
                if (child instanceof Container) {
                    child.update()
                }
            }
        }

        draw(ctx: Image) {
            this.update()
            if (this.shape != null) {
                this.shape.setPosition(this.position)
                this.shape.setSize(this.size)
                this.shape.draw(ctx)
            }
            for (let child of this.children) {
                child.element.draw(ctx)
            }
        }

        setPosition(position: Vector2): Container {
            this.position = position
            return this
        }
        setSize(size: Vector2): Container {
            this.size = size
            return this
        }
        setShape(shape: Clickable): Container {
            this.shape = shape
            return this
        }
        addChild(child: ContainedElement): Container {
            this.children.push(child)
            return this
        }
    }

    export class VerticalStack extends Container {
        constructor() {
            super()
        }

        update(): void {
            super.update()
            this.size = Vector2.zero
            for (let child of this.children) {
                const childSize = new Vector2(
                    child.pad.left + child.element.size.x + child.pad.right,
                    child.pad.top + child.element.size.y + child.pad.bottom
                )
                this.size.x = Math.max(this.size.x, childSize.x)
                this.size.y += childSize.y
            }

            let offset = -this.size.y / 2
            for (let child of this.children) {
                offset += child.pad.top
                switch (child.align.h) {
                    case AlignmentMethodH.LEFT: {
                        child.element.setPosition(new Vector2(
                            this.position.x - (this.size.x - child.element.size.x) / 2,
                            this.position.y + offset + child.element.size.y / 2
                        ))
                        break
                    }
                    case AlignmentMethodH.RIGHT: {
                        child.element.setPosition(new Vector2(
                            this.position.x + (this.size.x - child.element.size.x) / 2,
                            this.position.y + offset + child.element.size.y / 2
                            ))
                        break
                    }
                    case AlignmentMethodH.CENTER: {
                        child.element.setPosition(new Vector2(
                            this.position.x,
                            this.position.y + offset + child.element.size.y / 2
                        ))
                        break
                    }
                }
                offset += child.element.size.y
                offset += child.pad.bottom
            }
        }

        setPosition(position: Vector2): VerticalStack {
            super.setPosition(position)
            return this
        }

        setSize(size: Vector2): VerticalStack {
            super.setSize(size)
            return this
        }

        setShape(shape: Clickable): VerticalStack {
            super.setShape(shape)
            return this
        }

        addChild(child: ContainedElement): VerticalStack {
            super.addChild(child)
            return this
        }
    }

    export class HorizontalStack extends Container {
        constructor() {
            super()
        }

        update(): void {
            super.update()
            this.size = Vector2.zero
            for (let child of this.children) {
                const childSize = new Vector2(
                    child.pad.left + child.element.size.x + child.pad.right,
                    child.pad.top + child.element.size.y + child.pad.bottom
                )
                this.size.x += childSize.x
                this.size.y = Math.max(this.size.y, childSize.y)
            }
            let offset = -this.size.x / 2
            for (let child of this.children) {
                offset += child.pad.left
                switch (child.align.v) {
                    case AlignmentMethodV.TOP: {
                        child.element.setPosition(new Vector2(
                            this.position.x + offset + child.element.size.x / 2,
                            this.position.y + child.element.size.y / 2 - this.size.y / 2 + child.pad.top
                        ))
                        break
                    }
                    case AlignmentMethodV.BOTTOM: {
                        child.element.setPosition(new Vector2(
                            this.position.x + offset + child.element.size.x / 2,
                            this.position.y - child.element.size.y / 2 + this.size.y / 2 + child.pad.top
                        ))
                        break
                    }
                    case AlignmentMethodV.CENTER: {
                        child.element.setPosition(new Vector2(
                            this.position.x + offset + child.element.size.x / 2,
                            this.position.y + (child.pad.top - child.pad.bottom) / 2
                        ))
                        break
                    }
                }
                offset += child.element.size.x
                offset += child.pad.right
            }
        }

        setPosition(position: Vector2): HorizontalStack {
            super.setPosition(position)
            return this
        }

        setSize(size: Vector2): HorizontalStack {
            super.setSize(size)
            return this
        }

        setShape(shape: Clickable): HorizontalStack {
            super.setShape(shape)
            return this
        }

        addChild(child: ContainedElement): HorizontalStack {
            super.addChild(child)
            return this
        }
    }

    export class DepthStack extends Container {
        constructor() {
            super()
        }
        update(): void {
            super.update()
            this.size = Vector2.zero
            for (let child of this.children) {
                this.size = new Vector2(
                    Math.max(this.size.x, child.pad.left + child.element.size.x + child.pad.right),
                    Math.max(this.size.y, child.pad.top + child.element.size.y + child.pad.bottom)
                )
            }
            for (let child of this.children) {
                let position = Vector2.zero
                switch(child.align.h) {
                    case AlignmentMethodH.LEFT: {
                        position.x = this.position.x - this.size.x / 2 + child.element.size.x / 2 + child.pad.left
                        break
                    }
                    case AlignmentMethodH.CENTER: {
                        position.x = this.position.x
                        break
                    }
                    case AlignmentMethodH.RIGHT: {
                        position.x = this.position.x + this.size.x / 2 - child.element.size.x / 2 - child.pad.right
                        break
                    }
                }
                switch (child.align.v) {
                    case AlignmentMethodV.TOP: {
                        position.y = this.position.y - this.size.y / 2 + child.element.size.y / 2 + child.pad.top
                        break
                    }
                    case AlignmentMethodV.CENTER: {
                        position.y = this.position.y
                        break
                    }
                    case AlignmentMethodV.BOTTOM: {
                        position.y = this.position.y + this.size.y / 2 - child.element.size.y / 2 - child.pad.bottom
                        break
                    }
                }
                child.element.setPosition(position)
            }
        }

        setPosition(position: Vector2): DepthStack {
            super.setPosition(position)
            return this
        }
        setSize(size: Vector2): DepthStack {
            super.setSize(size)
            return this
        }
        setShape(shape: Clickable): DepthStack {
            super.setShape(shape)
            return this
        }
        addChild(child: ContainedElement): DepthStack {
            super.addChild(child)
            return this
        }
    }

    export class Grid extends Container {
        spacing: number

        
    }
}