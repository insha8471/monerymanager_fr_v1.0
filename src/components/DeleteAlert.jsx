import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({content, onDelete}) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        try {
            console.log("Deleting")
            await onDelete();
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button 
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="flex items-center justify-center gap-2 bg-purple-600 text-white font-medium px-3 sm:px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base cursor-pointer">
                        {
                            loading ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animated-spin"/>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    Delete
                                </>
                            )
                        }
                    </button>
            </div>
        </div>
    )
}

export default DeleteAlert;