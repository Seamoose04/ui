namespace UI {
    export enum PositionMethod {
        CENTER,
        TOP_LEFT
    }

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
        private clickedOn(element: Element, position: Vector2) {
            if (element instanceof Container) {
                let container = element as Container
                for (let child of container.children) {
                    this.clickedOn(child, position)
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
        positionMethod: PositionMethod
        setPositionMethod(method: PositionMethod): Element
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
        positionMethod: PositionMethod
        constructor(position: Vector2, size: Vector2) {
            this.parent = null
            this.position = position
            this.size = size
        }

        draw(ctx: Image): void { }

        setParent(container: Container): void {
            this.parent = container
            container.children.push(this)
        }

        setPosition(position: Vector2): Element {
            this.position = position
            return this
        }

        setPositionMethod(method: PositionMethod): Element {
            this.positionMethod = method
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

        constructor(position: Vector2, size: Vector2) {
            super(position, size)
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
    export enum TextWrapMode {
        Wrap,
        Cut,
        Continue,
        Ellipsis
        // scroll text?
    }
    export class TextElement extends Element {
        text: string
        color: color
        fontSize: FontSize
        
        constructor(position: Vector2, text: string, color?: color) {
            super(position, Vector2.zero)
            this.color = color ? color : game.Color.Black
            this.fontSize = FontSize.Small
            this.setText(text)
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
            let maxColumns = rows.reduce((max: number, current: string) => {
                return Math.max(max, current.replace("\n", "").length)
            }, 0)
            return new Vector2(rows.length, maxColumns)
        }

        private sizeOfText(text: string): Vector2 {
            let gridSize = TextElement.textGridSize(text)
            switch (this.fontSize) {
                case FontSize.Small: {
                    gridSize.x *= 5
                    gridSize.y *= 7
                    break
                }
                case FontSize.Medium: {
                    gridSize.x *= 6
                    gridSize.y *= 10
                    break
                }
                case FontSize.Large: {
                    gridSize.x *= 12
                    gridSize.y *= 14
                    break
                }
            }
            return gridSize
        }

        draw(ctx: Image): void {
            switch (this.positionMethod) {
                case PositionMethod.CENTER: {
                    ctx.print(this.text, 0, 0, this.color, this.font)
                    break
                }
            }
        }

        setText(text: string): TextElement {
            this.text = text
            this.setSize(this.sizeOfText(this.text))
            return this
        }

        setTextSize(size: FontSize): TextElement {
            this.fontSize = size
            return this
        }
    }

    export class ImageElement extends Element {
        img: Image
        constructor(position: Vector2, img: Image) {
            super(position, new Vector2(img.width, img.height))
            this.img = img
        }

        draw(ctx: Image): void {
            switch (this.positionMethod) {
                case PositionMethod.CENTER: {
                    ctx.blit(
                        this.position.x - this.size.x / 2,
                        this.position.y - this.size.y / 2,
                        this.size.x, this.size.y,
                        this.img, 0, 0,
                        this.size.x, this.size.y,
                        true, false
                    )
                    break
                }
                case PositionMethod.TOP_LEFT: {
                    ctx.blit(
                        this.position.x, this.position.y,
                        this.size.x, this.size.y,
                        this.img, 0, 0,
                        this.size.x, this.size.y,
                        true, false
                    )
                    break
                }
            }
        }

        setPosition(position: Vector2): ImageElement {
            super.setPosition(position)
            return this
        }

        setSize(position: Vector2): ImageElement {
            return this
        }

        setPositionMethod(method: PositionMethod): ImageElement {
            super.setPositionMethod(method)
            return this
        }
    }

    export class Box extends Clickable implements Border, Color {
        color: color

        border: boolean
        borderColor: color
        borderWidth: number

        constructor(position: Vector2, size: Vector2, color?: color) {
            super(position, size)
            this.positionMethod = PositionMethod.CENTER

            this.color = color ? color : game.Color.Tan

            this.border = false
            this.borderWidth = 1
            this.borderColor = game.Color.Black
        }

        draw(ctx: Image): void {
            switch (this.positionMethod) {
                case PositionMethod.CENTER: {
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
                    break
                }
                case PositionMethod.TOP_LEFT: {
                    if (this.border) {
                        ctx.fillRect(
                            this.position.x, this.position.y,
                            this.size.x, this.size.y,
                            this.borderColor
                        )
                        ctx.fillRect(
                            this.position.x + this.borderWidth, this.position.y + this.borderWidth,
                            this.size.x - this.borderWidth * 2, this.size.y - this.borderWidth * 2,
                            this.color
                        )
                    } else {
                        ctx.fillRect(
                            this.position.x, this.position.y,
                            this.size.x, this.size.y,
                            this.color
                        )
                    }
                    break
                }
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

        setPositionMethod(method: PositionMethod): Box {
            super.setPositionMethod(method)
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
            this.borderColor = color
            return this
        }

        setBorderWidth(width: number): Box {
            this.borderWidth = width
            return this
        }

        pointInside(position: Vector2): boolean {
            let left, right, top, bottom
            switch (this.positionMethod) {
                case PositionMethod.TOP_LEFT: {
                    left = this.position.x
                    right = this.position.x + this.size.x
                    top = this.position.y
                    bottom = this.position.y + this.size.y
                    break
                }
                case PositionMethod.CENTER: {
                    left = this.position.x - this.size.x / 2
                    right = this.position.x + this.size.x / 2
                    top = this.position.y - this.size.y / 2
                    bottom = this.position.y + this.size.y / 2
                    break
                }
            }
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

        constructor(position: Vector2, radius: number, color?: color) {
            super(position, new Vector2(radius * 2, radius * 2))
            this.positionMethod = PositionMethod.CENTER
            this.radius = radius

            this.color = color ? color : game.Color.Tan

            this.border = false
            this.borderColor = game.Color.Black
            this.borderWidth = 1
        }
        draw(ctx: Image): void {
            switch (this.positionMethod) {
                case PositionMethod.CENTER: {
                    if (this.border) {
                        this.singleCircle(ctx, this.position.x, this.position.y, this.radius, this.borderColor)
                        this.singleCircle(ctx, this.position.x, this.position.y, this.radius - this.borderWidth, this.color)
                    } else {
                        this.singleCircle(ctx, this.position.x, this.position.y, this.radius, this.color)
                    }
                    break
                }
                case PositionMethod.TOP_LEFT: {
                    if (this.border) {
                        this.singleCircle(ctx, this.position.x - this.radius, this.position.y - this.radius, this.radius, this.borderColor)
                        this.singleCircle(ctx, this.position.x - this.radius, this.position.y - this.radius, this.radius - this.borderWidth, this.color)
                    } else {
                        this.singleCircle(ctx, this.position.x, this.position.y, this.radius, this.color)
                    }
                    break
                }
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

        setPositionMethod(method: PositionMethod): Circle {
            super.setPositionMethod(method)
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
            this.borderColor = color
            return this
        }

        setBorderWidth(width: number): Circle {
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
        constructor(position: Vector2, size: Vector2, cornerRadius: number, color?: color) {
            super(position, size, color)
            this.cornerRadius = cornerRadius
        }
        draw(ctx: Image) {
            switch (this.positionMethod) {
                case PositionMethod.TOP_LEFT: {
                    let cornerRadius = Math.min(this.cornerRadius, Math.ceil(Math.min(this.size.x, this.size.y) / 2) - 1)
                    let left = this.position.x + cornerRadius - 1
                    let right = this.position.x + this.size.x - cornerRadius
                    let top = this.position.y + cornerRadius - 1
                    let bottom = this.position.y + this.size.y - cornerRadius
                    if (this.border) {
                        ctx.fillCircle(left, top, cornerRadius, this.borderColor)
                        ctx.fillCircle(right, top, cornerRadius, this.borderColor)
                        ctx.fillCircle(left, bottom, cornerRadius, this.borderColor)
                        ctx.fillCircle(right, bottom, cornerRadius, this.borderColor)

                        ctx.fillRect(left, this.position.y, right - left, this.size.y, this.borderColor)
                        ctx.fillRect(this.position.x, top, this.size.x, bottom - top, this.borderColor)

                        ctx.fillCircle(left, top, cornerRadius - this.borderWidth, this.color)
                        ctx.fillCircle(right, top, cornerRadius - this.borderWidth, this.color)
                        ctx.fillCircle(left, bottom, cornerRadius - this.borderWidth, this.color)
                        ctx.fillCircle(right, bottom, cornerRadius - this.borderWidth, this.color)

                        ctx.fillRect(
                            left, this.position.y + this.borderWidth,
                            right - left, this.size.y - this.borderWidth * 2,
                            this.color
                        )
                        ctx.fillRect(
                            this.position.x + this.borderWidth, top,
                            this.size.x - this.borderWidth * 2, bottom - top,
                            this.color
                        )
                    } else {
                        ctx.fillCircle(left, top, cornerRadius, this.color)
                        ctx.fillCircle(right, top, cornerRadius, this.color)
                        ctx.fillCircle(left, bottom, cornerRadius, this.color)
                        ctx.fillCircle(right, bottom, cornerRadius, this.color)

                        ctx.fillRect(left, this.position.y, right - left, this.size.y, this.color)
                        ctx.fillRect(this.position.x, top, this.size.x, bottom - top, this.color)
                    }
                    break
                }
                case PositionMethod.CENTER: {
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

                    break
                }
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

        setPositionMethod(method: PositionMethod): Box {
            super.setPositionMethod(method)
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
            this.borderColor = color
            return this
        }

        setBorderWidth(width: number): RoundedBox {
            this.borderWidth = width
            return this
        }
    }

    class Container extends Element {
        children: Element[]
        shape: Clickable
        constructor(position: Vector2, size: Vector2) {
            super(position, size)
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
                this.shape.setPositionMethod(this.positionMethod)
                this.shape.setSize(this.size)
                this.shape.draw(ctx)
            }
            for (let child of this.children) {
                child.draw(ctx)
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
        setPositionMethod(method: PositionMethod): Container {
            this.positionMethod = method
            return this
        }
        setShape(shape: Clickable): Container {
            this.shape = shape
            return this
        }
        addChild(child: Element): Container {
            child.setParent(this)
            return this
        }
    }

    export class VerticalStack extends Container {
        spacing: number
        alignmentMethod: AlignmentMethodH

        constructor(position: Vector2, children?: Element[]) {
            super(position, Vector2.zero)
            this.spacing = 0
            if (children) {
                this.children = children
                this.update()
            }
            this.alignmentMethod = AlignmentMethodH.CENTER
        }

        update(): void {
            super.update()
            this.size = new Vector2(0, this.spacing)
            for (let child of this.children) {
                this.size.y += child.size.y
                this.size.y += this.spacing
                this.size.x = Math.max(this.size.x, child.size.x)
            }

            this.size.x += this.spacing * 2

            switch (this.positionMethod) {
                case PositionMethod.TOP_LEFT: {
                    let offset = this.spacing
                    for (let child of this.children) {
                        switch (this.alignmentMethod) {
                            case AlignmentMethodH.LEFT: {
                                child.setPosition(new Vector2(this.position.x, this.position.y + offset))
                                break
                            }
                            case AlignmentMethodH.RIGHT: {
                                child.setPosition(new Vector2(this.position.x + (this.size.x - child.size.x), this.position.y + offset))
                                break
                            }
                            case AlignmentMethodH.CENTER: {
                                child.setPosition(new Vector2(this.position.x + (this.size.x - child.size.x) / 2, this.position.y + offset))
                                break
                            }
                        }
                        offset += child.size.y
                        offset += this.spacing
                    }
                    break
                }
                case PositionMethod.CENTER: {
                    let offset = -this.size.y / 2 + this.spacing
                    for (let child of this.children) {
                        switch (this.alignmentMethod) {
                            case AlignmentMethodH.LEFT: {
                                child.setPosition(new Vector2(this.position.x - (this.size.x - child.size.x) / 2, this.position.y + offset + child.size.y / 2))
                                break
                            }
                            case AlignmentMethodH.RIGHT: {
                                child.setPosition(new Vector2(this.position.x + (this.size.x - child.size.x) / 2, this.position.y + offset + child.size.y / 2))
                                break
                            }
                            case AlignmentMethodH.CENTER: {
                                child.setPosition(new Vector2(this.position.x, this.position.y + offset + child.size.y / 2))
                                break
                            }
                        }
                        offset += child.size.y
                        offset += this.spacing
                    }
                    break
                }
            }
        }

        setSpacing(spacing: number): VerticalStack {
            this.spacing = spacing
            return this
        }

        setAlignmentMethod(method: AlignmentMethodH): VerticalStack {
            this.alignmentMethod = method
            return this
        }

        setPosition(position: Vector2): VerticalStack {
            super.setPosition(position)
            return this
        }

        setPositionMethod(method: PositionMethod): VerticalStack {
            super.setPositionMethod(method)
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

        addChild(child: Element): VerticalStack {
            super.addChild(child)
            return this
        }
    }

    export class HorizontalStack extends Container {
        spacing: number
        alignmentMethod: AlignmentMethodV

        constructor(position: Vector2, children?: Element[]) {
            super(position, Vector2.zero)
            this.spacing = 0
            this.alignmentMethod = AlignmentMethodV.CENTER
            if (children) {
                this.children = children
                this.update()
            }
        }

        update(): void {
            super.update()
            this.size = new Vector2(this.spacing, 0)
            for (let child of this.children) {
                this.size.x += child.size.x
                this.size.x += this.spacing
                this.size.y = Math.max(this.size.y, child.size.y)
            }

            switch (this.positionMethod) {
                case PositionMethod.TOP_LEFT: {
                    let offset = this.spacing
                    for (let child of this.children) {
                        switch (this.alignmentMethod) {
                            case AlignmentMethodV.TOP: {
                                child.setPosition(new Vector2(this.position.x + offset, this.position.y))
                                break
                            }
                            case AlignmentMethodV.BOTTOM: {
                                child.setPosition(new Vector2(this.position.x + offset, this.position.y + (this.size.y - child.size.y)))
                                break
                            }
                            case AlignmentMethodV.CENTER: {
                                child.setPosition(new Vector2(this.position.x + offset, this.position.y + (this.size.y - child.size.y) / 2))
                                break
                            }
                        }
                        offset += child.size.y
                        offset += this.spacing
                    }
                    break
                }
                case PositionMethod.CENTER: {
                    let offset = -this.size.y / 2 + this.spacing
                    for (let child of this.children) {
                        switch (this.alignmentMethod) {
                            case AlignmentMethodV.TOP: {
                                child.setPosition(new Vector2(this.position.x - (this.size.x - child.size.x) / 2, this.position.y + offset + child.size.y / 2))
                                break
                            }
                            case AlignmentMethodV.BOTTOM: {
                                child.setPosition(new Vector2(this.position.x + (this.size.x - child.size.x) / 2, this.position.y + offset + child.size.y / 2))
                                break
                            }
                            case AlignmentMethodV.CENTER: {
                                child.setPosition(new Vector2(this.position.x, this.position.y + offset + child.size.y / 2))
                                break
                            }
                        }
                        offset += child.size.y
                        offset += this.spacing
                    }
                    break
                }
            }
        }

        setSpacing(spacing: number): HorizontalStack {
            this.spacing = spacing
            return this
        }

        setAlignmentMethod(method: AlignmentMethodV): HorizontalStack {
            this.alignmentMethod = method
            return this
        }

        setPosition(position: Vector2): HorizontalStack {
            super.setPosition(position)
            return this
        }

        setPositionMethod(method: PositionMethod): HorizontalStack {
            super.setPositionMethod(method)
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

        addChild(child: Element): HorizontalStack {
            super.addChild(child)
            return this
        }
    }

    export class DepthStack extends Container {
        spacing: number
        alignmentMethodH: AlignmentMethodH
        alignmentMethodV: AlignmentMethodV
        constructor(position: Vector2, children?: Element[]) {
            super(position, Vector2.zero)
            if (children) {
                this.children = children
                this.update()
            }
            this.alignmentMethodH = AlignmentMethodH.CENTER
            this.alignmentMethodV = AlignmentMethodV.CENTER
            this.spacing = 0
        }
        update(): void {
            super.update()
            this.size = Vector2.zero
            for (let child of this.children) {
                child.setPositionMethod(this.positionMethod)
                this.size = new Vector2(Math.max(this.size.x, child.size.x), Math.max(this.size.y, child.size.y))
            }
            this.size.x += this.spacing * 2
            this.size.y += this.spacing * 2
            for (let child of this.children) {
                switch (this.positionMethod) {
                    case PositionMethod.CENTER: {
                        let position = Vector2.zero
                        switch (this.alignmentMethodH) {
                            case AlignmentMethodH.LEFT: {
                                position.x = this.position.x - (this.size.x / 2 - this.spacing) + child.size.x / 2
                                break
                            }
                            case AlignmentMethodH.CENTER: {
                                position.x = this.position.x
                                break
                            }
                            case AlignmentMethodH.RIGHT: {
                                position.x = this.position.x + (this.size.x / 2 - this.spacing) - child.size.x / 2
                                break
                            }
                        }
                        switch (this.alignmentMethodV) {
                            case AlignmentMethodV.TOP: {
                                position.y = this.position.y - (this.size.y / 2 - this.spacing) + child.size.y / 2
                                break
                            }
                            case AlignmentMethodV.CENTER: {
                                position.y = this.position.y
                                break
                            }
                            case AlignmentMethodV.BOTTOM: {
                                position.y = this.position.y + (this.size.y / 2 - this.spacing) - child.size.y / 2
                                break
                            }
                        }
                        child.setPosition(position)
                        break
                    }
                    case PositionMethod.TOP_LEFT: {
                        let position = Vector2.zero
                        switch (this.alignmentMethodH) {
                            case AlignmentMethodH.LEFT: {
                                position.x = this.position.x - (this.size.x / 2 - this.spacing) + child.size.x / 2
                                break
                            }
                            case AlignmentMethodH.CENTER: {
                                position.x = this.position.x
                                break
                            }
                            case AlignmentMethodH.RIGHT: {
                                position.x = this.position.x + (this.size.x / 2 - this.spacing) - child.size.x / 2
                                break
                            }
                        }
                        switch (this.alignmentMethodV) {
                            case AlignmentMethodV.TOP: {
                                position.y = this.position.y - (this.size.y / 2 - this.spacing) + child.size.y / 2
                                break
                            }
                            case AlignmentMethodV.CENTER: {
                                position.y = this.position.y
                                break
                            }
                            case AlignmentMethodV.BOTTOM: {
                                position.y = this.position.y + (this.size.y / 2 - this.spacing) - child.size.y / 2
                                break
                            }
                        }
                        position.x += this.size.x / 2
                        position.y += this.size.y / 2
                        child.setPosition(position)
                        break
                    }
                }
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
        setPositionMethod(method: PositionMethod): DepthStack {
            super.setPositionMethod(method)
            return this
        }
        setShape(shape: Clickable): DepthStack {
            super.setShape(shape)
            return this
        }
        addChild(child: Element): DepthStack {
            super.addChild(child)
            return this
        }
        setSpacing(spacing: number): DepthStack {
            this.spacing = spacing
            return this
        }
    }

    export class Grid extends Container {
        spacing: number

        
    }
}