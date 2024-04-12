import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        //Enviar EMAIL
        const info = await transporter.sendMail({
            from: 'UpTask <admin@cp.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'UpTask - Confirma tu cuenta',
            html: `<p> Hola: ${user.name}, has creado tu cuenta en nuestro administrador de proyectos, ya casi esta listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguinte enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>E ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            
            `

        })

    }

    static sendPasswordResetToken = async (user: IEmail) => {
        //Enviar EMAIL
        const info = await transporter.sendMail({
            from: 'UpTask <admin@cp.com>',
            to: user.email,
            subject: 'UpTask - Reestablece tu Password',
            text: 'UpTask - Reestablece tu Password',
            html: `<p> Hola: ${user.name}, has solicitado reestablece tu password.</p>
                <p>Visita el siguinte enlace:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer password</a>
                <p>E ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            
            `

        })

    }
}