import React, { useEffect, useState } from 'react';
import { fetchAds, createAd, updateAd, deleteAd } from '../../Services/adminService';
import Sidebar from '../Components/Layout/Sidebar';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    link: '',
    position: '',
  });
  const [editingAd, setEditingAd] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    const adsData = await fetchAds();
    setAds(adsData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.position) {
      alert('Please select a valid position');
      return;
    }
  
    const adData = new FormData();
    adData.append('title', formData.title);
    adData.append('link', formData.link);
    adData.append('position', formData.position);
  
    if (formData.image) {
      adData.append('image', formData.image);
    }
  
    if (editingAd) {
      await updateAd(editingAd, adData);
    } else {
      await createAd(adData);
    }
  
    setFormData({ title: '', image: null, link: '', position: '' });
    setEditingAd(null);
    setIsFormVisible(false);
    loadAds();
  };

  const handleEdit = (ad) => {
    setFormData({ title: ad.title, image: null, link: ad.link, position: ad.position });
    setEditingAd(ad._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      await deleteAd(id);
      loadAds();
    }
  };

  const availablePositions = ['homepage1', 'homepage2', 'homepage3', 'coursepage', 'coursefullviewpage', 'mentorpage', 'coursecategorypage'].filter(
    position => !ads.some(ad => ad.position === position && ad._id !== editingAd)
  );

  const allPositionsTaken = availablePositions.length === 0;

  return (
    <div className="flex h-screen bg-gray-100 font-roboto">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Ads</h2>

        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className={`mb-6 ${
            allPositionsTaken ? 'bg-red-400 cursor-not-allowed' : 'bg-custom-cyan hover:bg-custom-cyan2'
          } text-white font-bold py-2 px-4 rounded flex items-center`}
          disabled={allPositionsTaken}
        >
          <PlusCircle size={20} className="mr-2" />
          {allPositionsTaken ? 'All positions are taken, delete an ad to add new' : isFormVisible ? 'Hide Form' : 'Add New Ad'}
        </button>

        {isFormVisible && !allPositionsTaken && (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ad Title"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} // Set the image file
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
                Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="Ad Link"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Select a position
                </option>
                {availablePositions.map((position) => (
                  <option key={position} value={position}>
                    {position.charAt(0).toUpperCase() + position.slice(1).replace(/([A-Z])/g, ' $1')}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="bg-custom-cyan hover:bg-custom-cyan2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {editingAd ? 'Update Ad' : 'Add Ad'}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h1 className="text-white bg-custom-cyan hover:bg-custom-cyan2 duration-300 p-1 text-center rounded-2xl font-bold mb-4 cursor-pointer" onClick={() => handleEdit(ad)}>Running @ {ad.position}</h1>
                <h3 className="font-bold text-xl mb-2">{ad.title}</h3>
                <p className="text-gray-700 text-base mb-4">{ad.link}</p>
             
                <div className="flex justify-between">
                  <button onClick={() => handleEdit(ad)} className="text-blue-500 hover:text-blue-700">
                    <Edit2 className="inline-block" /> Edit
                  </button>
                  <button onClick={() => handleDelete(ad._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="inline-block" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
