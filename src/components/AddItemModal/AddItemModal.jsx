// const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
//   function handleSubmit(e) {}

//   return <ModalWithForm></ModalWithForm>;
// };

// export default AddItemModal;

// import React from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";

// const AddItemModal = ({ closeActiveModal, activeModal, isOpen }) => {
//   return (
//     <ModalWithForm
//       title="New garment"
//       buttonText="Add garment"
//       activeModal={activeModal}
//       onClose={closeActiveModal}
//       isOpen={activeModal === isOpen}
//       onSubmit={AddItemModal}
//       //isOpen={activeModal === "add-garment"}
//     >
//       <label htmlFor="name" className="modal__label">
//         Name{" "}
//         <input
//           type="text"
//           className="modal__input"
//           id="name"
//           placeholder="Name"
//         />
//       </label>
//       <label htmlFor="imageUrl" className="modal__label">
//         Image{" "}
//         <input
//           type="url"
//           className="modal__input"
//           id="imageUrl"
//           placeholder="Image URL"
//         />
//       </label>
//       <fieldset className="modal__radio-buttons">
//         <legend className="modal__legend">Select the weather type:</legend>
//         <label htmlFor="Hot" className="modal__label modal__label_type_radio">
//           <input
//             id="Hot"
//             type="radio"
//             name="weather"
//             className="modal__radio-input"
//           />
//           Hot
//         </label>
//         <label htmlFor="Warm" className="modal__label modal__label_type_radio">
//           <input
//             id="Warm"
//             type="radio"
//             name="weather"
//             className="modal__radio-input"
//           />
//           Warm
//         </label>
//         <label htmlFor="Cold" className="modal__label modal__label_type_radio">
//           <input
//             id="Cold"
//             type="radio"
//             name="weather"
//             className="modal__radio-input"
//           />
//           Cold
//         </label>
//       </fieldset>
//     </ModalWithForm>
//   );
// };

// export default AddItemModal;
