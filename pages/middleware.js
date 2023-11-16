import React ,{ useEffect, useState } from 'react';
import { NextResponse } from 'next/server';
import axios from 'axios';

export function middleware() {
  const [ok, setOk] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data !== null) {
      setToken(data);
    }

    const authCheck = async () => {
      const res = await axios.get('/api/v1/auth/admin-auth', {
        headers: { Authorization: token },
      });

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (token) {
      authCheck();
    }
  }, [token]);
  if(request.nextUrl.pathname==="/admindashboard"){
    
    return NextResponse.redirect(new URL('/signup', request.url))
  }    
}