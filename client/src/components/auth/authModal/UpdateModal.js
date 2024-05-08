import React, { useState, useEffect  } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { userUpdateProfile } from '../../../actions/authActions/authActions';


const UpdateModal = () => {
    const handleCloseModal = () => setUserUpdateModal(false);
    const handleOpenModal = () => setUserUpdateModal(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [UserUpdateModal, setUserUpdateModal] = useState(false);

    const dispatch = useDispatch();

	const user_Login = useSelector((state) => state.user_Login);
	const { userInfo } = user_Login;

	const user_Update = useSelector((state) => state.user_Update);
	const { loading, error } = user_Update;

    useEffect(() => {
		setName(userInfo.name);
		setEmail(userInfo.email);
        
	}, [userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userUpdatedInfo = {
            name,
            email,
            password,
        };
        dispatch(userUpdateProfile(userUpdatedInfo));
    };

  return (
    <>
      <button type="button" className="btn btn-outline-primary ms-1" onClick={handleOpenModal}>
        <i className="bi bi-pencil-square"></i> Edit
      </button>

      {UserUpdateModal && (
        <div className="modal" id="exampleModalToggle2" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content p-3">
              <div className="m-3 d-flex justify-content-end">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
              </div>

              <div className="modal-body text-center">
                <h3 className="fw-bold mb-2 text-uppercase">Update Profile</h3>

                <form onSubmit={handleSubmit}>
                  <div className="m-4">
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="name" placeholder="" value={name} onChange={(e) => setName(e.target.value)} required />
                      <label htmlFor="name">Full name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="email" placeholder="name@example.com"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                      <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  <button className="btn btn-outline-dark m-2" type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateModal;
