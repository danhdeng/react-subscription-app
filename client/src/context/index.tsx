import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { initialTrueState, initialFalseState } from '../constants';

interface User {
  data: {
    id: string;
    email: string;
    stripeCustomerId: string;
  } | null;
  error: string | null;
  loading: boolean;
}

// const initialTrueState={
//     data: null,
//     loading: true,
//     error: null
// };

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([initialTrueState, () => {}]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(initialTrueState);
  const token = localStorage.getItem('react_sub_token');
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }
  const fetchUser = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/me`
    );
    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
          stripeCustomerId: response.data.user.stripeCustomerId,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: response.data.errors.map((item: any, i: number) => {
          return <li key={i}>{item.msg}</li>;
        }),
      });
    }
  };
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(initialFalseState);
    }
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
