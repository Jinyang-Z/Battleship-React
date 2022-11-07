import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from '../pages/landing/Landing';
import SignIn from '../pages/signin/SignIn';
import SignUp from '../pages/signup/SignUp';
import Rooms from '../pages/rooms/Rooms';
import Room from '../pages/rooms/Room';
import NotFound from '../components/404/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
