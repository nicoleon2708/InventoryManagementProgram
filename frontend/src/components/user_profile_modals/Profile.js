import axios from 'axios'
import React, { useEffect, useState } from 'react'
import authHeader from '../../services/auth-header'
import { toast } from 'react-toastify'
import authService from '../../services/auth.service'

const Profile = ({currentUser}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [image, setImage] = useState('')
    const [originImage, setOriginImage] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState('')
    const [initialData, setInitialData] = useState(null)
    
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/auth/user/info/', authHeader())
        .then(res=>{
            setInitialData(res.data);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res.data.email);
            setCompanyName(res.data.company_name);
            setPhone(res.data.phone);
            setCity(res.data.city);
            setDistrict(res.data.district);
            setPostalCode(res.data.postal_code);
            setAddress(res.data.address);
            setImage(res.data.image);
            setOriginImage(res.data.image)
        })
        .catch(err=>console.log(err))
    }, [])

    const updateUserInfor = async (e)=>{
        e.preventDefault()
        setError('')
        if(
            !firstName.trim()|
            !lastName.trim()|
            !companyName.trim()|
            !phone.trim()|
            !city.trim()|
            !district.trim()|
            !postalCode.trim()|
            !address.trim()
        ){
            setError('Please fill all fields to update user information!')
            return
        }
        let formFields = new FormData()
        formFields.append('first_name', firstName)
        formFields.append('last_name', lastName)
        formFields.append('company_name', companyName)
        formFields.append('phone', phone)
        formFields.append('city', city)
        formFields.append('district', district)
        formFields.append('postal_code', postalCode)
        formFields.append('address', address)
        if(image!=null){
            if (typeof image === 'string' && image.startsWith('http')) {
                const fileName = image.split('/').pop(); 
                const fileExtension = fileName.split('.').pop(); 
                fetch(image)
                  .then(response => response.blob())
                  .then(blob => {
                    const file = new File([blob], fileName, { type: `image/${fileExtension}` });
                    formFields.set('image', file);
                  })
                  .catch(err => console.log(err));
              } else {
                formFields.append('image', image);
              }
        }
        await authService.updateInformation(currentUser.id, formFields)
        .then(res=>{
            toast('Update Information successfully!')
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleFileUpload = () => {
        document.getElementById('contained-button-file').click();

      };
    const handleFileChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }   
    }

    const handleResetUploadPicture = (e)=>{
        e.preventDefault()
        setImage(originImage)
    }

    const revertToInitialData = (e) => {
        e.preventDefault()
        if (initialData) {
          setFirstName(initialData.first_name);
          setLastName(initialData.last_name);
          setEmail(initialData.email);
          setCompanyName(initialData.company_name);
          setPhone(initialData.phone);
          setCity(initialData.city);
          setDistrict(initialData.district);
          setPostalCode(initialData.postal_code);
          setAddress(initialData.address);
          setImage(initialData.image);
          setOriginImage(initialData.image);
        }
    };

  return (
    <div>
                            <div className='border-b-[1px] border-solid border-[#d0d1d7]'>
                        <div className=' p-[20px]'>
                            <div>
                                <h4 className='text-[#808d9b]'>Account Details</h4>
                            </div>

                            

                            <div className='flex '>
                                <div className='mr-3 flex items-center justify-center'>
                                    <div className=' w-[100px] h-[100px]'>
                                    {image && (
                                        <img
                                            src={image instanceof URL || !(image instanceof File || image instanceof Blob) ? image : URL.createObjectURL(image)}
                                            className='w-full h-full rounded-lg'
                                            alt='Preview of chosen image'
                                        />
                                    )}
                                    </div>
                                </div>

                                <div className='mt-2'>
                                    <div className='flex'>
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            id="contained-button-file" 
                                            onChange={handleFileChange} 
                                        />
                                        <label htmlFor="contained-button-file">
                                            <button onClick={handleFileUpload} className='rounded-lg mr-3 px-4 py-2 text-white font-bold bg-[#ff792e] hover:opacity-80'>
                                                UPLOAD NEW PHOTO
                                            </button>
                                        </label>
                                        <button onClick={handleResetUploadPicture} className='rounded-lg px-4 py-2 text-[#ff4424] font-bold bg-[#ffe7e3] hover:opacity-80'>
                                            RESET
                                        </button>
                                    </div>

                                    <div className='mt-1 text-[#808d9b]'>
                                        <p>Allowed JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='p-[20px]'>
                        {error && <p className='text-red-600 font-bold'>{error}</p>}

                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>First Name:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400  text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>Last Name:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400 text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={lastName} onChange={(e)=>setLastName(e.target.value)}
                                    />

                            </div>               
                        </div>

                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-2'>
                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>Email:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400  text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={email} onChange={(e)=>setEmail(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>Company Name:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400 text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={companyName} onChange={(e)=>setCompanyName(e.target.value)}
                                    />

                            </div>               
                        </div>

                        

                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-2'>
                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>Phone Number:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400  text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={phone} onChange={(e)=>setPhone(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col'>
                    <label className='mb-2 text-[#acb5bd] font-bold'>City:</label>
                                    <select value={city}   onChange={(e)=>setCity(e.target.value)}
                                    className='border border-gray-400 py-1 px-2 outline-none h-[40px] text-[#acb5bd] rounded-lg'
                                    >
                                        <option value="An Giang">An Giang</option>
                                        <option value="Bac Giang">Bac Giang</option>
                                        <option value="Bac Kan">Bac Kan</option>
                                        <option value="Bac Lieu">Bac Lieu</option>
                                        <option value="Bac Ninh">Bac Ninh</option>
                                        <option value="Ba Ria-Vung Tau">Ba Ria-Vung Tau</option>
                                        <option value="Ben Tre">Ben Tre</option>
                                        <option value="Binh Dinh">Binh Dinh</option>
                                        <option value="Binh Duong">Binh Duong</option>
                                        <option value="Binh Phuoc">Binh Phuoc</option>
                                        <option value="Binh Thuan">Binh Thuan</option>
                                        <option value="Ca Mau">Ca Mau</option>
                                        <option value="Cao Bang">Cao Bang</option>
                                        <option value="Dac Lak">Dac Lak</option>
                                        <option value="Dac Nong">Dac Nong</option>
                                        <option value="Dien Bien">Dien Bien</option>
                                        <option value="Dong Nai">Dong Nai</option>
                                        <option value="Dong Thap">Dong Thap</option>
                                        <option value="Gia Lai">Gia Lai</option>
                                        <option value="Ha Giang">Ha Giang</option>
                                        <option value="Hai Duong">Hai Duong</option>
                                        <option value="Ha Nam">Ha Nam</option>
                                        <option value="Ha Tay">Ha Tay</option>
                                        <option value="Ha Tinh">Ha Tinh</option>
                                        <option value="Hau Giang">Hau Giang</option>
                                        <option value="Hoa Binh">Hoa Binh</option>
                                        <option value="Hung Yen">Hung Yen</option>
                                        <option value="Khanh Hoa">Khanh Hoa</option>
                                        <option value="Kien Giang">Kien Giang</option>
                                        <option value="Kon Tum">Kon Tum</option>
                                        <option value="Lai Chau">Lai Chau</option>
                                        <option value="Lam Dong">Lam Dong</option>
                                        <option value="Lang Son">Lang Son</option>
                                        <option value="Lao Cai">Lao Cai</option>
                                        <option value="Long An">Long An</option>
                                        <option value="Nam Dinh">Nam Dinh</option>
                                        <option value="Nghe An">Nghe An</option>
                                        <option value="Ninh Binh">Ninh Binh</option>
                                        <option value="Ninh Thuan">Ninh Thuan</option>
                                        <option value="Phu Tho">Phu Tho</option>
                                        <option value="Phu Yen">Phu Yen</option>
                                        <option value="Quang Binh">Quang Binh</option>
                                        <option value="Quang Nam">Quang Nam</option>
                                        <option value="Quang Ngai">Quang Ngai</option>
                                        <option value="Quang Ninh">Quang Ninh</option>
                                        <option value="Quang Tri">Quang Tri</option>
                                        <option value="Soc Trang">Soc Trang</option>
                                        <option value="Son La">Son La</option>
                                        <option value="Tay Ninh">Tay Ninh</option>
                                        <option value="Thai Binh">Thai Binh</option>
                                        <option value="Thai Nguyen">Thai Nguyen</option>
                                        <option value="Thanh Hoa">Thanh Hoa</option>
                                        <option value="Thua Thien-Hue">Thua Thien-Hue</option>
                                        <option value="Tien Giang">Tien Giang</option>
                                        <option value="Tra Vinh">Tra Vinh</option>
                                        <option value="Tuyen Quang">Tuyen Quang</option>
                                        <option value="Vinh Long">Vinh Long</option>
                                        <option value="Vinh Phuc">Vinh Phuc</option>
                                        <option value="Yen Bai">Yen Bai</option>
                                        <option value="Can Tho">Can Tho</option>
                                        <option value="Da Nang">Da Nang</option>
                                        <option value="Hai Phong">Hai Phong</option>
                                        <option value="Hanoi">Hanoi</option>
                                        <option value="Ho Chi Minh">Ho Chi Minh</option>
                                    </select>
                            </div>           
                        </div>

                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mt-2'>
                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>District:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400  text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={district} onChange={(e)=>setDistrict(e.target.value)}
                                    />

                            </div>

                            <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>Postal Code:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400 text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}
                                    />

                            </div>               
                        </div>

                        <div className='flex flex-col'>
                                    <label className='mb-2 text-[#acb5bd] font-bold'>Address:</label>
                                    <input type='text' placeholder=''
                                        className='border border-gray-400 text-[#acb5bd] py-1 px-2 outline-none rounded-lg h-[40px] '
                                        value={address} onChange={(e)=>setAddress(e.target.value)}
                                    />

                            </div>  
                    </div>

                    <div className='py-[15px] px-[20px]'>
                        <button onClick={updateUserInfor} className='bg-[#ff792e] mr-3 hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                            Save Changes
                        </button>
                        <button onClick={revertToInitialData} className='bg-[#637381] hover:opacity-80 text-white px-5 py-2 rounded-lg'>
                            Reset
                        </button>
                    </div> 

    </div>
  )
}

export default Profile
