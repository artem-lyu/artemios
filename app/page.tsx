"use client"
import { TypeAnimation } from 'react-type-animation';

export default async function Page() {


  return (
    <div className="w-screen h-screen bg-slate-500">
      <div className="">
        <h1 className="font-absans text-9xl align-middle">WELCOME</h1>
        <TypeAnimation
          sequence={[
            "We're so glad you could make it!\nWe're here to help you grow",
            () => {
              console.log('Sequence completed');
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={1}
          style={{ fontSize: '3em', display: 'inline-block', fontFamily: 'absans-regular', whiteSpace: 'pre-line', height: '195px' }}
        />
      </div>
    </div>
  );
}
