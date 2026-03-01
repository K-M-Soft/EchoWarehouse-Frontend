import { BaseResponseDto, ErrorDetailDto } from "../validation/dtos";

export class LoginRequestDTO {
    username: string
    password: string
    validator: ErrorDetailDto[];

    constructor(init?: Partial<LoginRequestDTO>) {
        this.username = init?.username || "";
        this.password = init?.password || "";
        this.validator = init?.validator?.map(v => new ErrorDetailDto(v)) || [];

    }
}
    
export class LoginResponseDTO extends BaseResponseDto{
    success!: boolean
    accessToken?: string | null
    refreshToken?: string | null
    expiresAt!: string
    user?: UserDTO | null

    constructor(init?: Partial<LoginResponseDTO>) {
        super(init);
        this.success = init?.success || false;
        this.accessToken = init?.accessToken || null;
        this.refreshToken = init?.refreshToken || null;
        this.expiresAt = init?.expiresAt || "";
        this.user = init?.user || null;
    }
}

// api clienssel megy az elso request, ez nem kell jelenleg

// export class RegisterRequestDTO {
//     username!: string
//     email!: string
//     password!: string
//     passwordConfirm!: string

//     constructor(init?: Partial<RegisterRequestDTO>) {
//         Object.assign(this, init)
//     }
// }

// export class RegisterResponseDTO {
//     success!: boolean
//     user?: UserDTO | null

//     constructor(init?: Partial<RegisterResponseDTO>) {
//         Object.assign(this, init)
//     }
// }

export class RefreshTokenRequestDTO {
    refreshToken!: string

    constructor(init?: Partial<RefreshTokenRequestDTO>) {
        Object.assign(this, init)
    }
}

export class RefreshTokenResponseDTO {
    success!: boolean
    accessToken?: string | null
    refreshToken?: string | null
    expiresAt!: string

    constructor(init?: Partial<RefreshTokenResponseDTO>) {
        Object.assign(this, init)
    }
}

export class UserDTO {
    id!: number
    username!: string
    email!: string
    role!: string
    isActive!: boolean
    createdAt!: string

    constructor(init?: Partial<UserDTO>) {
        Object.assign(this, init)
    }
}




