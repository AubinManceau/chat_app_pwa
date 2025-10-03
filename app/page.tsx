import Link from "next/link";

export default function Home() {
    return (
        <div className="h-full w-full flex flex-col gap-3 items-center justify-center">
            <Link href="/chat" className="">
                Go to Chat
            </Link>
            <Link href="/gallery" className="">
                Go to Gallery
            </Link>
        </div>
    );
}