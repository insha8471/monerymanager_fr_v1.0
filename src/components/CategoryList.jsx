import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({categories, onEditCategory, onDeleteCategory}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
                <h4 className="text-lg font-semibold text-gray-800">
                    Category Sources
                </h4>
            </div>

            {/* Category list */}
            {categories.length === 0 ? (
                <p className="text-gray-500 text-sm sm:text-base text-center py-4">
                    No category added yet — add some to get started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group relative flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-transparent hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                    {/* icon or emoji display */}
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shrink-0">
                        {category.icon ? (
                        <img
                            src={category.icon}
                            alt={category.name}
                            className="h-6 w-6 object-contain"
                        />
                        ) : (
                        <Layers2 className="text-blue-600" size={22} />
                        )}
                    </div>

                    {/* category details */} 
                        <div className="flex-1 flex items-center justify-between">
                            {/* category name and type */} 
                            <div>
                                <p className="text-sm text-gray-700 font-medium">
                                    {category.name}
                                </p>
                                <p className="text-sm text-gray-400 mt-1 capitalize">
                                    {category.type}
                                </p>
                            </div>

                            {/* edit button */}
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => onEditCategory(category)}
                                    className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Pencil size={18} />
                                </button>
                            </div>

                        </div>

                   

                    </div>
                ))}
                </div>
            )}
        </div>

    )
}

export default CategoryList;