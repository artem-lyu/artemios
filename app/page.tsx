"use client"
import { TypeAnimation } from 'react-type-animation';
import { LogInIcon, TentTree } from 'lucide-react';
import Image from 'next/image';
import undraw_runner2 from '@/public/images/undraw_runner_start_x-0-uu.svg';
import undraw_hiking from '@/public/images/undraw_hiking_re_k0bc.svg';
import { motion } from 'framer-motion';


export default async function Page() {


  return (
    <div className="w-screen h-screen bg-slate-500">
      <a href="/login">
        <LogInIcon className='absolute top-0 right-0 h-24 w-24 px-4 py-4 mt-24 mr-24' />
      </a>
      <div className='mt-24 ml-24 mr-24 font-absans pr-[calc(50%-200px)]'>
        <h1 className=" text-9xl">WELCOME</h1>

        <TypeAnimation
          speed={55}
          sequence={[
            "We're so glad you could make it!",
            1000,
            "We're so glad you could make it!\nWe're here to help you grow! ",
            () => {
              console.log('Sequence completed');
            },
          ]}
          wrapper="span" cursor={true} repeat={1} style={{ fontSize: '2em', display: 'inline-block', fontFamily: 'absans-regular', whiteSpace: 'pre-line', height: '195px' }} />

        <div className='mt-8 mr-96 flex justify-center font-absans'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
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

        <div className=" absolute px-32 right-0 top-1/2 transform -translate-y-1/2 mr-24">
          <Image src={undraw_hiking} alt="Runner" className='opacity-75' />
        </div>

      </div>
    </div >
  );
}

