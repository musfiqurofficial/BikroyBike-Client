import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`https://assingment-12-server.vercel.app/user/sellar/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsSeller(data.isSellar)
                    setIsLoading(false)
                })
        }
    }, [email])
    return [isSeller, isLoading]
}


export default useSeller;