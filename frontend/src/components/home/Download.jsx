import React from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
function Download({url}) {
    async function handleDownload (){
        const response = await axios({
            url:url,
            method:'GET',
            responseType:'blob',
        })
        const imageUrl = window.URL.createObjectURL(new Blob([response.data]))

        const link = document.createElement('a')
        link.href = imageUrl

        link.setAttribute('download','processedImage.png')
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(imageUrl)
    }
  return (
    <Button className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDownload} >Download</Button>
    )
}

export default Download