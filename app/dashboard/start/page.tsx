import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import { auth } from "@/auth";
// ts-ignore
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await auth();
    if (!session?.user) {
        console.log("no session!");
        redirect("../login?session=false");
    }

    const user = session.user;

    const Chat = dynamic(() => import("@/components/Chat"), {
        ssr: false,
    });

    const accessToken = await getHumeAccessToken();

    if (!accessToken) {
        throw new Error();
    }

    const getFirstName = (fullName: string) => {
        return fullName.split(' ')[0];
    };

    return (
        <div className="flex w-full h-full">
            <div className="flex-auto flex-col mx-5 border-3 border-sky-300 p-3 m-3 bg-white bg-opacity-75 rounded-lg overflow-y-auto min-w-80">
                <h1 className="text-5xl text-center p-5">Hi {session?.user?.name ? getFirstName(session.user.name) : ''}, how are you today?</h1>
                <Chat accessToken={accessToken} />
            </div>
        </div>
    )
}