import EmptyFilter from "@/app/components/EmptyFilter";

export default function SignIn({searchParams}: {searchParams: {callbackUrl: string}}) {
    return (
        <EmptyFilter title="Login required" subtitle="Please click the login below" callbackUrl={searchParams.callbackUrl} showLogin/>
    )
}