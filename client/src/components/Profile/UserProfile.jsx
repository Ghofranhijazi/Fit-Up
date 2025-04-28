import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { User, Edit2, Camera } from 'react-feather';
import Logout from '../Auth/Logout';

const UserProfile = () => {
  const userId = useSelector((state) => state.user.id);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    profileImage: '', // رابط الصورة أو الملف
  });
  const [isSaved, setIsSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const brandColor = '#9C2A46';
  const brandColorLight = '#F8E8EE';

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/users/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImage: file }); // احفظ الصورة كملف
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('username', user.username);
    formData.append('email', user.email);
    if (user.profileImage instanceof File) {
      formData.append('profileImage', user.profileImage); // رفع الصورة فقط لو تم تعديلها
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUser(res.data.user); // تحديت البيانات بعد الحفظ
      setIsSaved(true);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-38 pb-32">
      <div className="max-w-5xl mx-auto p-8 rounded-xl shadow-lg bg-white">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="relative mb-4 md:mb-0">
              {/* Profile Picture */}
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4"
                style={{ borderColor: brandColorLight }}
              >
                {user?.profileImage ? (
                  <img
                    src={
                      user.profileImage instanceof File
                        ? URL.createObjectURL(user.profileImage)
                        : user.profileImage
                        ? `http://localhost:5000${user.profileImage}`
                        : 'https://via.placeholder.com/150'
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      backgroundColor: brandColorLight,
                      color: brandColor,
                    }}
                  >
                    <User size={64} />
                  </div>
                )}
              </div>
              {/* Upload Button */}
              <label
                className="absolute bottom-0 right-0 p-3 rounded-full cursor-pointer transition-all drop-shadow-md"
                style={{ backgroundColor: brandColor }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Camera size={20} className="text-white" />
              </label>
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <h1
                className="text-3xl font-bold mb-1"
                style={{ color: brandColor }}
              >
                {user?.username || 'Your Profile'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            {/* Logout Button */}
            <div className="ml-auto">
              <Logout />
            </div>
          </div>
        </div>
  
        {/* Personal Information Section */}
        <div className="bg-white rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold"
              style={{ color: brandColor }}
            >
              Personal Information
            </h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                style={{ color: brandColor }}
                className="flex items-center hover:opacity-80 font-medium transition-all"
              >
                <Edit2 size={16} className="mr-1" />
                Edit
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {['username', 'email', 'phone', 'address'].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium text-gray-600 mb-2 capitalize">
                  {field}
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name={field}
                    value={user[field] || ''}
                    onChange={handleChange}
                    className="border border-transparent bg-[#F8E8EE] focus:border-gray-300 p-3 w-full rounded-lg outline-none transition-all"
                    style={{
                      focusRing: brandColorLight,
                      focusBorderColor: brandColor,
                    }}
                    // disabled={field === 'email' || field === 'username'}
                  />
                ) : (
                  <p
                    className="p-4 rounded-lg text-gray-800 border"
                    style={{
                      backgroundColor: brandColorLight,
                      borderColor: 'transparent',
                    }}
                  >
                    {user?.[field] || 'N/A'}
                  </p>
                )}
              </div>
            ))}
          </div>
          {editMode && (
            <div className="mt-8 flex space-x-3">
              <button
                onClick={handleSave}
                style={{ backgroundColor: brandColor }}
                className="hover:bg-opacity-90 text-white px-8 py-3 rounded-lg transition-all font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {isSaved && (
          <p className="mt-4 text-green-600 text-sm text-center">
            Profile updated successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;