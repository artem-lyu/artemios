"use client"
import { TypeAnimation } from 'react-type-animation';
import { LogInIcon, TentTree } from 'lucide-react';
import Image from 'next/image';
import undraw_runner2 from '@/public/images/undraw_runner_start_x-0-uu.svg';
import undraw_runner from '@/public/images/undraw_different_love_a-3-rg.svg';
import undraw_hiking from '@/public/images/undraw_hiking_re_k0bc.svg';
import different_love from '@/public/images/undraw_different_love.png'
import { motion } from 'framer-motion';
import { useState } from 'react';


export default async function Page() {

  return (
    <div className=" bg-slate-500 flex h-screen flex-1 relative ">
      <div className='relative flex flex-1 flex-col mx-[6vw] my-[6vh] font-absans'>

        <div className="flex justify-between items-start ">
          <h1 className="text-4xl md:text-6xl lg:text-9xl">WELCOME TO ARTEMIOS</h1>
          <a href="/dashboard/landing">
            <motion.div
              whileHover={{
                opacity: 0.6,
              }}
            >
              <LogInIcon className='h-12 w-12' />
            </motion.div>
          </a>
        </div>
        <TypeAnimation
          speed={55}
          className="text-xl md:text-2xl lg:text-3xl"
          sequence={[
            "We're so glad you could make it!",
            1000,
            "We're so glad you could make it!\nWe're here to help you grow. ",
          ]}
          wrapper="span" cursor={false} repeat={0} style={{ display: 'inline-block', fontFamily: 'absans-regular', whiteSpace: 'pre-line', height: '195px' }} />

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
        <div className='flex flex-1 items-end justify-end'>
          <p className='max-w-xl text-left mx-4 my-4 text-2xl rounded-lg p-5'>ARTEMIOS is a powerful tool for anyone looking to gain a deeper understanding of their emotional health. By providing personalized insights and an engaging user experience, we help users take proactive steps towards improving their emotional well-being.</p>
        </div>
      </div>
    </div >
  );
}

