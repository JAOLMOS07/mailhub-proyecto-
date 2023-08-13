import {User} from "../user/user"

export interface Mail {
    id: number,
    asunto: string,
    contenido: string,
    user_id: number,
    user_destination_id: number,
    importante: number,
    visto: number,
    archivado_origen: number,
    archivado_destinatario: number,
    eliminado_origen: number,
    eliminado_destinatario: number,
    from_email: string,
    to_email: string,
    created_at: string,
    user: User,
    user_to: User
}
