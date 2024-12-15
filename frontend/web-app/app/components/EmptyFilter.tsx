'use client'

import {useParamsStore} from "@/hooks/useParamsStore";
import Heading from "@/app/components/Heading";
import {Button} from "flowbite-react";
import {signIn} from "next-auth/react";

type Props = {
    title?: string,
    subtitle?: string,
    showReset?: boolean,
    showLogin?: boolean,
    callbackUrl?: string
}

export default function EmptyFilter({title = "No Matches For This Filter", subtitle = "Try Resetting the Filter", showReset, showLogin, callbackUrl}: Props) {
    const reset=  useParamsStore(state => state.reset);

    return (
        <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center={true} />
            <div className="mt-4">
                {showReset && <Button onClick={reset} outline>Reset</Button>}
                {showLogin && <Button onClick={() => signIn('id-server', {redirectTo: callbackUrl})} outline>Login</Button>}
            </div>
        </div>
    )
}