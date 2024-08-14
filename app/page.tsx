"use client"
import { TypeAnimation } from 'react-type-animation';
import { LogInIcon, TentTree } from 'lucide-react';
import Image from 'next/image';
import undraw_runner2 from '@/public/images/undraw_runner_start_x-0-uu.svg';
import undraw_runner from '@/public/images/undraw_different_love_a-3-rg.svg';
import undraw_hiking from '@/public/images/undraw_hiking_re_k0bc.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';


export default async function Page() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    <div className="w-screen h-screen bg-slate-500 flex flex-col relative">
      <div className='relative'>
        <a href="/login">
          <motion.div
            whileHover={{
              opacity: 0.6,
            }}
          >
            <LogInIcon className='absolute top-0 right-0 h-12 w-12 mt-[2vh] mr-[2vw]' />
          </motion.div>
        </a>
      </div>
      <div className='relative flex flex-col mt-auto ml-auto mr-auto font-absans'>
        <h1 className=" text-4xl md:text-6xl lg:text-9xl">WELCOME TO ARTEMIOS</h1>
        <TypeAnimation
          speed={55}
          sequence={[
            "We're so glad you could make it!",
            1000,
            "We're so glad you could make it!\nWe're here to help you grow! ",
          ]}
          wrapper="span" cursor={false} repeat={0} style={{ fontSize: '2em', display: 'inline-block', fontFamily: 'absans-regular', whiteSpace: 'pre-line', height: '195px' }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 2 }}
          >
            <motion.button
              className="bg-transparent  text-black py-2 px-4 border-2 border-black rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }} // This transition only applies to the hover effect
            >
              Get started
            </motion.button>
          </motion.div>
      </div>

      <div className="relative flex flex-col w-auto justify-center items-center h-auto mb-[2vh]">
          <Image src={undraw_runner} alt="Runner" className='responsive-image mx-auto opacity-75' />
        </div>

    </div >
    </>
  );
}

