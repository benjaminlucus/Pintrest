"use client"

import Form from '@/components/Form'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Create = () => {
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Please register or login First!!")
      signIn();
    }
  }, [status]);

  return (
    <div>
      <Form />
    </div>
  )
}

export default Create