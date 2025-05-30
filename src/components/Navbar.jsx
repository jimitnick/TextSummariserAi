import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log("Sign out error", error);
        });
    }
  };

  return (
    <div className='navbar flex w-[80%] rounded-2xl shadow-sm border-white shadow-white h-[80px] justify-between items-center p-5'>
      <div className='flex gap-4'>
        <div className='h-[30px] w-[30px] rounded-full object-cover'>
          <img src={props.profilePicture} alt=""/>
        </div>
        <h1 className='text-white text-2xl'>Hi 👋, {props.displayName}</h1>
      </div>
      
      <div>
        <button
          className='text-black bg-white px-4 py-3 rounded-xl cursor-pointer hover:bg-zinc-800 hover:text-white hover:border-1 hover:border-white transition ease-in-out'
          onClick={handleLogout}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
