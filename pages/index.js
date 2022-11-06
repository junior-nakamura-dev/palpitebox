import Link from "next/link"
import React from "react"
import useSWR from "swr"
import PageTitle from "../components/PageTitle"

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSWR('/api/get-promo', fetcher)

    return (
        <React.Fragment>
            <PageTitle title="Home Page" />
            <p className="mt-12 text-center font-bold">The restaurant X would like to know your feedback for better server you next time. We'd love to know what did you think about in your last visit?</p>
            <div className="text-center my-12">
                <Link className="bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:bg-blue-700" href="/search">
                    Give your feedback
                </Link>
            </div>
            {!data && <p>Loading ...</p>}
            {data && data.showCoupom && <p className="my-12 text-center font-bold"> {data.coupomMessage}</p>}
        </React.Fragment>
    )
}

export default Index