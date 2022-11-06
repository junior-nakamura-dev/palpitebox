import React from "react"
import Link from "next/link"
import PageTitle from "../components/PageTitle"

const About = () => {
    return (
        <div>
            <PageTitle title="About" />
            <h1>About</h1>
            <div>
                <Link href='/'>Home</Link>
            </div>
        </div>
    )
}

export default About