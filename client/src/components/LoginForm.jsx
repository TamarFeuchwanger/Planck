import { useState } from 'react'
import axios from 'axios';
import '../App.css'

export const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginLogout = async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            setIsLoggedIn(false)
            setUser({})
            return;
        }
        if (!email || !password) {
            //TODO: indicate in the UI
            return;
        }
        const credentials = btoa(`${email}:${password}`)
        const config = {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        }
        try {
            const { data } = await axios.post('/api/auth/login', {}, config)
            if (data?.user) {
                setUser(data.user)
                setIsLoggedIn(true)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleLoginLogout} className="flex flex-row justify-between space-x-4">
                {!isLoggedIn ? (<>
                    <input
                        type="text"
                        className="p-4 inp-h rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-4 inp-h rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    /></>) : (<h1>Hello {user.name}</h1>)
                }
                <button
                    type="submit"
                    className="inp-h rounded-[14px] px-6 text-white btn-bg-purple-100 hover:btn-bg-purple-80"
                >{!isLoggedIn ? 'Log in' : 'Log out'}</button>
            </form>
        </div>
    )
}
