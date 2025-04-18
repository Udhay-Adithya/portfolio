import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Intro() {
    return (
        <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-4xl font-light">
                hello, i'm{" "}
                <span className="inline-flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/Udhay-Adithya.png" alt="@Udhay-Adithya" />
                        <AvatarFallback>UA</AvatarFallback>
                    </Avatar>
                    <span>udhay adithya</span>
                </span>{" "}
                — a devsigner &{"\n"}
                open sourcerer, here's what i{" "}
                <u>do</u>, what i <u>think</u> and what i <u>see</u>.
            </h1>
        </div>
    );
}
