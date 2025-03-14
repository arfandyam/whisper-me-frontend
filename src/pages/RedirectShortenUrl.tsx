import { redirectShortenUrl } from "@/api/questions/questions";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RedirectShortenUrl() {
    const { urlKey } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const getSlug = async () => {
            const response = await redirectShortenUrl(urlKey);
            console.log(response)
            if (response.ok) {
                window.location.href = response.url
            } else {
                console.error("Failed to redirect")
            }
        }

        getSlug();
    }, [urlKey, navigate])

    return (
        <div>Redirecting...</div>
    )
}