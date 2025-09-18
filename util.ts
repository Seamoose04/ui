class Vector2 {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    scale(scalar: number) {
        this.x *= scalar
        this.y *= scalar
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0)
    }

    static distance(a: Vector2, b: Vector2): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }

    toString(): string {
        return `x: ${this.x}, y: ${this.y}`
    }
}