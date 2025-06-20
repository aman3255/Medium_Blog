import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "aman3255-common_backend_fronted";
export const Auth = () => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    return (
        <div className="h-screen flex justify-center flex-col">
            {/* {JSON.stringify(postInputs)} */}
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an account!
                    </div>
                    <div className="text-slate-400">
                        Already have an account?
                        <Link className="underline pl-2" to={"/signin"} >Login</Link>
                    </div>
                    <div>
                        <LabelledInput label="Name" placeholder="Aman Prajapati..." onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputTypes) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}