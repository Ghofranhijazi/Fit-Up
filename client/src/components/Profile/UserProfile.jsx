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
    // profileImage: '', // رابط الصورة أو الملف
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setUser({ ...user, profileImage: file }); // احفظ الصورة كملف
  //   }
  // };

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
  <div className="min-h-screen bg-gray-50 pt-24 pb-16 md:pb-32 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl shadow-lg bg-white">
      {/* Profile Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-0">
          <div className="relative mb-4 sm:mb-0">
            {/* Profile Picture */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4"
              style={{ borderColor: brandColorLight }}
            >
              {/* {user?.profileImage ? (
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
              ) : ( */}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    backgroundColor: brandColorLight,
                    color: brandColor,
                  }}
                >
                  <User size={48} className="sm:w-12 sm:h-12 md:w-16 md:h-16" />
                </div>
              {/* )} */}
            </div>
            {/* Upload Button - Made smaller on mobile */}
            <label
              className="absolute bottom-0 right-0 p-2 sm:p-3 rounded-full cursor-pointer transition-all drop-shadow-md"
              // style={{ backgroundColor: brandColor }}
            >
              {/* <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Camera size={16} className="sm:w-5 sm:h-5 text-white" /> */}
            </label>
          </div>
          
          <div className="sm:ml-4 md:ml-6 text-center sm:text-left flex-1 min-w-0">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 truncate"
              style={{ color: brandColor }}
            >
              {user?.username || 'Your Profile'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 truncate">{user?.email}</p>
          </div>
          
          {/* Logout Button */}
          <div className="sm:ml-auto mt-2 sm:mt-0">
            <Logout className="text-sm" />
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2
            className="text-lg md:text-xl font-semibold"
            style={{ color: brandColor }}
          >
            Personal Information
          </h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              style={{ color: brandColor }}
              className="flex items-center hover:opacity-80 font-medium text-sm md:text-base transition-all"
            >
              <Edit2 size={14} className="mr-1 md:mr-1.5" />
              Edit
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {['username', 'email', 'phone', 'address'].map((field) => (
            <div key={field} className="mb-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 capitalize">
                {field}
              </label>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  value={user[field] || ''}
                  onChange={handleChange}
                  className="border border-transparent bg-[#F8E8EE] focus:border-gray-300 p-2 sm:p-3 w-full rounded-lg outline-none transition-all text-sm sm:text-base"
                  style={{
                    focusRing: brandColorLight,
                    focusBorderColor: brandColor,
                  }}
                  // disabled={field === 'email' || field === 'username'}
                />
              ) : (
                <p
                  className="p-3 sm:p-4 rounded-lg text-gray-800 border text-sm sm:text-base"
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
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleSave}
              style={{ backgroundColor: brandColor }}
              className="hover:bg-opacity-90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all font-medium text-sm sm:text-base"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {isSaved && (
        <p className="mt-3 md:mt-4 text-green-600 text-xs sm:text-sm text-center">
          Profile updated successfully!
        </p>
      )}
    </div>
  </div>
);
};

export default UserProfile;