import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import styled from "styled-components";
import Btn from "../../../components/Btn/Btn";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

const NinInput = styled.input`
  width: 60%;
  text-align: center;
  font-size: 27px;
  border-radius: 10px;
  border: 1px solid greenyellow;
  height: 2em;
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

export default function ValidIdCard() {
  const [nin, setNin] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showUserData, setShowUserData] = useState(false);
  const [ninData, setNinData] = useState(null);
  const handleSubmit = () => {
    setLoading(true);
    axios(process.env.REACT_APP_API_URL + "/sheruta/verify-nin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: {
        nin,
        firstname: user.user.first_name,
        lastname: user.user.last_name,
      },
    })
      .then((res) => {
        setNinData(res.data);
        setLoading(false);
        setShowUserData(true);
        console.log(user.user);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="sec-heading center mt-3">
        <h2 className="animated animate__bounceIn">
          National Identification Number
        </h2>
        <p>Identity verification for security reasons.</p>
      </div>
      <Modal show={showUserData && ninData}>
        {ninData && (
          <Modal.Body>
            <h2 className="text-center">Please Verify This Is You</h2>
            <img
              src={user.user.avatar_url}
              width="200"
              className="rounded mt-4"
            />
            <div>
              <h5 className="mt-3">
                <b>Name: </b>
                {ninData.title +
                  " " +
                  ninData.firstname +
                  " " +
                  ninData.lastname}
              </h5>
              <h5 className="mt-3">
                <b>Date Of Birth: </b>
                {ninData.birthdate}
              </h5>
              <h5 className="mt-3">
                <b>Religion: </b>
                {ninData.religion}
              </h5>
              <h5 className="mt-3">
                <b>Spoken Language: </b>
                {ninData.ospokenlang}
              </h5>
              <h5 className="mt-3">
                <b>Native Language: </b>
                {ninData.nspokenlang}
              </h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <Btn text="Yes" />
              <Btn text="No" danger onClick={() => setShowUserData(false)} />
            </div>
          </Modal.Body>
        )}
      </Modal>
      <div className="container">
        <div className="d-flex justify-content-center mb-5 mt-5">
          <NinInput
            placeholder="Ex. 10000000001"
            type="number"
            className="form-control"
            onChange={(e) => setNin(e.target.value)}
            autoFocus
            disabled={loading}
          />
        </div>
        <div className="text-center">
          <b className={`${nin.length > 11 ? "text-danger" : ""}`}>
            {11 - nin.length}
          </b>
          <br />
          {nin.length > 11 ? (
            <small className="text-danger">
              Invalid Identity Length, should be 11 characters
            </small>
          ) : null}
        </div>
      </div>
      <hr />
      <div className="text-center">
        <Btn
          className="mb-4 w-50"
          text="Finish"
          disabled={nin.length < 11 || nin.length > 11}
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
// import { notification } from "antd";
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import Btn from "../../../components/Btn/Btn";
// import { storage } from "../../../Firebase";
// import { compressImage } from "../../../utils/Sheruta";
// import Compressor from "compressorjs";
// import { ProgressBar } from "react-bootstrap";
// import axios from "axios";

// const ValidIdCard = (props) => {
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [frontImageURL, setFrontImageURL] = useState(null);
//   const [backImageURL, setBackImageURL] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const { user, jwt } = props.auth.user;

//   const upload = (image) => {
//     if (image === 1) {
//       document.getElementById("1").click();
//     }
//     if (image === 2) {
//       document.getElementById("2").click();
//     }
//   };

//   async function handleSelected(e, img) {
//     const file = e.target.files[0];
//     if (img === 1) {
//       new Compressor(file, {
//         quality: 0.2,
//         success: (compressedResult) => {
//           setFrontImage(compressedResult);
//         },
//       });
//     } else {
//       new Compressor(file, {
//         quality: 0.2,
//         success: (compressedResult) => {
//           setBackImage(compressedResult);
//         },
//       });
//     }
//   }

//   const sendToDb = () => {
//     axios(process.env.REACT_APP_API_URL + "/personal-infos/" + props.info.id, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${props.auth.user.jwt}`,
//       },
//       data: {
//         id_back_img_url: backImageURL,
//         id_front_img_url: frontImageURL,
//       },
//     })
//       .then((res) => {
//         console.log('RES --', res)
//         props.setStep(props.step + 1);
//       })
//       .catch((err) => {
//         notification.error({ message: "Error uploading images" });
//       });
//   };

//   useEffect(() => {
//     if (frontImageURL && backImageURL) {
//       sendToDb(frontImageURL, backImageURL)
//     }
//   }, [frontImageURL, backImageURL])

//   const handleImageUpload = () => {
//     setUploading(true);

//     [frontImage, backImage].forEach((file, i) => {
//       var uploadTask = storage
//         .child(`images/id_card/${user.id}/image_${i}`)
//         .put(file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           console.log(
//             "PROGRESS ---",
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//           var _progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setProgress(_progress);
//           // console.log("Upload is " + progress + "% done");
//         },
//         (error) => {
//           // Handle unsuccessful uploads
//           setUploading(false);
//           notification.error({ message: "Upload Error" });
//         },
//         () => {
//           // Handle successful uploads on complete
//           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//             console.log({
//               downloadURL,
//               i
//             })
//             if (i === 1) {
//               setFrontImageURL(downloadURL);
//             } else {
//               setBackImageURL(downloadURL);
//               setUploading(false);
//               // sendToDb();
//             }
//           });
//         }
//       );
//     });
//   };
//   return (
//     <div>
//       <div className="sec-heading center">
//         <h2 className="animated animate__bounceIn">Upload valid ID Card</h2>
//         <p>Take a picture of the font and back side of your ID card</p>
//       </div>
//       <div className="row justify-content-center mb-5 mt-5">
//         <div className="col-md-4 col-11 mb-4">
//           {frontImage ? (
//             <div className="text-center">
//               <img
//                 className="rounded"
//                 width="100%"
//                 height="150px"
//                 style={{ height: '200px'}}
//                 src={URL.createObjectURL(frontImage)}
//               />
//               <button
//                 className="btn text-danger btn-sm"
//                 disabled={uploading}
//                 onClick={() => setFrontImage(null)}
//               >
//                 Remove <i className="ti-trash"></i>
//               </button>
//             </div>
//           ) : (
//             <>
//               <button
//                 className="btn btn-lg text-theme w-100 rounded"
//                 style={{ height: "150px" }}
//                 id="plus"
//                 onClick={() => upload(1)}
//               >
//                 Front Image +
//               </button>
//               <input
//                 id="1"
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleSelected(e, 1)}
//               />
//             </>
//           )}
//         </div>
//         <div className="col-md-4 col-11 mb-4">
//           {backImage ? (
//             <div className="text-center">
//               <img
//                 className="rounded"
//                 width="100%"
//                 height="150px"
//                 style={{ height: '200px'}}
//                 src={URL.createObjectURL(backImage)}
//               />
//               <button
//                 className="btn text-danger btn-sm"
//                 disabled={uploading}
//                 onClick={() => setBackImage(null)}
//               >
//                 Remove <i className="ti-trash"></i>
//               </button>
//             </div>
//           ) : (
//             <>
//               <button
//                 className="btn btn-lg text-theme w-100 rounded"
//                 style={{ height: "150px" }}
//                 id="plus"
//                 onClick={() => upload(2)}
//               >
//                 Back Image +
//               </button>
//               <input
//                 id="2"
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleSelected(e, 2)}
//               />
//             </>
//           )}
//         </div>
//       </div>
//       <hr />
//       <div className="text-center">
//         {progress > 0 ? <ProgressBar now={progress} variant="success" /> : null}
//         <Btn
//           className="mb-4 w-50"
//           text="Finish"
//           disabled={!frontImage || !backImage}
//           loading={uploading}
//           onClick={handleImageUpload}
//         />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(ValidIdCard);
