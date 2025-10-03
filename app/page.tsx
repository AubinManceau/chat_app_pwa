import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <Link href="/chat" className="">
                Go to Chat
            </Link>
        </div>
    );
}