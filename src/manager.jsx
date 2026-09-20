import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });

    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) { setPasswordArray(JSON.parse(passwords)) }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        navigator.clipboard.writeText(text)
    }
    const showPassword = () => {
        passwordRef.current.type = "text";
        console.log(ref.current.src);
        if (ref.current.src.includes('src/eyecross2.png')) {
            ref.current.src = 'src/eye.png';
            passwordRef.current.type = "text";


        } else {
            ref.current.src = 'src/eyecross2.png';
            passwordRef.current.type = "password";

        }
    }
  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3 ){

        toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
    }else{

        toast('Error: Required data');
    }
    const newEntry = { ...form, id: uuidv4() };
    const newPasswordArray = [...passwordArray, newEntry];

    setPasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));

    setform({ site: "", username: "", password: "" });
}
    const deletePassword = (id) => {
        console.log("Delete password with id: ", id)
        let c = confirm("Do u really want to delete the password? ")

        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!== id)))

            toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
        }
            
        
    }
    const editPassword = (id) => {
        console.log("Editing password with id: ", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div></div>
            </div>
            <div className=' md:p-1 md: p-1 mycontainer'>
                <h1 className='text-4xl text font-bold text-center'>

                    <span className='text-green-600'>&lt;</span>
                    <span></span>Pass<span className='text-green-600'>OP/&gt;</span>

                </h1>
                <p className=' text-green-900 text-center text-1xl text font-bold'>Your Own Password Manager</p>

                <div className=" flex flex-col p-4 gap-3 text-black items-center">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text " name="site" id="site" />

                    <div className='flex flex-col md:flex-row w-full justify-center gap-3 '>

                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="text " name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1 text-black' type="password " name="password" id="passwoed" />
                            <span className='absolute cursor-pointer right-[2px] top-[2px] ' onClick={showPassword}>

                                <img ref={ref} className='size-8 p-1 width={26}' src="src/eye.png " alt="image" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className=' gap-2 cursor-pointer rounded-full px-5 py-1 text-center flex justify-center items-center bg-green-200 hover:bg-green-300 w-fit border border-green-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">

                        </lord-icon>Save Password

                    </button>

                </div>

                <div className='passwords'>
                    <h2 className='text font-bold text-2xl flex justify-center'>Your Passwords </h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Sites</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 rounded-2xl'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className="border border-white text-center py-1">
                                        <div className='flex justify-center items-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy cursor-pointer size-2' onClick={() => copyText(item.site)}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "15px", "paddingLeft": "2px"}}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-white text-center py-1">
                                        <div className='flex justify-center items-center'>

                                            <span>{item.username}</span>
                                            <div className='lordiconcopy cursor-pointer size-2' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "15px", "paddingLeft": "2px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="border border-white text-center py-1">
                                        <div className='flex justify-center items-center'>

                                            <span>{item.password}</span>
                                            <div className='lordiconcopy cursor-pointer size-2' onClick={() => copyText(item.password)}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "15px", "paddingLeft": "2px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center border border-white'>

                                        <span className='cursor-pointer' onClick={()=> {editPassword(item.id)}}>
                                             <lord-icon
                                                    style={{ "width": "20px", "height": "15px", "paddingLeft": "2px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                        </span>
                                        <span className='cursor-pointer' onClick={()=> {deletePassword(item.id)}}>

                                             <lord-icon 
                                                    style={{ "width": "20px", "height": "15px", "paddingLeft": "2px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                        </span>
                                
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default manager
