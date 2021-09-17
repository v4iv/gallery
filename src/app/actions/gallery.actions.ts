import axios, {AxiosError} from "axios"
import { get } from "lodash"

export const fetchGalleryAction = (page: string | number | null) => {
    return new Promise(async (resolve, reject) => {
        const url = `${process.env.REACT_APP_FLICKR_API_URL}flickr.photos.getRecent&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&format=json&nojsoncallback=1&extras=url_m,url_l,url_o`

        try {
            const response = await axios.get(url)

            const photos = get(response, ['data', 'photos', 'photo'])

            resolve(photos)
        } catch (err: AxiosError | any) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(err.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", err.message)
            }
            console.log(err.config)

            reject(err)
        }
    })
}
