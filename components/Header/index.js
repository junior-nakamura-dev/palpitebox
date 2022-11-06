import React from "react"
import styles from "./styles.module.css"
import Link from "next/link"

const Header = () => {
    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className="container mx-auto">
                    <Link href="/">
                        <img className="mx-auto" src="./logo_palpitebox.png" alt="Palpite Box" />
                    </Link>
                </div>
            </div>
            <div className="bg-gray-300 p-4 shadow-md text-center">
                <Link className="px-2 hover:underline" href='/search'>Search</Link>
                <Link className="px-2 hover:underline" href='/contact'>Contact</Link>
                <Link className="px-2 hover:underline" href='/about'>About</Link>
            </div>
        </React.Fragment>
    )
}
export default Header