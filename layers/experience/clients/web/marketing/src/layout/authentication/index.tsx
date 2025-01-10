import { isAuthenticatedAtom } from "../../data/atoms/auth"
import { useRecoilState } from "recoil"


export const Authentication: React.FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom)


    if(isAuthenticated) return <></>

    return (
        <div className="">
            <button className="px-4 py-2 rounded-md bg-purple-700 text-white font-medium text-md shadow-lg hover:shadow-inner"> Login </button>
        </div>
    )
}