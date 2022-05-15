import React, { useState } from 'react';
import useSendGETAPI from '../../shared/hooks/useSendGETAPI/useSendGETAPI';

const ProfilePage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('USERID'));
  const convertResponseToData = (response) => ({
    id: response.data.id,
    name: response.data.name,
  });

  const { isLoading, data, errorMessage } = useSendGETAPI({
    id: null,
    name: null,
    weight: null,
    frontImage: null,
    backImage: null
  }, `https://60dff0ba6b689e001788c858.mockapi.io/users/${ userId }`, convertResponseToData);
  const user = data;

  if (errorMessage) return <div style={{ color: 'red' }}>{errorMessage}</div>
  return (
    <div>
      <div><h3>ProfilePage</h3></div>
      <br></br>
      <div>Name: {user.name} </div>
      <div>UserID: {user.id} </div>
    </div>
  );
};

export default ProfilePage;
