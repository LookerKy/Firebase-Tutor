import React from 'react';
import { AuthService } from '../firebaseInstance';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onSignOutClick = async () => {
    await AuthService.signOut();
    history.push('/');
  };
  return (
    <>
      <div>Profile</div>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
};

export default Profile;
