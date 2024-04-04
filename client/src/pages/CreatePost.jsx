import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
    const navigate = useNavigate();
    const[file, setFile] =useState(null);
    const[imageFileUploadProgress, setImageFileUploadProgress] =useState(null);
    const[imageFileUploadError, setImageFileUploadError] = useState(null);
    const[imageFileUploading, setImageFileUploading] = useState(false);
    const[publishError, setPublishError] = useState(null);
    const[formData, setFormData] = useState({});
    const handleUpload = async () => {
         try {
           if(!file){
            setImageFileUploadError('Please select an image');
            return;
           } 
           setImageFileUploadError(null);
           setImageFileUploading(true);
           const storage = getStorage(app);
           const fileName = new Date().getTime() + '-' + file.name;
           const storageRef = ref(storage, fileName);
           const uploadTask = uploadBytesResumable(storageRef, file);
           uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
              setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Image upload failed');
                setImageFileUploadProgress(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUploadProgress(null);
                    setImageFileUploadError(null);
                    setImageFileUploading(false);
                    setFormData({...formData, image : downloadURL});
                });
            }
           );
         } catch (error) {
            setImageFileUploadError('Image upload failed');
            setImageFileUploadProgress(null);
            console.log(error);
         }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong')
        }
    }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
        <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">

                <TextInput 
                    type='text' 
                    placeholder='title' 
                    required is='title' 
                    className='flex-1'  
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <Select 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="uncategorized">Select a category</option>
                    <option value="pattern">Crotchet  pattern</option>
                    <option value="techniques">Crotchet techniques</option>
                    <option value="yarn">Crotchet yarn</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput 
                    type='file' 
                    accept='images/*' 
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button 
                    type='button' 
                    gradientDuoTone='purpleToBlue' 
                    size='sm' outline 
                    onClick={handleUpload} 
                    disabled={imageFileUploading}
                >
                    {imageFileUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar value={imageFileUploadProgress } text={`${imageFileUploadProgress || 0}%`}/>
                        </div>
                    ) :('Upload immage')
                    }
                </Button>
            </div>
            { imageFileUploadError && (
                <Alert color='failure'>
                    {imageFileUploadError}
                </Alert>
            )}
            {formData.image && (
                <img
                    src={formData.image}
                    alt='upload'
                    className='w-full h-72 mb-12'
                />
            )}
            <ReactQuill 
                theme='snow' 
                placeholder='Write something...'  
                className='h-72 mb-12' 
                required
                onChange={(value) => {
                    setFormData({...formData, content: value})
                }}
            />
            <Button 
                type='submit' 
                gradientDuoTone='purpleToPink'
            >
                Publish
            </Button>
            {publishError && (
            <Alert className='mt-5' color='failure'>
                {publishError}
            </Alert>
        )}
        </form>
    </div>
  )
}
