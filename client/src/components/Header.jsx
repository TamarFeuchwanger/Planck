import { PlanckLogo } from "./PlanckLogo"
import { LoginForm } from "./LoginForm"

export const Header = () => {
    return (
        <div className='flex flex-col md:flex-row justify-between mt-12 px-4' >
            <div className='pl-10'>
                <PlanckLogo />
            </div>
            <div className='pr-10'>
                <LoginForm />
            </div>
        </div>
    )
}