import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { USERS, updateUser } from '../../firebase/index';
import firebase from '../../firebase/clientApp';


import { useUser } from '../components/user-context';
import LoadingError from '../components/LoadingError';
import Card from '../components/Card';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  const { user } = useUser();
  const { uid } = useParams();

  const db = firebase.firestore();

  const [userDoc, loading, error] = useDocumentData(
    db.collection(USERS).doc(uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // Check the admin status of the Logged In user
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    if (user) {
      db.collection(USERS)
        .doc(user.uid)
        .get()
        .then((currentUser) => {setAdminMode(currentUser.data().isAdmin); });
    }
  }, []);

  const handleChange = () => {    
    if(adminMode){
      updateUser(userDoc.uid, {isAdmin: !userDoc.isAdmin});
      toast.success(`${userDoc.displayName} is now ${!userDoc.isAdmin ? "an Adminstrator" : "a General User"} `);
    }else{
      toast.error(`Oops, you need Administrator status to perform that action`);
    }
  }
  
  return (
    <main>
      <Card>
        <h1 className="text-2xl leading-6 font-medium text-gray-900">
          {`Edit ${userDoc?.uid === user.uid ? 'your' : 'user'} profile`}
        </h1>
      </Card>

      <LoadingError data={userDoc} loading={loading} error={error}>
        {userDoc && (
          <>
            <Card>
              <ProfileForm
                userDoc={userDoc}
                isCurrentUser={userDoc.uid === user.uid}
                adminMode={adminMode}
              />
            </Card>
          </>
        )}
      </LoadingError>

      <Card>
        <div className="flex justify-center">
          <button type='button' className= {`ml-3 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${adminMode? 'bg-indigo-500 hover:bg-indigo-700' : 'bg-gray-400'}`}  
            onClick={() => {handleChange()}}>
          Switch User Status
          </button>
        </div>
      </Card>
    </main>
  );
};

export default Profile;
