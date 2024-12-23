import { useState, useEffect } from "react";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryName: string;
    onSave: (updatedName: string) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    isOpen,
    onClose,
    categoryName,
    onSave,
}) => {
    const [updatedName, setUpdatedName] = useState<string>(categoryName);

    // Sync the initial value of updatedName when modal opens
    useEffect(() => {
        if (isOpen) {
            setUpdatedName(categoryName);
        }
    }, [isOpen, categoryName]);

    const handleSave = () => {
        if (updatedName.trim() === '') {
            alert('Category name cannot be empty.');
            return;
        }
        onSave(updatedName);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-2xl p-6 transform transition-all duration-300 scale-100">
                <h2 className="text-xl font-semibold text-gray-600">Edit Category</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Update the category name below and save your changes.
                </p>

                <div className="mt-5">
                    <label
                        htmlFor="updatedName"
                        className="block text-sm font-semibold text-gray-600 mb-2"
                    >
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="updatedName"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        placeholder="Enter new category name"
                        className="w-full p-3 border-gray-400 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none shadow-sm transition"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-600 font-medium rounded-lg shadow-sm hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:ring-4 focus:ring-blue-300 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default EditCategoryModal;
