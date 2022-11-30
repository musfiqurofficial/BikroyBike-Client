import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`https://assingment-12-server.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin)
                    setIsLoading(false)
                })
        }
    }, [email])
    return [isAdmin, isloading]
}


export default useAdmin;