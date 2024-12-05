import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const cv = useSelector((state) => state.cv);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); // Hvis ikke autentisert, gå til login
    } else {
      dispatch(fetchUserCV(user.id)); // Hent brukerens CV basert på ID
    }
  }, [dispatch, navigate, user]);

  const handleUpdateCV = (updatedCV) => {
    dispatch(updateUserCV(updatedCV)); // Oppdater brukerens CV
  };

  return (
    <div>
      <h1>Min CV</h1>
      <p>{cv.name}</p>
      <button onClick={() => handleUpdateCV({ name: 'Updated Name' })}>Oppdater</button>
    </div>
  );
};

export default UserProfilePage;
