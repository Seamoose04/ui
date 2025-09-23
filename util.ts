class Vector2 {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0)
    }

    static distance(a: Vector2, b: Vector2): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }

    static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y)
    }

    static multiply(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x * b.x, a.y * b.y)
    }

    static scale(vec: Vector2, scalar: number): Vector2 {
        return new Vector2(vec.x * scalar, vec.y * scalar)
    }

    toString(): string {
        return `x: ${this.x}, y: ${this.y}`
    }

    scale(scalar: number) {
        this.x *= scalar
        this.y *= scalar
    }

    add(vec: Vector2) {
        this.x += vec.x
        this.y += vec.y
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y)
    }
}

class Dict<K, V> {
    keys: K[]
    values: V[]
    constructor() {
        this.keys = []
        this.values = []
    }

    get(key: K): V | null {
        const idx = this.keys.indexOf(key)
        if (idx >= 0) {
            return this.values[idx]
        } else {
            return null
        }
    }

    set(key: K, value: V): void {
        const idx = this.keys.indexOf(key)
        if (idx >= 0) {
            this.values[idx] = value
        } else {
            this.keys.push(key)
            this.values.push(value)
        }
    }

    remove(key: K): void {
        const idx = this.keys.indexOf(key)
        if (idx >= 0) {
            this.keys.removeAt(idx)
            this.values.removeAt(idx)
        }
    }
}