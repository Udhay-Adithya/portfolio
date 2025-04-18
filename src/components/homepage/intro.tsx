import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Intro() {
    return (
        <div className="text-left mb-12 space-y-6 pl-16">
            <h1 className="text-2xl md:text-4xl font-light">
                hello, i&rsquo;m{" "}
                <span className="inline-flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/Udhay-Adithya.png" alt="@Udhay-Adithya" />
                        <AvatarFallback>UA</AvatarFallback>
                    </Avatar>
                    <span>udhay adithya</span>
                </span>{" "}
                — a devsigner & <br />
                open sourcerer, here&rsquo;s what i{" "}
                <Link href="/work"><u>do</u></Link>, what i <Link href="/blog"><u>think</u></Link> and what i <Link href="/pov"><u>see</u></Link>.
            </h1>

        </div>
    );
}
