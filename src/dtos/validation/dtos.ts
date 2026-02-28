export class ValidationErrorDTO {
    errors!: Record<string, string>

    constructor(init?: Partial<ValidationErrorDTO>) {
        Object.assign(this, init)
    }
}