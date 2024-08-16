import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export const getServerSideProps = async (context: any) => {
    const session = await auth(context.req)


    if (!session?.user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        }
    }

    const { id } = context.params
    const chatSession = await prisma.chat.findUnique({
        where: {
            id: String(id),
        },
        include: {
            user: true,
        }
    })

    if (!chatSession) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            chatSession,
        },
    }
}

const TranscriptPage = () => {
    return (<h1> bozo !</h1>)
}