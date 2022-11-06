import React, { useState } from "react"
import PageTitle from "../components/PageTitle"

const Search = () => {

    const [form, setForm] = useState({
        Name: '',
        Email: '',
        Whatsapp: '',
        Rating: 0
    })
    const rating = [1, 2, 3, 4, 5]
    const [success, setSucess] = useState(false)
    const [result, setResult] = useState({})


    const onChangeEvent = evt => {
        const key = evt.target.name
        const value = evt.target.value

        setForm(old => ({
            ...old,
            [key]: value
        }))

    }

    const save = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })
            const data = await response.json()
            setSucess(true)
            setResult(data)
        } catch (error) {
            console.log(error)
            setSucess(false)
            setResult({})
        }
    }

    return (
        <div className="pt-6">
            <PageTitle title="Search" />
            <h1 className="text-center font-bold text-2xl my-4">Give your feedback</h1>
            <p className="text-center mb-6">The restaurant X would like to know your feedback for better server you next time.We'd love to know what did you think about in your last visit?</p>
            {!success &&
                <React.Fragment>
                    <div className="w-2/5 mx-auto">
                        <label className="font-bold">Name:</label>
                        <input className="w-full p-4 block shadow-lg bg-blue-100 my-2 rounded" type="text" onChange={onChangeEvent} value={form.Name} name="Name" />
                    </div>
                    <div className="w-2/5 mx-auto">
                        <label className="font-bold">E-mail:</label>
                        <input className="w-full p-4 block shadow-lg bg-blue-100 my-2 rounded" type="text" onChange={onChangeEvent} value={form.Email} name="Email" />
                    </div>
                    <div className="w-2/5 mx-auto">
                        <label className="font-bold">Whatsapp:</label>
                        <input className="w-full p-4 block shadow-lg bg-blue-100 my-2 rounded" type="text" onChange={onChangeEvent} value={form.Whatsapp} name="Whatsapp" />
                    </div>
                    <div className="w-2/5 mx-auto">
                        <label className="font-bold">Feedback:</label>
                        <input className="w-full p-4 block shadow-lg bg-blue-100 my-2 rounded" type="text" />
                    </div>
                    <div className="w-2/5 mx-auto">
                        <label className="font-bold">Rating:</label>
                        <br />
                        <div className="flex py-6">
                            {rating.map(r => {
                                return (
                                    <label className="block w-1/5 text-center">{r} <br />
                                        <input onChange={onChangeEvent} type="radio" name="Rating" value={r}></input>
                                    </label>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div className="w-2/5 mx-auto">
                        <button onClick={save} className="w-full bg-blue-400 my-2 px-6 py-4 font-bold rounded-lg shadow-lg hover:bg-blue-700">Save</button>
                    </div>
                </React.Fragment>
            }
            {success &&
                <div>
                    <p className="mb-6 text-center bg blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3">Thank you for your answer!</p>
                    {
                        result.showCoupom && <div className="text-center border p-4 mb-4"> Your Coupom: <span className="font-bold text-42xl">{result.Coupom}</span> </div>
                    }
                    {
                        result.showCoupom && <div className="text-center border p-4 mb-4"><span className="font-bold">{result.Promo}</span> </div>
                    }
                </div>
            }

        </div>
    )
}

export default Search;