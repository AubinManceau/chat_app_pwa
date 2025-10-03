import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full flex justify-between p-4 border-b border-gray-200">
            <Link href="/">Logo</Link>
            <div>
                <Link href={"/chat"} className="mr-4">Chat</Link>
                <Link href={"/gallery"}>Gallery</Link>
            </div>
        </div>
    );
}