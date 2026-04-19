export type Status = "online" | "donotdisturb" | "inactive" | "offline"

export type Role = "owner" | "admin" | "dev" | "contributor" | "user"

export type transactions = "flag" | "geoint" | "daily" | "admin" | "penalty" | "shop"

export type User = {
    user_id: number
    username: string
    email: string
    password: string
    role: string
    created_at: string
    coin: number
    pp_url: string
    status: Status
    is_online: boolean
}

export type challenges = {
    id: number
    name: string
    slug: string[]
    category: string
    is_public: boolean
}

export type flag_list = {
    title: string
    flag: string
    format: string
    description: string
    indice: string
}

export type guessTheP = {
    id: number
    title: string
    description: string
    image: string
    difficulty: string
    flag: string
    hint: string
    points: number
}

export interface Flag {
    nbr: number;
    name: string;
    flag: string;
    flag_format: string;
    description: string;
    hint: string;
    isHintShow: boolean;
}