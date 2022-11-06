import React from "react";
import Link from "next/link";
import PageTitle from "../components/PageTitle";

const Contact = () => {
    return (
        <div>
            <PageTitle title="Contact" />
            <h1>Contact</h1>
            <div>
                <Link href='/'>Home</Link>
            </div>
        </div>
    )
}

export default Contact;