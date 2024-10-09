import { useState, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchCourseCategory } from '../../../Services/studentService';
import { useNavigate } from 'react-router-dom';

const SearchBarWithSuggestions = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await searchCourseCategory(searchValue); // Fetch data based on search value
                const formattedSuggestions = response.map((item) => ({ value: item.name, _id: item._id }));
                setSuggestions(formattedSuggestions);
            } catch (err) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        if (searchValue) {
            fetchCategories();
        } else {
            setSuggestions([]); // Reset suggestions if search value is empty
        }
    }, [searchValue]);

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleSelect = (value, option) => {
        navigate(`/courses/category/${option._id}`);
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <AutoComplete
                style={{ width: '100%' }}
                options={suggestions}
                onSearch={handleSearch}
                value={searchValue}
                onChange={setSearchValue}
                onSelect={handleSelect} // Trigger navigation on select
                notFoundContent={loading ? 'Loading...' : error ? error : null}
            >
                <div className="relative w-full">
                    <Input
                        placeholder="Want to learn?"
                        className="w-full p-2 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm bg-custom-cyan text-white px-3 py-1 rounded-full hover:bg-cyan-600"
                        style={{ height: '80%', border: 'none' }}
                    >
                        <SearchOutlined />
                        Explore
                    </button>
                </div>
            </AutoComplete>
        </div>
    );
};

export default SearchBarWithSuggestions;