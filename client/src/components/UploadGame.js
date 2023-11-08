import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UploadCard() {
    const [newTitle, setNewTitle] = useState("");
    const [newPlatform, setNewPlatform] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [newImage, setNewImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(errors, "useEffect")
    }, [errors]);

    function handleUpload(e) {
        e.preventDefault();

        const newUpload = {
            title: newTitle,
            platform: newPlatform,
            genre: newGenre,
            release_date: releaseDate,
            image: newImage,
        };

        console.log(newUpload);

        fetch("/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUpload),
        })
        // .then((response) => {
        //     if (response.ok) {
        //         navigate("/games_display");
        //     } else {
        //         setErrors("Upload failed. Please try again.");
        //         setTimeout(() => {
        //             setErrors("");
        //         }, 3000);
        //     }
        // })
        .then((r) => {
            if (r.status === 401) {
              r.json().then((data) => {
                console.log("errorData")
                setErrors(data.error);

                setTimeout(() => {
                  setErrors("");
                }, 3000);
              });
            } else if (!r.ok) {
                console.log("non-ok")
                r.json().then((data) => {
                    setErrors(data.errors);
                    setTimeout(() => {
                        setErrors("");
                    }, 3000);
                });
            } else {
                navigate("/games_display");
            }
          })
        .catch((error) => {
            console.error("An error occurred:", error);
            setErrorMessage("An error occurred. Please try again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        });
    }

    return (
        <div className="upload_card">
            <h1>Upload Game</h1>
            <div>
                <form onSubmit={(e) => handleUpload(e)}>
                    <input placeholder="Title..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input>
                    <input placeholder="Platform..." value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)}></input>
                    <input placeholder="Genre..." value={newGenre} onChange={(e) => setNewGenre(e.target.value)}></input>
                    <input placeholder="Release Date... (e.g. October 2023)" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}></input>
                    <input placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)}></input>
                    <button> Submit </button>
                </form>
                    {errors.length > 0 && (
                        <div className="error">
                            {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
}

export default UploadCard;

