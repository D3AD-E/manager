import React, { useState } from "react";
import axios from "axios";
import { TokenModalProps } from "./types";

export const TokenModal = ({ show, setShow, handleSuccess }: TokenModalProps) => {
  const [name, setName] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleContractAddressChange = (e: any) => {
    setContractAddress(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("token/create/", {
        name: name,
        contract: contractAddress
      })
      .then((response) => {
        setName("");
        setContractAddress("");
        handleSuccess();
      });
  };

  return (
    <div>
      {show && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new token</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputField">Token name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputField"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputField">Contract</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputField"
                      value={contractAddress}
                      onChange={handleContractAddressChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
