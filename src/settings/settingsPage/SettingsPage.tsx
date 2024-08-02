import React, { useState } from "react";

const ProfileSettingsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-link" onClick={handleOpenModal}>
        Profile Settings
      </button>

      {showModal && (
        <div
          className="modal fade show d-block"
          id="profileSettingsModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="profileSettingsModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="profileSettingsModalLabel">
                  Profile Settings
                </h5>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row mb-3">
                    <div className="col">
                      <strong>Name:</strong>
                      <div>{"backendData.name"}</div>
                    </div>
                    <div className="col">
                      <strong>Surname:</strong> {"backendData.surname"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <strong>Email:</strong>
                      <div> {"backendData.email"}</div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <ChangePasswordModal />

                      <ChangePictureModal />
                    </div>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChangePasswordModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-link" onClick={handleOpenModal}>
        Change password
      </button>

      {showModal && (
        <div
          className="modal fade show d-block"
          id="changePasswordModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="changePasswordModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changePasswordModalLabel">
                  Change Password
                </h5>
              </div>
              <div className="modal-body">
                {/* Password change form */}
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="repeatNewPassword">Repeat New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="repeatNewPassword"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChangePictureModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-link" onClick={handleOpenModal}>
        Change profile picture
      </button>

      {showModal && (
        <div
          className="modal fade show d-block"
          id="changePictureModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="changePictureModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="changePictureModalLabel">
                  Change Profile Picture
                </h5>
              </div>
              <div className="modal-body">
                {/* Display current avatar image */}
                <img
                  src={"backendData.avatarUrl"}
                  alt="Current Avatar"
                  className="img-fluid mb-3 min-width-100 min-height-100"
                />
                {/* Button to upload new image */}
                <div className="d-flex justify-content-center align-items-center bgcolor-red">
                  {" "}
                  <br />
                  <button className="btn btn-primary">Upload New Image</button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsPage;
