import { useSelector } from "react-redux";
import AuthService from "../../service/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditUserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setBio(user.bio || "");
            setImage(user.image || "");
        }
    }, [user]);

    async function handleSaveProfile() {
        try {
            const updatedUser = {
                bio,
                image,
                username,
            };

            const res = await AuthService.editUserProfile(updatedUser);
            console.log("Profil yangilandi ✅", res.user);
        } catch (err) {
            console.error("Xatolik:", err);
        } finally {
            navigate(`/userProfile/${username}`)
        }
    }

    if (!user) {
        return <p className="text-center mt-5">Loading user profile...</p>;
    }

    return (
        <div>
            <div
                className="p-3 d-flex justify-content-between align-items-start text-white"
                style={{ backgroundColor: "#000" }}
            >
                <div className="rounded d-flex flex-row justify-content-start align-items-center">
                    <div className="d-flex flex-column" style={{ width: "150px" }}>
                        <div
                            style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={
                                    image ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"
                                }
                                alt={username}
                                className="rounded-circle shadow mb-3"
                                width="120"
                                height="120"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Yoki rasm URL manzilini kiriting"
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="ms-3">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>

            <div className="card-body p-4 text-black">
                <div className="mb-5 text-body">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4 bg-body-tertiary">
                        <textarea
                            className="form-control"
                            rows="5"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    className="btn btn-primary px-4"
                    onClick={handleSaveProfile}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditUserProfile;
