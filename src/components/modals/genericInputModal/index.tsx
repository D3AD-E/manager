import React, { useState } from "react";
import axios from "axios";
import { GenericInputModalProps } from "./types";

export const GenericInputModal = ({ isOpen: show, setIsOpen: setShow, title, label, onSubmit }: GenericInputModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inputValue);
    setShow(false);
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
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputField">{label}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputField"
                      value={inputValue}
                      onChange={handleInputChange}
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
