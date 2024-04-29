import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import axios from 'axios'
import { Loader } from 'lucide-react'
import CompareSlider from './CompareSlider'
import Download from './Download'
  
function Modal() {
    const [file,setFile] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [oldImage,setOldImage] = useState(null)
    const [newImage,setNewImage] = useState(null)

    function handleChange (event){
        setNewImage(null)
        setOldImage(null)
        const file = event.target.files[0]
        setFile(file)
    }

    async function handleSubmit (event){
        event.preventDefault()
        setIsLoading(true);
        try {
            if(!file) return 
            const formData = new FormData();
            formData.append('image',file);
            const {data} = await axios.post('/api/remove-bg',formData,{
                headers:'Content-Type:multipart/form-data',
            })
            setNewImage(data.newOne);
            setOldImage(data.oldOne);
        } catch (error) {
            console.error(error);
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload Now</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Upload image to proceed</DialogTitle>
        <DialogDescription>
            Uploading your files is an irreversible action. This will initiate the upload process and transfer your data to our servers.
        </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
            <Input onChange={handleChange} type="file" accept="image/*"/>
            { file&& !newImage &&
                <img src={URL.createObjectURL(file)} alt="Your current image" style={{maxWidth:"50%", height:"50%", marginBottom:"10px"}} />
            }
            <Button disabled={isLoading} type="submit" className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {isLoading ? <span className='flex flex-row space-x-4'><Loader size={20} className='animate-spin'/>  <span>Removing Background</span> </span> : 'Remove Background'}
            </Button>
        </form>
        { newImage && oldImage && 
            <>
                <CompareSlider oldImage={oldImage} newImage={newImage}/>
                <Download url={newImage}/>
            </>     
        }
    </DialogContent>
    </Dialog>
  )
}

export default Modal