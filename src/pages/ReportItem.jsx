
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  MapPin,
  CheckCircle,
  X
} from 'lucide-react';
import { saveItem } from '../services/itemService';

const categories = [
  'Electronics',
  'Documents',
  'Accessories',
  'Keys',
  'Clothing',
  'Books',
  'Others'
];

export default function ReportItem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: 'LOST',
    title: '',
    category: '',
    description: '',
    location: '',
    date: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!image) {
      setPreview('');
      return;
    }

    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [image]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG and WebP images are allowed.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.');
      e.target.value = '';
      return;
    }

    setImage(file);
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (
      !form.title.trim() ||
      !form.category ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.date
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (form.description.trim().length < 15) {
      setError('Description must contain at least 15 characters.');
      return;
    }

    if (form.date > new Date().toLocaleDateString('en-CA')) {
      setError('The item date cannot be in the future.');
      return;
    }

    try {
      const newItem = saveItem(form);

      console.log('Demo report saved:', newItem);

      setSuccess(true);
    } catch (error) {
      console.error('Unable to save report:', error);
      setError('Unable to save the report. Please try again.');
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">

        <CheckCircle
          size={70}
          className="text-green-600 mx-auto mb-5"
        />

        <h1 className="text-3xl font-bold text-slate-900">
          Report Form Completed!
        </h1>

        <p className="text-slate-600 mt-4">
          Your report has been saved in this browser
          for demonstration purposes.

          It will now appear on the homepage.
          It has not been uploaded to MongoDB.
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Back to Homepage
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">

        <h1 className="text-3xl font-bold text-slate-900">
          Report an Item
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Help your campus community recover lost belongings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Report Type */}
          <div>
            <label className="block font-semibold mb-3">
              Report Type *
            </label>

            <div className="grid grid-cols-2 gap-4">

              {['LOST', 'FOUND'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({
                    ...form,
                    type
                  })}
                  className={`py-4 rounded-xl font-bold border-2 transition-colors ${form.type === type
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-slate-200 text-slate-500'
                    }`}
                >
                  {type === 'LOST'
                    ? 'Lost Item'
                    : 'Found Item'}
                </button>
              ))}

            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">
              Item Title *
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={100}
              placeholder="e.g. Black Samsung Earbuds"
              required
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">
              Category *
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}

            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">
              Description *
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              maxLength={1000}
              required
              placeholder="Describe the item, its appearance and any identifying details..."
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-slate-500 mt-1">
              Minimum 15 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2">
              Location *
            </label>

            <div className="relative">
              <MapPin
                size={19}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                maxLength={150}
                placeholder="e.g. Main Library"
                required
                className="w-full border border-slate-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold mb-2">
              Date Lost / Found *
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              max={new Date().toLocaleDateString('en-CA')}
              required
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Item Image (Optional)
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:bg-slate-50">

              <Upload
                size={30}
                className="text-slate-400 mb-2"
              />

              <span className="text-sm font-semibold text-slate-600">
                Click to select an image
              </span>

              <span className="text-xs text-slate-400 mt-1">
                JPG, PNG, WebP — Max 5 MB
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImage}
                className="hidden"
              />

            </label>

            {preview && (
              <div className="relative mt-4 w-fit">

                <img
                  src={preview}
                  alt="Item preview"
                  className="w-48 h-48 object-cover rounded-xl border"
                />

                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>

              </div>
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="bg-red-50 text-red-600 p-3 rounded-xl text-sm"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors"
          >
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}
